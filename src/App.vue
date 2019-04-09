<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
    created() {
        // 判断手机端还是PC端
        let array = ['Win32','Win64','Mac'];
        if (array.indexOf(navigator.platform) == -1) {
            this.$router.replace('/tips');
        }
    }
};
</script>

<style>
html,
body {
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
}
#app {
    font-family: "Helvitica Neue", Helvitica, Arial, "Hiragino Sans GB",
        "Microsoft YaHei", "Arial Regular", "Microsoft JhengHei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
