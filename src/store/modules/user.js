const state={
    nickname: null,
    applyId: null,
}

const mutations = {
    'SET_NICK_NAME': (state, nickname) => {
      state.nickname = nickname
    },
    'SET_APPLY_ID': (state, applyId) => {
      state.applyId = applyId
    }
  }

  export default {
    namespaced: true,
    state,
    mutations,
  }