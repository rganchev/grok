function handleResponse(response) {
  return response.text()
    .then((responseText) => {
      try {
        return JSON.parse(responseText);
      } catch (err) {
        return responseText;
      }
    });
}

function sendBody(method, url, params) {
  const formData = new FormData();
  if (params) {
    Object.entries(params).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });
  }

  return fetch(url, {
    method,
    body: formData,
    credentials: 'include',
  }).then(handleResponse);
}

export function get(strUrl, params) {
  const url = new window.URL(strUrl, window.location);
  if (params) {
    Object.entries(params).forEach((entry) => {
      url.searchParams.set(entry[0], entry[1]);
    });
  }

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse);
}

export function post(url, params) {
  return sendBody('POST', url, params);
}

export function del(url, params) {
  return sendBody('DELETE', url, params);
}
