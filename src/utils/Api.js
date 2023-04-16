
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        });
        return this._getResponseData(res);
    }

    async getInformation() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        });
        return this._getResponseData(res);
    }

    async editUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
        return this._getResponseData(res);
    }

    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        })
        return this._getResponseData(res)
    }

    async setLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
        return this._getResponseData(res)
    }

    async deleteLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
        return this._getResponseData(res)
    }

    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        return this._getResponseData(res)
    }

    async editAvatar(data) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        });
        return this._getResponseData(res);
    };

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
          return this.setLike(cardId);
        } else {
          return this.deleteLike(cardId);
        }
      }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '3bfa8be2-7db2-4374-bd7f-9f079ca2255b',
        "Content-Type": "application/json",
    }
})

export default api