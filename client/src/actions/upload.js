import { SERVER_URL } from '../constants/server';

export default file => (dispatch) => {
  dispatch({ type: 'UPLOAD_REQUEST' });

  const formData = new FormData();
  formData.append('file', file, file.name);

  return fetch(`${SERVER_URL}/upload`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  })
    .then(() => {
      dispatch({ type: 'UPLOAD_SUCCESS' });
    });
};
