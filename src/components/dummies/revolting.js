import React, {Component} from 'react'

const pair = ['Trainspotting', '28 Days Later']

export default class Revolting extends Component {

  render() {

    return (
      <div className='voting'>
        {pair.map(entry =>
          <button key={entry}>
            <h1>{entry + 'revolting'}</h1>
          </button>
        )}
      </div>
    )
  }
}
