import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import ImageUpload from './ImageUpload'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: false
    }
  }

  async componentDidMount() {
    const { data: { msg } } = await axios.get('/data')
    this.setState({ msg })
  }

  // Component method
  handleFileUpload(e) {
    e.preventDefault()
    const [ inputFile ] = e.target
    console.log(e)
    console.log(e.target.input)
  }

  render() {
    const { uploading } = this.state
    return (
      <Grid>
        <ImageUpload />
        <Row>
          <Col md={6}>
            <form onSubmit={ this.handleFileUpload }  className="panel panel-default">
              <div className="panel-heading"><strong>Upload files</strong> <small> </small></div>
              <div className="panel-body">
                <div className="input-group image-preview">
                  

                  <input type="text" className="form-control image-preview-filename"/>
                  {/* don't give a name === doesn't send on POST/GET */}
                  <span className="input-group-btn">
                    {/* image-preview-clear button */}
                    <button type="button" className="btn btn-default image-preview-clear" style={{ display: 'none' }}>
                      <span className="glyphicon glyphicon-remove" /> Clear </button>
                    {/* image-preview-input */}
                    <div className="btn btn-default image-preview-input">
                      <span className="glyphicon glyphicon-folder-open" />
                      <span className="image-preview-input-title"> Browse</span>
                      <input type="file" accept="'image/*'" name="file" />
                      {/* rename it */}
                    </div>
                    <button type="button" className="btn btn-labeled btn-primary">
                      {
                        uploading
                        ? <i className="glyphicon glyphicon-refresh" />
                        : <i className="glyphicon glyphicon-upload" />
                      }
                      <span> Upload</span>
                    </button>
                  </span>
                </div>
                {/* /input-group image-preview [TO HERE]*/}
              </div>
            </form>
          </Col>
          <Col md={6}>
            <img className="img-responsive preview" ng-src="{{ imageLink }}" />
          </Col>
        </Row>
      </Grid>

    )
  }


}

export default Main