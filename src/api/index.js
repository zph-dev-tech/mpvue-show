
//  请求首页数据
import {get,post} from "../utils/request.js"
const baseUrl='https://test.youbaobao.xyz:18081'
// 请求首页渲染数据
export function getHomeData(openId){
    return get(`${baseUrl}/book/home/v2`,{openId})
}
// 请求推荐换一批数据
export function getRecommend(param){
    return get(`${baseUrl}/book/home/recommend/v2`,param)
}
// 请求免费阅读换一批数据
export function getFreeRead(param){
    return get(`${baseUrl}/book/home/freeRead/v2`,param)
}
// 请求热门换一批数据
export function getHotBook(param){
    return get(`${baseUrl}/book/home/hotBook/v2`,param)
}
// 请求分类换一批数据
// export function getCategory(param){
//     return get(`${baseUrl}/book/home/recommend/v2`,param)
// }
// 获取openid
export function getOpenId(code){
    return get(`${baseUrl}/openId/get`,{
        appId:'wx64c1b07e1804bb36',
        secret:'03d0b9cabe7bec2602b6e8c90ce8d59a',
        code
    })
}

// 获取图书详情
export function getDetail(fileName,openId){
    return get(`${baseUrl}/book/detail`,{fileName,openId})
}
// 获取图书章节
export function getBookContents(fileName){
    return get(`${baseUrl}/book/contents`,{fileName})
}
// 获取图书评分
export function getBookRate(fileName,openId,rank){
    return get(`${baseUrl}/book/rank/save`,{fileName,openId,rank})
}
// 获取图书存储状态
export function getBookStorage(fileName,openId){
    return get(`${baseUrl}/book/shelf/get`,{fileName,openId})
}
// 加入书架
export function addOnShelf(shelf){
    return get(`${baseUrl}/book/shelf/save`,{ shelf: encodeURIComponent(JSON.stringify(shelf)) })
}
// 移除书架
export function removeFromShelf(shelf){
    return get(`${baseUrl}/book/shelf/remove`,{ shelf: encodeURIComponent(JSON.stringify(shelf)) })
}
// 关键词搜索
export function searchKeyWord(param){
    return get(`${baseUrl}/book/search`,param)
}
// 获得热门搜索词
export function getHotSearchWords(){
    return get(`${baseUrl}/book/hot-search`)
}

// 获取图书列表
export function getBookList(param){
    return get(`${baseUrl}/book/search-list`,param)
}
// 获取分类列表
export function getAllCategory(){
    return get(`${baseUrl}/book/category/list/v2`)
}
// 获取书架列表
export function getShelfList(openId){
    return get(`${baseUrl}/book/shelf/get`,openId)
}
// 获取用户加入天数
export function getJoinDays(openId){
    return get(`${baseUrl}/user/day`,openId)
}
