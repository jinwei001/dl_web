import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/appLogin',
        method: 'post',
        params: {
            username: data.account,
            password: data.password
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/apis/logout',
        method: 'POST'
    })
}