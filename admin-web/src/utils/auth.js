import Cookies from 'js-cookie'

const TokenKey = 'authentication'

const accountKey = 'X-CMS-HEADER-ACCOUNT'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAccountAttr(key) {
  const dmmAccount = JSON.parse(localStorage.getItem(accountKey))
  if (dmmAccount) {
    return dmmAccount[key]
  }
}

export function getAccount() {
  return JSON.parse(localStorage.getItem(accountKey))
}

export function setAccount(account) {
  return localStorage.setItem(accountKey, JSON.stringify(account))
}

export function removeAccount() {
  return localStorage.removeItem(accountKey)
}
