import React, { Component } from 'react';
import axios from 'axios'

import Main from './components/Main'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLink: ''
    }
  }

  uploadFile = async file => {
    let data = new FormData();
    data.append('file', file);
    
    const { data: { imageLink } } = await axios.post('/upload',data)      

    this.setState({ imageLink })
  
  }

  render() {
    return (
      <div className="App">
        <Main 
          uploadFile={ this.uploadFile }
          imagePreviewUrl={ this.state.imageLink }
        />
      </div>
    );
  }
}

export default App;
