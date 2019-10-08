<template>
  <div class="skeleton">
    <div class="header"></div>
    <div class="homeCard">
      <div class="userInfo">
        <div class="avatar"></div>
        <div class="msg1"></div>
        <div class="msg"></div>
      </div>
      <div class="bookWarpper">
        <div class="book" v-for="(item,index) in array3" :key="index"></div>
      </div>
      <div class="shelf"></div>
    </div>
    <div class="banner"></div>

    <div class="recomend">
      <div class="title"></div>

      <!-- <div class="content"> -->
      <div class="bw">
        <div class="content" v-for="(item,index) in array3" :key="index"></div>
      </div>

      

      <!-- </div> -->

      <div class="btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      array3: [1, 2, 3]
    };
  }
};
</script>

<style lang="less" scoped>
.skeleton {
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  opacity: none;
  .header {
    margin-top: 15px;
    width: 344px;
    height: 40px;
    background: #f5f7f9;
    border-radius: 20px;
    
  }
  .homeCard {
      //box-sizing: border-box;
    position: relative;
    //box-sizing: border-box;
    margin-top: 37px;
    width: 315px;
    height: 179px;
    background: #505050;
    border-radius: 15px;
    padding-top: 21.5px;
    padding-left: 20px;
    //margin-right: 20px;
    .userInfo {
      margin-top: 21.5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;

        margin-right: 10.5px;
        background: #b7b7b7;
      }
      .msg {
        width: 53px;
        height: 12px;
        background: #d8d8d8;
        margin-left: 6px;
      }
      .msg1 {
        width: 20px;
        height: 12px;
        background: #d8d8d8;
      }
    }
    .bookWarpper {
        //box-sizing: border-box;
      margin-top: 19.5px;
      display: flex;
      justify-content: flex-start;
      .book {
          //box-sizing: border-box;
        width: 72px;
        height: 101px;
        margin-right: 20px;
        background: #edeff2;

        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .shelf {
      position: absolute;
      width: 14.5px;
      height: 20px;
      background: #edeff2;
      right: 31px;
      top: 123.5px;
    }
  }
  .banner {
    margin-top: 20px;
    width: 335px;
    height: 100px;
    background: #cdd1d2;
    border-radius: 12px;
  }
  .recomend {
    margin-top: 20.5px;
    width: 335px;
    height: 200px;
    

    .title {
      width: 56px;
      height: 24.5px;
      background: #b7b7b7;
    }
    .bw {
      margin-top: 16px;
      display: flex;
      justify-content: flex-start;
    }
    .content {
        box-sizing: border-box;
      width: 101px;
      height: 147px;
     

      margin-right: 16px;
      background: #edeff2;
      border: 1px solid rgba(0, 0, 0, 0.1);
      // border: 1px solid red;
      // background-color: yellow;
      // display: flex;
      // justify-content: flex-start;
    }

    

    .btn {
      margin-top: 20px;
      width: 335px;
      height: 24.5px;
      background: #e8ecef;
    }
  }
}
</style>