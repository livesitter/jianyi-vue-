<template>
    <div>
        <Divider v-show="noMore">没有更多了</Divider>
        <Button v-show="!noMore" @click="footerClick" type="dashed" long>加载更多</Button>
    </div>

</template>

<script>
import Vue from "vue"
import {Divider} from "iview"

export default {
    name:"ListFooter",
    props:{
        noMore:{
            type:Boolean,
            default: false
        }
    },
    methods:{
        footerClick(){
            this.$emit('click')
        }
    }
}
</script>

<style lang="less">

</style>
