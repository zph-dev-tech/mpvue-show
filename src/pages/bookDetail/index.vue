<template>
  <div>
    <detail :book="detail"></detail>

    <detailStat :readers="readers" :readerNum="readerNum" :rankNum="rankNum" :rankAvg="rankAvg"></detailStat>

    <detailRate :rateValue="rankNum" @onRateChange="onRateChange"></detailRate>

    <detailContents :contents="bookContents"></detailContents>

    <detailBottom :isInShelf="isInShelf" @handleShelf="handleShelf" @readBook="readBook"></detailBottom>
  </div>
</template>

<script>
import detail from "../../components/bookDetail/detail.vue";
import detailContents from "../../components/bookDetail/detailContents.vue";
import detailRate from "../../components/bookDetail/detailRate.vue";
import detailStat from "../../components/bookDetail/detailStat.vue";
import detailBottom from "../../components/bookDetail/detailBottom.vue";

import {
  getDetail,
  getBookContents,
  getBookRate,
  getBookStorage,
  addOnShelf,
  removeFromShelf
} from "../../api/index.js";
export default {
  components: {
    detail,
    detailContents,
    detailRate,
    detailStat,
    detailBottom
  },
  data() {
    return {
      fileName: "",
      openId: "",
      detail: {},
      bookContents: {},
      rank: 4,
      readers: [],
      readerNum: 0,
      rankNum: 0,
      rankAvg: 0,
      isInShelf: false,
      book: {},
      // 存储状态data
      data: []
    };
  },
  methods: {
    // 获取图书详情
    getDetail() {
      const fileName = this.fileName;
      const openId = this.openId;
      getDetail(fileName, openId).then(res => {
        this.detail = res.data.data;
        this.readers = this.detail.readers;
        this.readerNum = this.detail.readerNum;
        this.rankNum = this.detail.rankNum;
        this.rankAvg = this.detail.rankAvg;
        console.log("detail返回数据", this.detail);
      });
    },
    // 获取目录章节
    getBookContents() {
      const fileName = this.fileName;
      getBookContents(fileName).then(res => {
        this.bookContents = res.data.data;
        console.log("contents-------", this.bookContents);
      });
    },
    // 当评分改变时刷新页面
    onRateChange(rank) {
      const fileName = this.fileName;
      const openId = this.openId;
      getBookRate(fileName, openId, rank).then(res => {
        this.getDetail();
      });
    },
    // 获取图书存储状态
    getBookStorage() {
      const fileName = this.fileName;
      const openId = this.openId;
      getBookStorage(fileName, openId).then(res => {
        console.log("存储状态", res.data.data.length);
        this.data = res.data.data;
        //  判断书是否在书架上若不再
       if(this.data.length == 0) {
          this.isInShelf = false
       }
       else{
         this.isInShelf = true
       }
         
          
        console.log("是否在书架上", this.isInShelf);
      });
    },
    // 改变存储状态
    handleShelf() {
      const fileName = this.fileName;
      const openId = this.openId;
      // 防止this指向转移
      const vue=this
      
      if (vue.isInShelf) {
        // 弹出对话框
        wx.showModal({
          title: "提示",
          content: `确定将${vue.detail.title}移出书架`,
          success(res) {
            if (res.confirm) {
              removeFromShelf(fileName, openId);
              vue.isInShelf = false;
              console.log("用户点击确定");
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else {
        // 弹出对话框
        wx.showModal({
          title: "提示",
          content: `确定将${vue.detail.title}添加至书架`,
          success(res) {
            if (res.confirm) {
              addOnShelf(fileName, openId);
              vue.isInShelf = true;
              console.log("用户点击确定");
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }

      // getBookStorage(fileName, openId).then(res=>{
      //   console.log("存储状态",res);
      //   this.data=res.data.data
      //   //  判断书是否在书架上若不再
      //   this.data.length==0?this.isInShelf=false:this.isInShelf=true
      //   console.log('是否在书架上',this.isInShelf);
      // })
    }
  },
  mounted() {
    //console.log(this.$route.query.openId);
    this.fileName = this.$route.query.fileName;
    this.openId = this.$route.query.openId;
    //this.book = this.$route.query.book;
    this.getDetail();
    this.getBookContents();
    //console.log("是否拿到book", this);
    this.getBookStorage();
  }
};
</script>

<style lang="less" scoped>
</style>