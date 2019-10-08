<template>
  <div class="swiper-com">
    <!-- <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
       :circular="circular"
    >
      <block v-for="(item, index) in images" :key="index">
        <swiper-item>
          <image 
          :src="item.url" 
          class="slide-image" 
          mode="aspectFill"
           />
          <div class="info">
              {{item.info}}
          </div>
        </swiper-item>
      </block>
    </swiper>-->
    <!-- <div class="playBtn">
      <van-icon name="play-circle-o" color="#d4d574" size="40px" />
    </div> -->
    <div class="test" @click="test"></div>
  </div>
</template>

<script>
export default {
//   props: {
//     images: {
//       type: Array
//     }
//   },
//   data() {
//     return {
//       indicatorDots: true,
//       autoplay: true,
//       interval: 3000,
//       duration: 500,
//       circular: true
//     }
//   },
  methods: {
    test() {
      console.log("test=------------------------------");
    },
    // onPlayBtnClick() {
    //   console.log("swiper-onPlayBtnClick");

    //   this.emit("onPlayBtnClick");
    // }
  }
}
</script>

<style lang="less" scoped>
.swiper-com {
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
}
swiper {
  height: 376rpx !important;
}
image {
  height: 100%;
  width: 100%;
}
.playBtn {
  position: absolute;
  top: 78px;
  left: 152.5px;
}
.info {
  position: absolute;
  top: 20px;
  left: 5px;
  color: white;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
  text-indent: 20px;
}
.test {
  width: 200px;
  height: 200px;
  background-color: gold;
}
</style>