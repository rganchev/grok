import React, { PropTypes } from 'react';

class UploadForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { isFileValid: false };
  }

  onFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ isFileValid: true });
    } else {
      this.setState({ isFileValid: false });
    }
  }

  onFileSubmit(e) {
    e.preventDefault();
    const file = this.fileInput.files[0];
    this.props.handleSubmit(file);
  }

  render() {
    return (
      <form className='file-upload' onSubmit={e => this.onFileSubmit(e)}>
        <div className='form-group'>
          <input
            type='file'
            ref={(ref) => { this.fileInput = ref; }}
            onChange={e => this.onFileChange(e)}
            className='form-control'
          />
        </div>
        <button
          type='submit'
          disabled={!this.state.isFileValid}
          className='btn btn-success'
        >
          Upload
        </button>
      </form>
    );
  }
}

UploadForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default UploadForm;
