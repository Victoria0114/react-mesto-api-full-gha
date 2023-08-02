class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  async patchUserInfo(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    return this._checkResponse(response)
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return this._checkResponse(response)
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return this._checkResponse(response)
  }

  async postCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
    return this._checkResponse(response)
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return this._checkResponse(response)
  }

  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return this._checkResponse(response)
  }

  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return this._checkResponse(response)
  }

  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._checkResponse(response)
  }
}

const api = new Api({
  baseUrl: "https://api.victoriasmesto.nomoreparties.co",
})

export default api
