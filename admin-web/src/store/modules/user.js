import md5 from 'js-md5'
import { login, logout } from '@/api/sys/login'
import { getToken, setToken, removeToken, getAccountAttr, setAccount, removeAccount } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    id: getAccountAttr('id'),
    name: getAccountAttr('name'),
    avatar: getAccountAttr('avatar'),
    email: getAccountAttr('email'),
    permissions: getAccountAttr('permissions'),
    roles: getAccountAttr('roles'),
    tenantCode: getAccountAttr('tenantCode')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TENANT_CODE: (state, tenantCode) => {
      state.tenantCode = tenantCode
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.userName.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          const dmmAccount = response.data
          document.cookie = 'authentication=' + dmmAccount.token + ';path=/;'
          setAccount(dmmAccount)
          commit('SET_TOKEN', dmmAccount.token)
          commit('SET_ID', dmmAccount.id)
          commit('SET_NAME', dmmAccount.userName)
          commit('SET_AVATAR', dmmAccount.avatar)
          commit('SET_EMAIL', dmmAccount.email)
          commit('SET_PERMISSIONS', dmmAccount.permissions)
          commit('SET_ROLES', dmmAccount.roles)
          commit('SET_TENANT_CODE', dmmAccount.tenantCode)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeAccount()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeAccount()
        resolve()
      })
    }
  }
}

export default user
