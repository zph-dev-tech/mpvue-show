import {get,post} from "../utils/request.js"
const baseUrl='https://test.youbaobao.xyz:18081'
import {getOpenId} from './index.js'

// 获取用户是否登陆信息
export function getSetting(auth, onSuccess, onFail) {
    mpvue.getSetting({
        success(res) {
            console.log('1--getsetting的返回据',res);
            if (res.authSetting[`scope.${auth}`]) {
                onSuccess(res)
            }
            else {
                onFail(res)
            }

        },
        fail(res) {
            console.log(res);


        }
    })
}
//  获取用户信息
export function getUserInfo(onSuccess, onFail) {
    mpvue.getUserInfo({
        success(res) {
            console.log('2---getUserInfo的返回数据',res);
            
            const { userInfo } = res
            if (userInfo) {
                onSuccess(userInfo)
            }
            else {
                onFail(console.log('fail....')
                )
            }

        },
        fail(res) {
            console.log(res);//抛出异常

        }
    })
}
// 缓存用户数据
export function setStorageSync(key,value) {
    mpvue.setStorageSync(key,value)
}
// 取出用户数据
export function getStorageSync(key){
    return mpvue.getStorageSync(key)
}
// 获取openid
export function getUserOpenId(callback){
    mpvue.login({
        success(res){
            if(res.code){
                console.log('3---login返回数据',res);
                getOpenId(res.code)
                .then(res=>{
                    console.log('4---openid的返回数据',res);  
                    const {data:{data:{openid}}}=res
                   console.log('5---openid值',openid);
                   setStorageSync('openId',openid)
                //    使用openid的事件
                   callback&&callback(openid)
                    
                })
                .catch(err=>{console.log(err);
                })
                
            }
            else{
                console.log("login-res",res); 
            }
        },
        fail(res){
            console.log('未获取到login返回数据',res);
            
        }
    })

}

// 用户注册
export function register(openId,userInfo){
    post(`${baseUrl}/user/register`,{
        openId,
        platform:mpvuePlatform ,
        ...userInfo
    }).then(res=>{console.log('6用户注册返回数据--',res);
    })
}
// 显示loading界面
export function showLoading(){
    mpvue.showLoading({
        mask:true,
        title:'加载中'
    })
}
// 隐藏loading
export function hideLoading(){
    mpvue.hideLoading()
}
// shezhiyemianbiaoti
export function setNavigationBar({ title }) {
    const wx = () => {
      mpvue.setNavigationBarTitle({ title })
    }
    const my = () => {
      mpvue.setNavigationBar({ title })
    }
    adapter({ wx, my })
  }
