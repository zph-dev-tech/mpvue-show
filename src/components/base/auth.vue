<template>
  <!-- 登陆授权面板 -->
  <div class="backGround">
    <div class="auth">
      <div class="logo">
        <img src="../../../static/logo/logo1.jpg" alt />
        <!-- <imageView :src="'../../../static/logo/logo.jpg'" :round="true" :height="'74px'"></imageView> -->
      </div>
      <div class="title">登陆应用</div>
      <div class="intro">好书等你来读</div>
      <button @getuserinfo="getUserInfo" open-type="getUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import imageView from "./ImageView.vue";
export default {
  components: {
    imageView
  },
  methods: {
    getUserInfo(){
        console.log('open-type');
        
        this.$emit('getUserInfo')
    }
  }
};
</script>

<style lang="less" scoped>
.backGround {
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth {
    position: relative;
    width: 270px;
    height: 248px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 18px;
    text-align: center;
    .logo {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 22.5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: 18px;
      width: 78px;
      height: 18px;
      font-size: 13px;
      line-height: 18px;
      color: #999999;
    }
    .intro {
      width: 112px;
      height: 22.5px;
      margin-top: 3.5px;
      font-size: 16px;
      color: #333333;
      line-height: 22.5px;
    }
    button {
      width: 100%;
      height: 49px;
      position: absolute;
      bottom: 0;
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      border-radius: 0 0 18px 18px;
      font-size: 15px;
      line-height: 49px;
      color: #ffffff;
      font-weight: 400;
    }
  }
}
</style>