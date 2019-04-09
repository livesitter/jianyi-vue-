<template>
    <div class="home" v-if="loaded">
        <Row :gutter="10">
            <i-col :xl="4" :md="0" :sm="0" :xs="0"></i-col>
            <!--分成两列-->
            <i-col :xl="16" :md="20" :sm="20" :xs="20" push="1" class="contentBox">
                <!-- 轮播图 -->
                <Carousel :autoplay="true" trigger="hover">
                    <template v-for="(bannerItem,index) in bannerNews">
                        <CarouselItem :key="`banner_${index}`">
                            <div class="carouselItem" @click="toDetail(bannerItem.id)">
                                <span>{{bannerItem.title}}</span>
                                <img v-lazy="bannerItem.img" alt style>
                            </div>
                        </CarouselItem>
                    </template>
                </Carousel>
                <!-- 新闻选项卡 -->
                <Tabs value="name1" @on-click="changeTab" :style="tabHeight">
                    <TabPane label="最新" name="name1">
                        <template v-for="(item, index) in newsList0">
                            <List :key="`news_${index}`" :info="item"></List>
                        </template>
                        <ListFooter :noMore="all" @click="loadMore" />
                    </TabPane>
                    <TabPane label="IT之家" name="name2">
                        <template v-for="(item, index) in newsList1" v-show="false">
                            <List :key="`news_${index}`" :info="item"></List>
                        </template>
                        <ListFooter :noMore="all" @click="loadMore" />
                    </TabPane>
                    <TabPane label="虎嗅" name="name3">
                        <template v-for="(item, index) in newsList2">
                            <List :key="`news_${index}`" :info="item"></List>
                        </template>
                        <ListFooter :noMore="all" @click="loadMore" />
                    </TabPane>
                    <TabPane label="懂球帝" name="name4">
                        <template v-for="(item, index) in newsList3">
                            <List :key="`news_${index}`" :info="item"></List>
                        </template>
                        <ListFooter :noMore="all" @click="loadMore" />
                    </TabPane>
                </Tabs>
            </i-col>
            <i-col :xl="4" :md="0" :sm="0" :xs="0"></i-col>
        </Row>
    </div>
</template>

<script>
/************************* 引入部分*************************/
import iView from "iview";
import List from "_c/list";
import ListFooter from "_c/list-footer";
import { getHomeNewsList, getBannerNews } from "@/api/news";

export default {
    name: "home",
    props: {},
    data() {
        return {
            busy: false,
            bannerNews: [],
            newsList0: [],
            newsList1: [],
            newsList2: [],
            newsList3: [],
            completed: false,
            currentTab: 0,
            tabItemHeight: "",
            totalPage: 0,
            currentPage: 0,
            all: false
        };
    },
    computed: {
        loaded() {
            let status = this.completed == true ? true : false;
            return status;
        },
        tabHeight() {
            let height = this.tabItemHeight == "" ? "" : this.tabItemHeight;
            return height;
        }
    },
    components: { List, ListFooter },
    async created() {

        iView.Spin.show();

        try {
            // 轮播图
            let bannerNews = await getBannerNews();
            this.bannerNews = await bannerNews;

            // 新闻列表
            let res = await this.setNewsList();
            if (!res) {
                throw "服务器内部错误";
            }

            setTimeout(() => {
                iView.Spin.hide();
                this.completed = true;
            }, 500);
        } catch (err) {
            iView.Spin.hide();
            iView.Modal.error({
                title: "错误提示",
                content: "获取内容失败"
            });
        }
    },
    methods: {
        changeTab(e) {
            // 重设高度
            this.tabItemHeight = "";

            // 重设当前页
            this.currentPage = 0;

            // 重设总页数
            this.totalPage = 0;

            // 重设脚部
            this.all = false;

            // 显示加载进度条
            iView.LoadingBar.start();

            // 数组索引
            let index = e.substr(-1) - 1;

            // 当前索引存入data
            this.currentTab = index;

            // 数据key
            let list = this.getDataKey(index);

            // 已经加载过的就不再重新请求
            if (list.length !== 0) {
                // 动态设置高度
                let tabHeight = list.length * 216 + 75;
                this.tabItemHeight = "height:" + tabHeight + "px";
                // 隐藏加载进度条
                iView.LoadingBar.finish();
                return;
            }

            // 设置数据
            this.setNewsList(index);

            // 隐藏加载进度条
            iView.LoadingBar.finish();
        },
        // 加载新闻列表数据
        async setNewsList(index = 0, update = 0) {
            // 请求参数
            let param;
            if (index === 0) {
                param = {
                    page: this.currentPage + 1
                };
            } else if (index !== 0) {
                param = {
                    cat: index,
                    page: this.currentPage + 1
                };
            }

            // 数据
            let res = await getHomeNewsList(param);

            // 获取数据失败
            if (!res) {
                return false;
            }

            // 为空判断
            if (!res.lists) {
                // 判断是否为首次获取
                if (!update) {
                    return false;
                }
                iView.Message.warning("没有更多了");
                return true;
            }

            if (!update) {
                // 设置data数据
                this.setDataList(index, res);
            } else {
                // 更新data数据
                this.updateDataList(index, res);
            }

            // 设置总页数
            this.totalPage = res.total_page;

            // 设置当前页
            this.currentPage = this.currentPage + 1;

            if (this.currentPage >= this.totalPage) {
                this.all = true;
            }

            let newsList = this.getDataKey(index);

            // 动态设置高度
            let itemHeight = newsList.length * 216 + 75;
            this.tabItemHeight = "height:" + itemHeight + "px";
            return true;
        },
        // 加载下一页
        loadMore() {
            // 当前页是否超过总页数
            if (this.currentPage >= this.totalPage) {
                return;
            }

            // 加载下一页数据
            this.setNewsList(this.currentTab, 1);
        },
        getDataKey(index) {
            let list;
            switch (index) {
                case 0:
                    list = this.newsList0;
                    break;
                case 1:
                    list = this.newsList1;
                    break;
                case 2:
                    list = this.newsList2;
                    break;
                case 3:
                    list = this.newsList3;
                    break;
            }
            return list;
        },
        setDataList(index, res) {
            switch (index) {
                case 0:
                    this.newsList0 = res.lists;
                    break;
                case 1:
                    this.newsList1 = res.lists;
                    break;
                case 2:
                    this.newsList2 = res.lists;
                    break;
                case 3:
                    this.newsList3 = res.lists;
                    break;
                default:
                    break;
            }
        },
        updateDataList(index, res) {
            switch (index) {
                case 0:
                    this.newsList0.push.apply(this.newsList0, res.lists);
                    break;
                case 1:
                    this.newsList1.push.apply(this.newsList1, res.lists);
                    break;
                case 2:
                    this.newsList2.push.apply(this.newsList2, res.lists);
                    break;
                case 3:
                    this.newsList3.push.apply(this.newsList3, res.lists);
                    break;
                default:
                    break;
            }
        },
        toDetail(id) {
            let routeData = this.$router.resolve({
                name: "detail",
                query: { id: id }
            });
            window.open(routeData.href, "_blank");
        }
    }
};
</script>

<style lang="less">
.home {
    background: #fff;
    .ivu-col {
        margin-top: 10px;
        background-clip: content-box;
        margin-right: 10px;
    }
    .contentBox {
        max-width: 900px;
    }
    .side-content {
        background: yellow;
        min-height: calc(100vh);
    }
    .ivu-carousel {
        width: 100%;
        .carouselItem {
            height: 550px;
            width: 100%;
            &:hover {
                cursor: pointer;
            }
            span {
                text-align: left;
                line-height: 60px;
                width: 100%;
                color: #fff;
                background-color: #000;
                filter: Alpha(Opacity=60);
                opacity: 0.6;
                font-weight: bold;
                font-size: 30px;
                margin-top: 450px;
                padding-left: 20px;
                position: absolute;
            }
            img {
                width: 100%;
            }
        }
    }
    .ivu-tabs {
        margin-top: 15px;

        .ivu-tabs-bar {
            margin-bottom: 0;
            border-bottom: none;
        }
        .ivu-tabs-nav {
            height: 40px;
        }
        .ivu-tabs-tab {
            width: 200px;
            font-size: 16px;
        }
        .ivu-tabs-content {
            padding-top: 16px;
            .ivu-tabs-tabpane {
                padding: 0 10px;
            }
        }
    }
}
</style>

