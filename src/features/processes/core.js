import {List, Map, fromJS} from 'immutable'
import {initialState} from '../../core/initial_state'

export const MAX_OPENED_PROCESSES = 6

export const processes = (state = initialState.get('processes'), action) => {
  switch (action.type) {
    case 'OPEN_PROCESS':
      const {name, maxOpenedProcesses} = action

      return openProcess(state, name, maxOpenedProcesses)
    case 'CLOSE_PROCESS':
      return closeProcess(state, action.name)
    case 'CLOSE_INSTANCE':
      return closeInstance(state, action.name)
    case 'FETCH_PROCESSES':
      return fetchProcesses(state, action.fetched)
    default:
      return state;
  }
}

function openProcess(processState, name, maxOpenedProcesses = MAX_OPENED_PROCESSES) {
  return processState.update('opened', List(), processes => {
    const indexOfId = processes.indexOf(name)
    if (indexOfId !== -1) processes = processes.remove(indexOfId)
    processes = processes.unshift(name)
    if (processes.size > maxOpenedProcesses)
      processes = processes.splice(maxOpenedProcesses, processes.size - maxOpenedProcesses)

    return processes
  })
}

function closeProcess(processState, name) {
  return processState.update('opened', List(), opened => {
    const indexOfId = opened.indexOf(name)
    if (indexOfId !== -1) opened = opened.remove(indexOfId)

    return opened
  })
}

function closeInstance(processState, name) {
  return processState.deleteIn([name, 'opened'])
}

function fetchProcesses(processState, fetched) {
  return processState.update(processes =>
    processes.mergeDeep(fromJS(fetched))
  )
}
