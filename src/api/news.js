import axios from './index'

// 获取新闻列表
const getHomeNewsList = async (params={})=>{
    let res = await axios.request({
        url: '/news/getHomeNews',
        method: 'get',
        params: params
    })
    return res.data.result;
};

// 获取轮播图
const getBannerNews = async ()=>{
    let res = await axios.request({
        url: '/news/getBannerNews',
        method: 'get'
    })

    return res.data.result;
}

// 获取新闻详情
const getNewsDetail = async (params)=>{
    let res = await axios.request({
        url: '/news/index',
        method: 'get',
        params: params
    })

    return res.data.result;
}

export {getHomeNewsList, getBannerNews, getNewsDetail}
