import React from 'react';

class UploadForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = { valid: false };
    this.onFileChange = this.onFileChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  submit(e) {
    e.preventDefault();
    const file = this.refs.fileInput.files[0];
    this.props.handleSubmit(file);
  }

  render() {
    return (
      <form className='file-upload' onSubmit={this.submit}>
        <div className='form-group'>
          <input
            type='file'
            ref='fileInput'
            onChange={this.onFileChange}
            className='form-control' />
        </div>
        <button
          type='submit'
          disabled={!this.state.valid}
          className='btn btn-success' >
          Upload
        </button>
      </form>
    )
  }
}

export default UploadForm;
