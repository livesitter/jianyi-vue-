<template>
  <input type="text" @input="handleInput" :value="value">
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput(event){
      // 通过event获取值
      const value = event.target.value;
      // 触发父组件的input事件，第二个参数是函数的参数
      this.$emit('input', value);
    }
  }
}
</script>
