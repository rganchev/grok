import {
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
} from '../constants/upload';

import {
  SERVER_URL,
} from '../constants/server';

export function uploadFile(file) {
  return dispatch => {
    dispatch({ type: UPLOAD_REQUEST });

    const formData = new FormData();
    formData.append('file', file, file.name);

    return fetch(SERVER_URL + '/upload', {
      method: 'POST',
      body: formData,
      mode: 'cors',
    })
      .then(res => {
        dispatch({ type: UPLOAD_SUCCESS });
        console.log(res);
      })       
  };
};