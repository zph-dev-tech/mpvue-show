<template>
  <div class="HomeCard" >
    <div class="card-tab">
      <div class="homeCardInner">
        <div class="userAvatar">
          <img :src="avatarUrl" :mode='scaleToFill' alt />
        </div>
        <div class="userName">{{nickName}}</div>
        <div class="CardInfo">推荐图书{{num}}本&nbsp;.&nbsp;特别精选</div>
      </div>

      <div class="homeCardShow">
        <div class="book" v-for="(item,index) in bookList" :key="index" @click="onBookClick(item)">
          <ImageView
          :src="item.cover"
          :height="'101px'"
          ></ImageView>
        </div>
        <!-- <div class="book">
          <img src="https://img1.doubanio.com/view/subject/l/public/s29828719.jpg" />
        </div>
        <div class="book">
          <img src="https://img3.doubanio.com/view/subject/l/public/s1103152.jpg" />
        </div>-->

        <div class="bookShelf" @click="onShelfClick">书架</div>
        <div class="more">
          <van-icon name="arrow" color="#7d7f84" size="9px" />
        </div>
      </div>
      <div class="feedBack" @click="onFeedBack">反馈</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import ImageView from './ImageView.vue'
import Dialog from "vant-weapp/dist/dialog/dialog";
export default {
  components:{
    ImageView
  },
    computed: {
        bookList(){
            return this.data&&this.data.bookList
        },
        num(){
            return this.data&&this.data.num
        },
       userInfo(){
         return this.data&&this.data.userInfo
       },
        nickName(){
         return this.data&&this.data.userInfo&&this.data.userInfo.nickName
       },
        avatarUrl(){
         return this.data&&this.data.userInfo&&this.data.userInfo.avatarUrl
       }
    },
  props: {
    data: {
      type: Object,
      default: {}
    },
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  methods: {
      // 测试
      test(){
        console.log(this.nickName,this.avatarUrl);
      },
    //   跳转书架列表
   onShelfClick() {
     this.$emit('onShelfClick')
   },
    //   点击图书
    onBookClick(item) {
      
      
      this.$emit('onBookClick',item)
    },
    //签到
    sign() {},
    //   反馈
    onFeedBack() {
      Dialog.confirm({
        title: "反馈信息",
        message: "消息内容",
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
.HomeCard {
  margin-left: 20px;
  margin-top: 37px;
}
.card-tab {
  position: relative;
  box-sizing: border-box;

  width: 335px;
  height: 179px;
  background-image: linear-gradient(-90deg, #54575f 0%, #595b60 100%);
  border-radius: 15px;
  font-size: 12px;
  color: #b7b8bb;
  padding: 21.5px 17px 20px 20px;
  .homeCardInner {
    display: flex;
    justify-content: flex-start;
    .userAvatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 8.5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userName {
      margin-right: 8.5px;
      color: #eeeeee;
    }
  }
  .homeCardShow {
    margin-top: 18.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .book {
      width: 72px;
      height: 101px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bookShelf {
      font-size: 10.5px;
      writing-mode: vertical-lr;
    }
  }
  .feedBack {
    position: absolute;
    width: 44.5px;
    height: 23.5px;
    background-color: #7e7f84;
    font-size: 11px;
    text-align: center;
    line-height: 23.5px;
    color: #eeeeee;
    top: 19.5px;
    right: 0px;
    border-radius: 12px 0px 0px 12px;
  }
}
</style>