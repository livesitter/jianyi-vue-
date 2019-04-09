<template>
    <div class="side-menu-wrapper">
        <div style="margin-top:10px">
            <template v-for="(sideItem,index) in sideMenu">
                <div :key="`sideItem_${index}`" style="line-height:50px">
                    <Poptip trigger="hover" placement="right">
                        <a class="drop-menu-a">
                            <svg class="icon" aria-hidden="true" style="font-size:34px">
                                <use :xlink:href="sideItem.type"></use>
                            </svg>
                        </a>
                        <div slot="title">
                            {{sideItem.name}}
                        </div>
                        <div slot="content">
                            <img v-if="sideItem.index !== 3" style="height:250px;width:250px;" :src="sideItem.img" alt="">
                            <a v-else @click="toGithub">https://github.com/livesitter</a>
                        </div>
                    </Poptip>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
/************************* 引入部分*************************/
import Vue from "vue";
import qqcode from "@/assets/image/qqcode.png";
import wxcode from "@/assets/image/wxcode.jpg";
import { Poptip } from "iview";
Vue.component("Poptip", Poptip);
 
export default {
    name: "SideMenu",
    components: {},
    data() {
        return {
            sideMenu: [
                { index: 1, name: "订阅号", type: "#icon-weixin", img:wxcode },
                { index: 2, name: "QQ交流群", type: "#icon-qq1", img:qqcode },
                { index: 3, name: "Github", type: "#icon-github", }
            ]
        };
    },
    methods: {
        toGithub() {
            window.open("https://github.com/livesitter", "_blank");
        }
    }
};
</script>



<style lang="less">
.side-menu-wrapper {
    width: 100%;

    .ivu-tooltip,
    .drop-menu-a {
        width: 100%;
        display: block;
        color: #fff;
        text-align: center;
        padding: 10px 0;
    }
}
</style>
