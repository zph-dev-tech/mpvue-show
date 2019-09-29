//  请求首页数据
import {get} from "../utils/request.js"
const baseUrl='https://test.youbaobao.xyz:18081'
export function getData(param){
    return get(`${baseUrl}/book/home/v2`,param)
}