import React, { Component } from 'react'
import Popular from './Popular'

/* optional "container" class to add CSS to Popular component if time allows */

class App extends Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}

export default App
