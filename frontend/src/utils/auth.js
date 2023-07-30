export const BASE_URL = 'https://auth.nomoreparties.co.';

const isOk = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(isOk);
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(isOk)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then(isOk);
};
// export function request(url, options) {
//   // принимает два аргумента: урл и объект опций, как и `fetch`
//   return fetch(url, options).then(isOk)
// }

// И теперь просто нужно заменить все fetch на request 
// и убрать дублирование проверки на ok. 

// Все остальное будет без изменений. Код станет чище
// И даже можно поместить внутрь baseUrl, 
// чтобы не дублировать его в каждом запросе. 
// Тогда нужно будет передавать просто endpoint в вызов