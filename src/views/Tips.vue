<template>
    <div class="content-box">
        <span class="title">移动端，请使用app</span>
        <span class="app-type">安卓app</span>
        <img src="@/assets/image/apk.png" alt="">
    </div>
</template>

<script>
export default {
    name: "tips",
}
</script>


<style lang="less">
.content-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    width:100%;
    background: #f8f8f9;

    .title{
        font-size: 20px;
        margin-bottom: 50px;
    }
    .app-type{
        font-size: 16px;
    }
}
</style>

