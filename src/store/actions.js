const actions={
    setUserInfo: ( { commit }, nickname) => {
        return commit('user/SET_NICK_NAME', nickname)
      },
      setApplyId: ( { commit }, applyId) => {
        return commit('user/SET_APPLY_ID', applyId)
      },
}

export default actions