const fetchRequest = (body, method, path) => {
  return new Promise((resolve, reject) => {
    const BACKEND_PORT = require('../config.json').BACKEND_PORT;

    const options = {
      method: method,
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    if (localStorage.getItem('token')) {
      options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      console.log(options.headers.Authorization);
    }

    fetch('http://localhost:' + BACKEND_PORT + path, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      });
  });
}

export default fetchRequest
