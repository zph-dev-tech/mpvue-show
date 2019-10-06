function createFly() {
    if (mpvuePlatform === 'wx') {
      const Fly = require('flyio/dist/npm/wx')
      return new Fly()
    } else if (mpvuePlatform === 'my') {
      const Fly = require('flyio/dist/npm/ap')
      return new Fly()
    } else {
      return null
    }
  }
//   错误处理
 function handleError(err){
     console.log(err);    
 } 

//  get请求
  export function get(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.get(url, params).then(response => {
        // 倾错误是弹窗
         if(response&&response.data&&response.data.error_code==0){
          console.log(response)
          resolve(response)
         }
         else {
          wx.showToast({
            title: '请求错误',
            // icon: 'success',
            duration: 2000
          })
      
         }
          
        }).catch(err => {
          console.log(err)
          handleError(err)
          reject(err)
        })
      })
    }
  }
//  post请求 
  export function post(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.post(url, params).then(response => {
           // 倾错误是弹窗
         if(response&&response.data&&response.data.error_code==0){
          console.log(response)
          resolve(response)
         }
         else {
          wx.showToast({
            title: '请求错误',
            // icon: 'success',
            duration: 2000
          })
      
         }
          
         
        }).catch(err => {
          console.log(err)
          handleError(err)
          reject(err)
        })
      })
    }
  }
  