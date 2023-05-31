const BASE_URL = 'https://auth.nomoreparties.co';

class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponse(res));
  }

  authorize(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponse(res));
  }

  checkToken(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }
}

const auth = new Authorization(BASE_URL);
export default auth;
// export const BASE_URL = "https://auth.nomoreparties.co";

// const getResponse = (res) => {
//     return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// }

// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/singup`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//     }).then(getResponse);
// }

// export const authorize = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       }).then(getResponse);
// }

// export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       }
//     }).then(getResponse);
//   }