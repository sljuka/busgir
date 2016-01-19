/* eslint-disable no-undef */

import makeStore from '../../src/store';
import {expect} from 'chai'
import {initialState} from '../../src/core/initial_state'
import {List, Map, fromJS} from 'immutable'
import {MAX_OPENED_PROCESSES} from '../../src/features/processes/core'
import {openProcess, closeProcess, closeInstance, fetchProcesses} from '../../src/features/processes/actions'

describe('process application logic', () => {

  describe('openProcess function', () => {

    it('adds the process to the state', () => {
      const store = makeStore()
      expect(store.getState().get('processes')).to.equal(fromJS({}))

      store.dispatch(openProcess('p1'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p1']
      }))
    })

    it('adds the process to the begining of list', () => {
      const initState = fromJS({
        processes: {
          opened: ['p2', 'p3', 'p4']
        }
      })
      const store = makeStore(initState)

      store.dispatch(openProcess('p1'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p1', 'p2', 'p3', 'p4']
      }))
    })

    it('moves the process to begining of list if it is already opened', () => {
      const initState = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4']
        }
      })
      const store = makeStore(initState)

      store.dispatch(openProcess('p4'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p4', 'p1', 'p2', 'p3']
      }))
    })

    it('doesn\'t change state if opening process is already opened and on first location', () => {
      const initState = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4']
        }
      })
      const store = makeStore(initState)

      store.dispatch(openProcess('p1'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p1', 'p2', 'p3', 'p4']
      }))
    })

    it(`opens ${MAX_OPENED_PROCESSES} processes max, all excess processes are thrown out of the list`, () => {
      const initState = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']
        }
      })
      const store = makeStore(initState)

      store.dispatch(openProcess('p7'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p7', 'p1', 'p2', 'p3', 'p4', 'p5']
      }))
    })

    it(`can open a specific number of instances, this is a parameter of this function and has a default value`, () => {
      const initState = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']
        }
      })
      const store = makeStore(initState)

      store.dispatch(openProcess('p7', 4))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p7', 'p1', 'p2', 'p3']
      }))
    })

  })

  describe('closeProcess function', () => {

    it('removes the process from the opened processes list', () => {
      const state = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4']
        }
      })
      const store = makeStore(state)

      store.dispatch(closeProcess('p1'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p2', 'p3', 'p4']
      }))
    })

    it('doesn\'t change state if closing process isn\'t opened', () => {
      const state = fromJS({
        processes: {
          opened: ['p1', 'p2', 'p3', 'p4']
        }
      })
      const store = makeStore(state)

      store.dispatch(closeProcess('p5'))
      expect(store.getState().get('processes')).to.equal(fromJS({
        opened: ['p1', 'p2', 'p3', 'p4']
      }))
    })
  })

  describe('closeInstance function', () => {

    it('removes the opened key from the closed process', () => {
      const initState = fromJS({
        processes: {
          p1: {
            id:     1,
            opened: 'instance_1'
          },
          p2: {
            id:     2,
            opened: 'instance_1'
          }
        }
      })
      const store = makeStore(initState)

      store.dispatch(closeInstance('p1'))
      const expected = fromJS({
        p1: {
          id: 1
        },
        p2: {
          id:     2,
          opened: 'instance_1'
        }
      })
      expect(store.getState().get('processes')).to.equal(expected)
    })
  })

  describe('fetchProcessesSuccess function', () => {

    it('saves the fetched processes into state', () => {
      const initState = fromJS({
        processes: {}
      })
      const store = makeStore(initState)
      const fetched = {
        process_1: {
          id:   1,
          name: 'process_1'
        },
        process_2: {
          id:   2,
          name: 'process_2'
        }
      }
      store.dispatch(fetchProcesses(fetched))
      const expected = fromJS({
        process_1: {
          id:   1,
          name: 'process_1'
        },
        process_2: {
          id:   2,
          name: 'process_2'
        }
      })
      expect(store.getState().get('processes')).to.equal(expected)
    })

    it('merges the fetched process state with the existing process state', () => {
      const initState = fromJS({
        processes: {
          process_1: {
            id:        1,
            name:      'process_1',
            instances: ['instance_1', 'instance_2'],
            opened:    'instance_2'
          },
          process_2: {
            id:        2,
            name:      'process_2',
            instances: ['instance_1', 'instance_2']
          }
        }
      })
      const store = makeStore(initState)
      const fetched = {
        process_1: {
          id:        1,
          name:      'process_1',
          instances: ['instance_2', 'instance_3']
        },
        process_2: {
          id:        2,
          name:      'process_2',
          instances: ['instance_1', 'instance_3']
        }
      }

      store.dispatch(fetchProcesses(fetched))
      const expected = fromJS({
        process_1: {
          id:        1,
          name:      'process_1',
          instances: ['instance_2', 'instance_3'],
          opened:    'instance_2'
        },
        process_2: {
          id:        2,
          name:      'process_2',
          instances: ['instance_1', 'instance_3']
        }
      })
      expect(store.getState().get('processes')).to.equal(expected)
    })
  })
})
