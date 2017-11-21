import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class ImageUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploading: false
    }

  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        fileName: file.name
      });
    }

    reader.readAsDataURL(file)
  }

  // Component method
  handleFileUpload = async (e) => {
    e.preventDefault()
    this.setState({  uploading: true })
    
    let data = new FormData();
    data.append('file', this.state.file);
    
    const { data: { imageLink } } = await axios.post('/upload',data)      
    this.setState({ 
      imagePreviewUrl: imageLink,
      uploading: false 
    })
  
  }

  render() {
    const { uploading, fileName, imagePreviewUrl } = this.state

    return (
      <Grid>
        
        <Row>
          <Col md={6}>
            <form onSubmit={ this.handleFileUpload }  className="panel panel-default">
              <div className="panel-heading"><strong>Upload files</strong> <small> </small></div>
              <div className="panel-body">
                <div className="input-group image-preview">
                  
                  <input type="text" value={ fileName || '' } className="form-control image-preview-filename"/>
                  {/* don't give a name === doesn't send on POST/GET */}
                  <span className="input-group-btn">
                    {/* image-preview-clear button */}
                    <button type="button" className="btn btn-default image-preview-clear" style={{ display: 'none' }}>
                      <span className="glyphicon glyphicon-remove" /> Clear </button>
                    {/* image-preview-input */}
                    <div className="btn btn-default image-preview-input">
                      <span className="glyphicon glyphicon-folder-open" />
                      <span className="image-preview-input-title"> Browse</span>
                      <input onChange={ this.handleImageChange } type="file" accept="'image/*'" name="file" />
                      {/* rename it */}
                    </div>
                    <button type="submit" className="btn btn-labeled btn-primary">
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
            {
              imagePreviewUrl && 
              <img className="img-responsive preview" alt={''} src={ imagePreviewUrl } />
            }
            
          </Col>
        </Row>
      </Grid>

    )
  }


}

export default ImageUpload