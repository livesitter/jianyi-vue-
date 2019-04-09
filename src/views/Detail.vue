<template>
    <div class="about" v-if="loaded">
        <Row :gutter="10">
            <i-col :xl="6" :lg="2" :md="1"></i-col>
            <!--分成两列-->
            <i-col :xl="12" :lg="20" :md="22" push="1" class="newsBox">
                <div class="news-info">
                    <h1 class="title">{{title}}</h1>
                    <span class="author">{{author}}</span>
                    <span class="time">{{c_time}}</span>
                </div>
                <div v-for="(item,index) in newsArr" :key="`content_${index}`">
                    <div v-if="(item.flag == 'img')">
                        <div class="newsImgBox">
                            <img v-lazy="item.content" />
                        </div>
                    </div>
                    <div v-else-if="(item.flag == 'content')">
                        <p>{{item.content}}</p>
                    </div>
                    <div v-else-if="(item.flag == 'video')" class="video-box">
                        <video :src="item.content" controls="controls"></video>
                    </div>
                </div>

                <div class="news-source">
                    <Divider />
                    <p>本文内容采集自互联网，一切版权归原作者所有。</p>
                    <p>原文链接：<a :href="url">{{url}}</a></p>
                </div>
            </i-col>
            <i-col :xl="6" :lg="2" :md="1"></i-col>
        </Row>
        <i-backTop></i-backTop>
    </div>

</template>

<script>
import iView from "iview";
import { getNewsDetail } from "@/api/news";

export default {
    data() {
        return {
            author: "",
            title: "",
            url: "",
            c_time: "",
            newsArr: [],
            id: 0,
            completed: false
        };
    },
    props: {},
    computed: {
        loaded() {
            let status = this.completed == true ? true : false;
            return status;
        }
    },
    methods: {
        async getInfo() {
            // 新闻详情内容
            let res = await getNewsDetail({ id: this.$route.query.id });

            //　结果数组
            let result = [];

            // 正文内容
            let content = res.content;

            // 遍历
            for (let i in content) {
                // 后面三位表示内容
                let ext = content[i].substr(-3);

                // 正常内容
                let flag = "content";

                // 图片后缀
                let imgArr = ["jpg", "png", "gif"];
                if (imgArr.indexOf(ext) > -1) {
                    flag = "img";
                }

                // 视频后缀
                if (ext == "mp4") {
                    flag = "video";
                }

                let myArray = {
                    flag: flag,
                    content: content[i]
                };

                result.push(myArray);
            }

            this.title = res.title;
            this.author = res.author;
            this.c_time = res.c_time;
            this.url = res.url;
            this.newsArr = result;

            // 缓存到本地
            this.cacheNews(this.$route.query.id);
        },

        // 缓存文章内容
        cacheNews(id) {
            // 缓存数组
            let cacheObj = {
                title: this.title,
                author: this.author,
                c_time: this.c_time,
                url: this.url,
                newsArr: this.newsArr
            };

            // 保存到缓存里
            let cacheKey = "news_" + id;
            sessionStorage.setItem(cacheKey, JSON.stringify(cacheObj));
        },

        // 获取缓存文章
        getCacheNews(id) {
            let cacheData = JSON.parse(
                sessionStorage.getItem("news_" + id) || null
            );
            return cacheData;
        },

        // 读取缓存内容
        loadCacheNews(cacheData) {
            this.title = cacheData.title;
            this.author = cacheData.author;
            this.c_time = cacheData.c_time;
            this.url = cacheData.url;
            this.newsArr = cacheData.newsArr;
        }
    },

    created() {
        iView.Spin.show();
        // 尝试从缓存获取内容
        let cacheNews = this.getCacheNews(this.$route.query.id);

        if (!cacheNews) {
            // 获取新闻详情
            this.getInfo();
        } else {
            this.loadCacheNews(cacheNews);
        }
        setTimeout(() => {
            iView.Spin.hide();
            this.completed = true;
        }, 1000);
    }
};
</script>

<style lang="less">
.about {
    background: #fff;

    .ivu-col {
        margin-top: 30px;
        background-clip: content-box;
        margin-right: 10px;
    }

    .newsBox {
        max-width: 700px;
        min-height: calc(100vh);
        background-clip: content-box;
        text-align: left;

        .news-info {
            margin-bottom: 50px;
            .title {
                margin-bottom: 20px;
            }

            span {
                font-size: 16px;
                margin-right: 23px;
            }

            .time {
                color: #a7a7a7;
            }
        }

        p {
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 35px;
            text-indent: 20px;
        }

        .newsImgBox {
            margin-bottom: 20px;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .video-box{
            display: flex;
            justify-content: center;
            width: 100%;
            video{
                width: 100%;
            }
        }
        .news-source {
            margin-bottom: 20px;
            p {
                color: #c5c8ce;
                font-size: 14px;
                margin-bottom: 10px;
                line-height: 20px;
                text-indent: 0;
            }
        }
    }
}
</style>
