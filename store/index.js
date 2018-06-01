import axios from 'axios'
export const strict = false

export const state = () => ({
  authUser: null,
  activityGroups: null,
  userGroup: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },

  SET_ACTIVITY_GROUP_LIST: (state, { list }) => {
    state.activityGroups = list
  },

  SET_USER_GROUP: function (state, group) {
    state.userGroup = group.group
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.user) {
      commit('SET_USER', req.user)
    }
  },

  LOAD_ACTIVITY_GROUP_LIST: function ({ commit, state }) {
    axios.get('/api/activity/groups').then((response) => {
      commit('SET_ACTIVITY_GROUP_LIST', { list: response.data })
      response.data.forEach(group => {
        if (state.authUser) {
          if (group.adminMail === state.authUser.email) {
            commit('SET_USER_GROUP', { group: group })
          }
        }
      })
    }, (err) => {
      console.log(err)
    })
  }
}
