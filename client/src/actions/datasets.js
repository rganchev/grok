import { get, post, del } from '../utils/http';
import { SERVER_URL } from '../constants/server';
import asyncAction from './asyncAction';


export function uploadDataset(name, file) {
  return asyncAction('UPLOAD_DS', () => post(`${SERVER_URL}/datasets`, { file, name }));
}

export function deleteDataset(dsid) {
  return asyncAction('DELETE_DS', () => del(`${SERVER_URL}/datasets/${dsid}`).then(() => dsid));
}

export function getDatasets() {
  return asyncAction('GET_DATASETS', () => get(`${SERVER_URL}/datasets`));
}
