import React, { Component } from 'react'
import PropTypes from 'prop-types';

const propTypes = {
  uploadFile: PropTypes.func
}

class ImageUploadForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: '',
      fileName: '',
      uploading: false
    }
  }
  
  handleChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];


    reader.onloadend = () => {
      this.setState({
        file: file,
        fileName: file.name
      });
    }

    file && reader.readAsDataURL(file)
  }

  // Component method
  handleSubmit = async (e) => {
    e.preventDefault()
    const { file } = this.state
    const { uploadFile } = this.props

    this.setState({ uploading: true })
    try {
      await uploadFile(file)
      this.setState({ uploading: false })
    }
    catch(e) {
      throw e
    }

  }

  render() {
    const { uploading, fileName } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="panel panel-default">
        <div className="panel-heading"><strong>Upload files</strong> <small> </small></div>
        <div className="panel-body">
          <div className="input-group image-preview">
            <input type="text" value={fileName || ''} className="form-control image-preview-filename" />
            <span className="input-group-btn">

              <div className="btn btn-default image-preview-input">
                <span className="glyphicon glyphicon-folder-open" />
                <span className="image-preview-input-title"> Browse</span>
                <input onChange={this.handleChange} type="file" accept="'image/*'" name="file" />
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

        </div>
      </form>
    )
  }
}

ImageUploadForm.propTypes = propTypes

export default ImageUploadForm