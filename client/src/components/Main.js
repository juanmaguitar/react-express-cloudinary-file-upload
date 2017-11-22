import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';

import ImageUploadForm from './ImageUploadForm'

const propTypes = {
  imagePreviewUrl: PropTypes.string,
  uploadFile: PropTypes.func
}

const Main = props => {
  const { imagePreviewUrl, uploadFile } = props
  return (
    <Grid>
      <Row>
        <Col md={6}>
          <ImageUploadForm uploadFile={uploadFile}/>
        </Col>
        <Col md={6}>
          {
            imagePreviewUrl &&
            <img className="img-responsive preview" alt={''} src={imagePreviewUrl} />
          }
        </Col>
      </Row>
    </Grid>
  )
}

Main.propTypes = propTypes

export default Main