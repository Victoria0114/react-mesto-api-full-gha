class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  isOk(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  register(newUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
      }),
    }).then(this.isOk)
  }

  login(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this.isOk)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this.isOk)
  }
}

const auth = new Auth({
  baseUrl: "https://api.victoriasmesto.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
   
  },
})

export default auth
