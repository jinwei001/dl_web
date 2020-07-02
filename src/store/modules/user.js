import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  getUserId,
  setToken,
  setUserId,
  removeToken,
  removeUserId,
  getUserName,
  setUserName,
  removeUserName,
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  MessageBox,
  Message
} from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: getUserId(),
  UserName: getUserName()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.UserName = username
  },
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        account: username.trim(),
        password: password
      }).then(response => {
        const data = response.data.data
        console.log(response);
        if (response.status == 200) {
          if (response.data.code == 0) {
            Message({
              message:"登录"+ response.data.msg,
              type: 'success',
              duration: 5 * 1000
            })
            commit('SET_TOKEN', data.token);
            commit('SET_USERID', data.objId);
            commit('SET_USERNAME', data.name);
            setToken(data.token)
            setUserId(data.objId)
            setUserName(data.name)
            resolve()
          }else{
            Message({
              message: response.data.msg,
              type: 'error',
              duration: 5 * 1000
            })
            resolve()
          }
          
        }

      }).catch(error => {
        // console.log(error);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          name,
          avatar
        } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      console.log(123);
      commit('SET_TOKEN', '')
      commit('SET_USERID', '')
      commit('SET_USERNAME', '');
      removeUserId()
      removeUserName()
      removeToken()
      resetRouter()
      resolve()

        // })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
