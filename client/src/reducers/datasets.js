import { combineReducers } from 'redux';

const all = (state = [], action) => {
  switch (action.type) {
    case 'GET_DATASETS_SUCCESS':
      return action.data;
    case 'UPLOAD_DS_SUCCESS':
      return [...state, action.data];
    case 'DELETE_DS_SUCCESS':
      return state.filter(ds => ds.dsid !== action.data);

    default:
      return state;
  }
};

const isUploading = (state = false, action) => {
  switch (action.type) {
    case 'UPLOAD_DS_REQUEST':
      return true;

    case 'UPLOAD_DS_FAILURE':
    case 'UPLOAD_DS_SUCCESS':
      return false;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'GET_DATASETS_REQUEST':
      return true;

    case 'GET_DATASETS_FAILURE':
    case 'GET_DATASETS_SUCCESS':
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  all,
  isFetching,
  isUploading,
});
