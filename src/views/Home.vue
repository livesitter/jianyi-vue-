<template>
  <div class="home">
    <b>{{food}}</b>
    <img alt="Vue logo" src="../assets/image/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="goPrev">返回上一页</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    goPrev(){
      this.$router.back()
    }
  }
}
</script>
