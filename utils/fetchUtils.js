import logout from './logoutUtils';

export function handleErrors(response, ignore401 = false) {
    if (response.status === 401 && !ignore401) {
      logout();
    }
    if (!response.ok) throw Error(response.statusText);
    return response;
}

export function createHeadersForJSONContent(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: token
  };
}
