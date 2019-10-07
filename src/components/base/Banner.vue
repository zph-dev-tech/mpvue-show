<template>
  <div class="Banner" @click="onBannerClick" :style="{ backgroundImage: bgurl}">
    <div class="title">{{title}}</div>
    <div class="actionButton">{{subTitle}}</div>
  </div>
</template>

<script>
import ImageView from "./ImageView.vue";
export default {
    computed: {
        bgurl(){
            return  'url('+this.img+')'
        }
    },
  components: {
    ImageView
  },
  props: {
    img: {
      type: String,
      default: "https://img1.doubanio.com/view/photo/l/public/p481175587.webp"
    },
    title: {
      type: String,
      default: "蓝色的孤独的地球，孤独的瓦力"
    },
    subTitle: {
      type: String,
      default: "马上观看"
    }
  },
  methods: {
    onBannerClick() {
      console.log('bannerCom-----');
      
      this.$emit("onBannerClick");
    }
  }
};
</script>

<style lang="less" scoped>
.Banner {
  width: 335px;
  height: 125px;
  margin: 20px 20px 0px 20px;
  border-radius: 12px;

  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 15px;
  color: #ffffff;
  padding: 30px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    font-weight: 500;
  }
  .actionButton {
    text-align: center;
    width: 100px;
    height: 30px;
    border-radius: 12px;
    border: 2px solid #fff;
    background-color: #4079d0;
    line-height: 30px;
    margin-top: 10px;
  }
}
</style>