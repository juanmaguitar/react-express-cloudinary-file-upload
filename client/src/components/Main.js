import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import ImageUploadForm from './ImageUploadForm'

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

export default Main