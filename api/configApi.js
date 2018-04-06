import fetch from 'isomorphic-fetch';
import { handleErrors } from '../utils/fetchUtils';

const configUrl = '/config.json';

export default function getConfigRequest() {
  return fetch(configUrl)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => JSON.parse(json));
}
