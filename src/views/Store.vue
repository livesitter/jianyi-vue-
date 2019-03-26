<template>
  <div>
    <v-input v-model="stateValue"/>
    <p>{{stateValue}}</p>
    <v-show :content="stateValue"/>
    <p>appName: {{appName}}</p>
    <p>userName: {{userName}}</p>
    <p>appWithVersion: {{appWithVersion}}</p>
    <p>firstWord: {{firstWord}}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{appVersion}}</p>
  </div>
</template>

<script>

// 引用VInput组件
import VInput from '_c/VInput.vue'
// 引用VShow组件
import VShow from '_c/VShow.vue'
// 引用mapState、mapGetters、mapMutations、mapActions
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'





export default {
  name: 'store',
  data(){
    return{
      inputValue: ""
    }
  },
  components: {
    VInput,
    VShow
  },
  computed:{
    stateValue: {
      get(){
        return this.$store.state.stateValue
      },
      set(val){
        this.SET_STATE_VALUE(val)
      }
    },
    ...mapState({
      userName: state => state.user.userName,
      appName: state => state.appName,
      appVersion: state => state.appVersion,
    }),
    ...mapGetters([
      'firstWord',
      'appWithVersion'
    ]),
    // appWithVersion(){
    //   return this.$store.getters.appWithVersion
    // },
    // ...mapState({
    //   userName: state => state.userName,
    // })
    // ...mapState('user',{
    //   userName: state => state.userName,
    // })
    // appName(){
    //   return this.$store.state.appName
    // },
    // userName(){
    //   return this.$store.state.user.userName
    // }
  },
  methods: {
    ...mapMutations([
      'SET_APP_NAME',
      'SET_APP_VERSION',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput(val){
      this.SET_STATE_VALUE(val)
    },
    handleChangeAppName(){
      //this.updateAppName()
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'NewAppName'
      // })
      this.SET_APP_NAME({
        appName: 'NewAppName'
      })
      //this.SET_APP_VERSION()

    }
  }
}
</script>
