import { combineReducers } from 'redux';

import {
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
} from '../constants/upload';

const items = (state = [], action) => {
  switch(action.type) {
    case UPLOAD_SUCCESS:
      return [...state, action.data];

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case UPLOAD_REQUEST:
      return true;

    case UPLOAD_FAILURE:
    case UPLOAD_SUCCESS:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  items,
  isFetching,
})
