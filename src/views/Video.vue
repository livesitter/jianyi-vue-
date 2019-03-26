<template>
   <div class="about">
    <h1>This is an video page</h1>
    <h3>{{name}}</h3>
  </div>
</template>

<script>
export default {
  // 定义属性（上级页面的传参）
  props: {
    name: {
      type: String,
      default: 'tim'
    }
  }
}
</script>
