import { apiConfig } from "./utils.js";

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._getResponse(res));
    }
    addNewCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => this._getResponse(res));
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    addLikeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    deleteLikeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    editProfileImage(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar),
        }).then((res) => this._getResponse(res));
    }
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.addLikeCard(id);
        } else {
            return this.deleteLikeCard(id);
        }
    }
}

const api = new Api(apiConfig);
export default api;