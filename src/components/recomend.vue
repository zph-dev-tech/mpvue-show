<template>
  <div class="recomend" @click="test">
    <div class="title">{{title}}</div>
    <!-- 推荐 -->
    <div class="bookShow" v-if="mode=='row'">
      <div class="bookRow" v-for="(item,index) in bookData" :key="index">
        <div class="bookWrap" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div class="book">
            <ImageView :mode="scaleToFill" :src="book.cover" :height="'147px'"></ImageView>
          </div>
          <div class="bookName">{{book.title}}</div>
        </div>
      </div>
    </div>
    <!-- 当前热门 -->
    <div class="bookShow" v-if="mode=='col'">
      <div class="bookRow-free" v-for="(item,index) in bookData" :key="index">
        <div class="bookWrap-free" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div class="book-free">
            <ImageView :mode="scaleToFill" :src="book.cover" :height="'88px'"></ImageView>
          </div>
          <div class="bookName-free">
              <div class="bookTitle">{{book.title}}</div>
              <div class="author">
                  <div class="top">{{book.author}}</div>
                  <div class="bottom">{{book.category}}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 当前最热 -->

    <!-- 分类 -->

    <div class="action">
      <van-button  round   custom-class="action-btn">{{btntext}}</van-button>
    </div>
  </div>
</template>

<script>
import { Home_Book_Mode } from "@/utils/const.js";
import ImageView from "./base/ImageView.vue";
export default {
  components: {
    ImageView
  },
  props: {
    title: {
      type: String,
      default: "为你推荐"
    },
    data: {
      type: Array,
      default: []
    },
    btntext: {
      type: String,
      default: "换一批"
    },
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: Home_Book_Mode.row
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    //    处理数据:为组件的不同形式生成不同结构的数据
    bookData() {
      // 从父组件传来数据中解构赋值
      const { data, row, col } = this;
      if (data && data.length > 0) {
        const number = row * col;
        const _bookData = data.slice(0, number);
        const _bookDataRow = [];
        let _row = 0;
        while (_row < row) {
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col));
          _row++;
        }
        return _bookDataRow;
      } else {
        return [];
      }
    }
  },
  methods: {
    test() {
      console.log("将改变后的数据：", this.bookData);
    },

    onMoreClick() {},
    onBookClick() {}
  }
};
</script>

<style lang="less" scoped>
.recomend {
  padding-top: 13px;
  margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  .tittle {
    width: 84px;
    height: 29.5px;
    margin-top: 13px;
    font-size: 21px;
    color: #212933;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .bookShow {
    box-sizing: border-box;
    margin-top: 15px;
    .bookRow {
      display: flex;
      justify-content: flex-start;
      .bookWrap {
        margin-right: 16px;
        .book {
          width: 101px;
          height: 147px;
        }
        .bookName {
          width: 101px;
          height: 35.5px;
          // word-wrap: break-word;
          //border: 1px solid #000;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          text-align: center;
          color: #212731;
        }
      }
    }
    // 免费组件样式
    .bookRow-free {
        display: flex;
        justify-content: flex-start;
        .bookWrap-free {
            margin-left: 26.5px;
            .book-free {
                width: 64px;
                height: 88px;
            }
            .bookName-free {
                .bookTitle {

                }
                .author {
                    .top{

                    }
                    .bottom {

                    }
                }
            }
        }
    }

  }
}
</style>
<style lang="less">
.action {
    
  .action-btn {
    width: 100%;
   height: 41px;
    font-size: 14px;
   
   line-height: 41px;
    color:#3696ef;
  }
}
</style>