import React, { Component } from 'react'

class ImageUploadForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: '',
      fileName:'',
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

    reader.readAsDataURL(file)
  }

  // Component method
  handleSubmit = async (e) => {
    e.preventDefault()
    const { file } = this.state
    const { uploadFile } = this.props
    
    this.setState({ uploading: true })
    await uploadFile(file)
    this.setState({ uploading: false })
  }

  render() {
    const { uploading, fileName } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="panel panel-default">
        <div className="panel-heading"><strong>Upload files</strong> <small> </small></div>
        <div className="panel-body">
          <div className="input-group image-preview">

            <input type="text" value={fileName || ''} className="form-control image-preview-filename" />
            {/* don't give a name === doesn't send on POST/GET */}
            <span className="input-group-btn">
              {/* image-preview-clear button */}
              <button type="button" className="btn btn-default image-preview-clear" style={{ display: 'none' }}>
                <span className="glyphicon glyphicon-remove" /> Clear </button>
              {/* image-preview-input */}
              <div className="btn btn-default image-preview-input">
                <span className="glyphicon glyphicon-folder-open" />
                <span className="image-preview-input-title"> Browse</span>
                <input onChange={this.handleChange} type="file" accept="'image/*'" name="file" />
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
    )
  }


}

export default ImageUploadForm