<template>
    <Card :bordered="false">
        <Row :gutter="10" :class="cardStyle">
            <i-col :lg="5" :md="8" :sm="8" :xs="9" class="imgBox">
                <img v-lazy="info.img" @click="toDetail(info.id)">
            </i-col>
            <i-col :lg="9" :md="10" :sm="10" :xs="10" class="infoBox">
                <h3 class="news-title" @click="toDetail(info.id)">{{info.title}}</h3>
                <div>
                    <span class="author">{{info.author}}</span>
                    <span>{{info.create_time}}</span>
                </div>
            </i-col>
        </Row>
    </Card>

</template>

<script>
/************************* 引入部分*************************/
import Vue from "vue";
import { Row, Col, Card } from "iview";
Vue.component("Row", Row);
Vue.component("Card", Card);
Vue.component("i-col", Col);

export default {
    name: "List",
    data() {
        return {
            hovered: false
        };
    },
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        cardStyle() {
            let style = this.hovered ? "active" : "default";
            return style;
        }
    },
    methods: {
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
.ivu-card {
    margin-bottom: 15px;
    text-align: left;

    .ivu-card-body {
        height: 200px;

        .imgBox {
            margin: 0;
            min-width: 240px;

            img {
                height: 160px;
                width: 230px;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .infoBox {
            margin-top: 0;
            text-align: left;
            font-size: 16px;
            position: relative;

            .news-title:hover {
                color: #2d8cf0;
                cursor: pointer;
            }

            div {
                top: 132px;
                position: absolute;

                .author{
                    margin-right:30px
                }
            }
        }
    }
}
</style>

