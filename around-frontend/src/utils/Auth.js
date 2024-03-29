const BASE_URL = process.env.REACT_APP_NODE_ENV === 'production' ? "https://aroundreact.herokuapp.com/api" : 'http://localhost:5000/api';

module.exports.register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Acccept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.json();
  });
};

module.exports.authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Acccept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: identifier, password: password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.message) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
};

module.exports.getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} - ${res.message}`);
  })
  .then((data) => {
    return data
  })
  .catch((err) => console.log(err))
};
