import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

const UserId = 'userId'

const UserName = 'UserName'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function getUserId() {
    return Cookies.get(UserId)
}
export function getUserName() {
    return Cookies.get(UserName)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function setUserId(id) {
    return Cookies.set(UserId, id)
}
export function setUserName(username) {
    return Cookies.set(UserName,username)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function removeUserId() {
    return Cookies.remove(UserId)
}

export function removeUserName() {
    return Cookies.remove(UserName)
}