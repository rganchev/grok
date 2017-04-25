import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';

class UploadDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { isFileValid: false };
  }

  onChange() {
    if (this.fileInput.files[0] && this.nameInput.value) {
      this.setState({ isFileValid: true });
    } else {
      this.setState({ isFileValid: false });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const name = this.nameInput.value;
    const file = this.fileInput.files[0];
    this.props.handleSubmit(name, file)
      .then(() => this.props.close());
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dataset</Modal.Title>
        </Modal.Header>
        <form
          className='file-upload'
          ref={(elem) => { this.form = elem; }}
          onSubmit={e => this.onFormSubmit(e)}
        >
          <Modal.Body>
            <FormGroup>
              <FormControl
                type='text'
                value={this.state.value}
                onChange={() => this.onChange()}
                inputRef={(ref) => { this.nameInput = ref; }}
                placeholder='Dataset name'
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type='file'
                inputRef={(ref) => { this.fileInput = ref; }}
                onChange={() => this.onChange()}
                className='form-control'
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle='success'
              disabled={!this.state.isFileValid || this.props.isUploading}
              type='submit'
            >
              <Glyphicon glyph='upload' /> Upload
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

UploadDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
};

export default UploadDialog;
