import request from '@/utils/request'

const loginInfo = {
    loginInfo: function(data) {
        return request({
            url: '/system/login',
            method: 'get',
            params: {
                account: data.username,
                passWord: data.password
            }
        })
    }
}
export default loginInfo