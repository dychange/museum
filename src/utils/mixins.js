import {mapGetters,mapActions} from "vuex"

export const competitionMixin = {
    computed: {
        ...mapGetters([
          'nickname',
          'applyId'
        ])
      },
    methods: {
      ...mapActions([
        'setUserInfo',
        'setApplyId'
      ])
    }
}