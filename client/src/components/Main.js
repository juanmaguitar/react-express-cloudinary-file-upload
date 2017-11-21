import React, { Component } from 'react'
import axios from 'axios'

class Main extends Component {
  constructor( props ) {
    super(props)
    this.state = {
      msg: 'No message yet'
    }
  }
  
  async componentDidMount() {
    const { data: { msg } } = await axios.get('/data')
    this.setState({ msg })
  }

  render() {
    const { msg } = this.state
    return (
      <div>
        <h1>Main</h1>
        <p>{ msg }</p>
      </div>
    )
  }
    

}

export default Main