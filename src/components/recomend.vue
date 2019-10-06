<template>
  <div class="recomend">
    <div class="title">{{title}}</div>
    <!-- 推荐 -->
    <div class="bookShow" v-if="mode=='row'">
      <div class="bookRow" v-for="(item,index) in bookData" :key="index">
        <div class="bookWrap" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div class="book" @click="onBookClick">
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
            <ImageView :mode="'scaleToFill'" :src="book.cover" :height="'88px'"></ImageView>
          </div>
          <div class="bookName-free">
            <div class="bookTitle">{{book.title}}</div>
            <div class="author">
              <div class="top">{{book.author}}</div>
              <div class="bottom">{{book.categoryText}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 当前最热 -->
    <div class="bookShow" v-if="mode=='hot'">
      <div class="bookRow-hot" v-for="(item,index) in bookData" :key="index">
        <div class="bookWrap-hot" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div class="book-hot">
            <ImageView :mode="'scaleToFill'" :src="book.cover" :height="'99px'"></ImageView>
          </div>
          <div class="bookName-hot">{{book.title}}</div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="bookShow" v-if="mode=='category'">
      <div class="bookRow-category" v-for="(item,index) in bookData" :key="index">
        <div class="bookWrap-category" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div class="book-category">
            <ImageView :mode="'scaleToFill'" :src="book.cover" :height="'66px'"></ImageView>
          </div>
          <div class="bookInfo-category">
            <div class="category-category">{{book.categoryText}}</div>
            <div class="num">{{book.num}}本</div>
          </div>
        </div>
      </div>
    </div>

    <div class="action" @click="onMoreClick">
      <van-button round custom-class="action-btn">{{btntext}}</van-button>
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
   

    onMoreClick() {
      this.$emit('onMoreClick')
    },
    onBookClick() {
      this.$emit('onBookClick')
    }
  }
};
</script>

<style lang="less" scoped>
.recomend {
  margin-top: 20px;
  padding-top: 13px;
  margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  // border: 1px solid #000;
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
    // box-sizing: border-box;
    //  overflow: hidden;
    margin-top: 15px;
    margin-bottom: 20px;
    .bookRow {
      display: flex;
      justify-content: flex-start;
      .bookWrap {
        margin-right: 16px;
    //     box-sizing: border-box;
    //  overflow: hidden;
        .book {
          width: 101px;
          height: 147px;
        }
        .bookName {
          width: 101px;
          height: 35px;
           word-wrap: break-word;
         
          overflow: hidden;
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
      margin-bottom: 12px;
      .bookWrap-free {
        margin-right: 26.5px;
        display: flex;
        justify-content: flex-start;
        .book-free {
          width: 64px;
          height: 88px;
          margin-right: 9px;
        }
        .bookName-free {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .bookTitle {
            width: 79px;
            height: 36px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #1f1f1f;
            overflow: hidden;

            word-wrap: break-word;
          }
          .author {
            color: #868686;
            font-size: 12px;
            // 解决overflow hidden不生效的问题
            box-sizing: border-box;
             overflow: hidden;
            .top {
              width: 79px;
              height: 14px;
              line-height: 14px;
              overflow: hidden;
            }
            .bottom {
              margin-top: 2px;
              width: 79px;
              height: 14px;
              line-height: 14px;
            }
          }
        }
      }
    }
    // 当前最热
    .bookRow-hot {
      display: flex;
      justify-content: flex-start;
      .bookWrap-hot {
        margin-right: 21px;
        .book-hot {
          width: 68px;
          height: 99px;
        }
        .bookName-hot {
          margin-top: 9.5px;
          width: 68px;
          height: 35px;
          font-size: 12px;
          color: #212731;
          word-wrap: break-word;
          font-family: PingFangSC-Medium;
          overflow: hidden;
        }
      }
    }
    // 分类图书
    .bookRow-category {
      display: flex;
      justify-content: flex-start;
      .bookWrap-category {
        padding-left: 16px;
        padding-top: 13.5px;
        margin-right: 12px;
        position: relative;
        width: 161.5px;
        height: 96px;
        margin-bottom: 12px;
        background: #f8f9fb;
        border-radius: 10px;
        // border: 1px solid #000;
        // box-sizing: border-box;
        .book-category {
          width: 60px;
          height: 66px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .bookInfo-category {
          .category-category {
            font-size: 16px;
            color: #212832;
            margin-bottom: 29px;
            word-wrap: break-word;
          }
          .num {
            font-size: 12px;
            color: #868686;
          }
        }
      }
    }
    // 新增向
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
    color: #3696ef;
  }
}
</style>