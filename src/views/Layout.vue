<template>
    <div class="layout-wrapper">
        <Layout class="layout-outer">
            <Header class="header-wrapper">
                <Menu mode="horizontal" theme="dark" active-name="1" style="height:100%; background:#333">
                    <div class="layout-logo">
                        <img src="@/assets/image/logo2.png">
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider style="background:#444" :width="80" breakpoint="sm" hide-trigger>
                    <side-menu />
                </Sider>
                <Content class="page-content">
                    <transition name="route">
                        <router-view></router-view>
                    </transition>
                </Content>
            </Layout>
            <Footer class="footer" style="background:#333">
                <div class="app">
                    <div class="footer-title">安卓App：</div>
                    <div>
                        <a href="http://kly888.club:8007/download/jianyi.apk">
                            <img class="iview" src="@/assets/image/apk.png">
                        </a>
                    </div>
                </div>
                <div class="thanks">
                    <div class="footer-title">特别感谢：</div>
                    <div>
                        <a href="https://www.iviewui.com">
                            <img class="iview" src="@/assets/image/iview.png">
                        </a>
                        <a href="http://www.easyswoole.com">
                            <img class="es" src="@/assets/image/easyswoole.png">
                        </a>

                    </div>
                </div>
                <div class="friendly">
                    <div class="footer-title">友情链接：</div>
                    <div class="link">
                        <a href="https://www.maitube.com">麦麦网</a>
                    </div>
                </div>

            </Footer>
        </Layout>
        <i-backTop></i-backTop>
    </div>
</template>


<script>
/************************* 引入部分*************************/
import Vue from "vue";
import SideMenu from "_c/side-menu";

export default {
    components: {
        SideMenu
    },
    computed: {
        triggerClasses() {
            return ["triggerIcon", this.collapsed ? "" : "rotate"];
        }
    },
    methods: {
        handleCollapsed() {
            this.collapsed = !this.collapsed;
        }
    }
};
</script>


<style lang="less">
// 外层
.layout-wrapper {
    &::-webkit-scrollbar {
        display: none;
    }
    .ivu-layout {
        background: #fff;
    }
}
.layout-wrapper,
.layout-outer {
    min-width: 1000px;
    .header-wrapper {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        text-align: left;
        padding: 0;
        margin: 0;
        height: 100px;
        .layout-icon {
            line-height: 100px;
            margin: 0 20px;
            float: left;
            position: relative;
            color: #fff;

            .triggerIcon {
                display: inline-block;
                z-index: 10;
                cursor: pointer;
                transition: transform 0.5s ease;
                &.rotate {
                    transform: rotate(-90deg);
                    transition: transform 0.5s ease;
                }
            }
        }
        .layout-logo {
            height: 100px;
            width: 153px;
            position: absolute;
            left: 300px;
            img {
                height: 100px;
                width: 320px;
            }
        }
        .layout-nav {
            width: 420px;
            // position: absolute;
            // right: 200px;
            margin-left: 1300px;
            height: 100%;
            line-height: 100px;

            .ivu-menu-item {
                height: 100%;
            }
        }
    }
    .page-content {
        padding: 10px;
        min-height: ~"calc(100vh - 84px)";
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .footer {
        margin: 0;
        padding: auto 0;
        padding-left: 0;
        height: 130px;
        display: flex;
        justify-content: center;
        .app {
            font-size: 16px;
            color: #fff;
            display: flex;
            flex-direction: column;
            margin-right: 250px;
            .footer-title {
                align-self: flex-start;
                font-weight: 600;
            }
            img {
                height: 65px;
                width: 65px;
                margin-left: 100px;
            }
        }
        .thanks {
            font-size: 16px;
            color: #fff;
            display: flex;
            flex-direction: column;
            margin-right: 200px;
            .footer-title {
                align-self: flex-start;
                font-weight: 600;
            }
            .iview {
                height: 55px;
                width: 130px;
                margin-right: 30px;
                margin-left: 100px;
            }
            .es {
                height: 55px;
                width: 200px;
            }
        }
        .friendly {
            font-size: 16px;
            color: #fff;
            display: flex;
            flex-direction: column;
            .footer-title {
                align-self: flex-start;
                margin-bottom: 10px;
                font-weight: 600;
            }
            .link {
                a {
                    color: #808695;
                    &:hover {
                        color: #2d8cf0;
                        border-bottom: 1px solid #2d8cf0;
                    }
                }
            }
        }
    }
}
#menu-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 50px;
    margin-bottom: 10px;
}

/*************************** 路由切换动画 ***************************/
.route-enter {
    opacity: 0;
}

.route-enter-active {
    transition: opacity 4s ease;
}

.route-to {
    opacity: 1;
}

.route-leave {
    opacity: 1;
}

.route-enter-active {
    transition: opacity 4s ease;
}

.route-leave-to {
    opacity: 0;
}
</style>
