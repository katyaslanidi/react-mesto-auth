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