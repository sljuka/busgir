import React, {Component} from 'react'

const pair = ['Trainspotting', '28 Days Later']

export default class Voting extends Component {

  render() {

    return (
      <div className='voting'>
        {pair.map((entry, index) =>
          <button key={entry} className={`class${index}`}>
            <h1>{entry}</h1>
          </button>
        )}
      </div>
    )
  }
}
