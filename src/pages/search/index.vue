<template>
  <div class="search-index">
    <SearchBar :focus="focus" @oc="oc" @onClearClick="onClearClick" @onConfirm="onConfirm"></SearchBar>
    <!-- 热门搜索 -->
    <tagGroup
      :value="hotSearchWords"
      @onTagClick="hotSearch"
      @onBtnClick="change"
      v-if="hotSearchWords.length>0&&!isShowList"
    ></tagGroup>
    <!-- 历史搜索 -->
    <tagGroup
      :value="historySearchWords"
      :headTxt="'历史搜索'"
      :btnTxt="'清空'"
      @onTagClick="historySearch"
      @onBtnClick="clearHistory"
      v-if=" historySearchWords.length>0&&!isShowList"
    ></tagGroup>
    <!-- 分类 -->
    <category 
    
    @onCategoryItemClick="categorySearch" :title="categoryText" v-if="categoryText"></category>
    <!-- 作者 -->
    <category
      :title="author"
      :icon="'manager'"
      :subTitle="'作者'"
      @onCategoryItemClick="authorSearch"
      v-if="author"
    ></category>
    <!-- 出版社 -->
    <category
      :title="publisher"
      :icon="'wap-home'"
      :subTitle="'出版社'"
      @onCategoryItemClick="publisherSearch"
      v-if="publisher"
    ></category>

    <bookList v-if="isShowList" :data="lists"></bookList>
  </div>
</template>

<script>
import tagGroup from "../../components/seacrch/tagGroup.vue";
import SearchBar from "../../components/SearchBar.vue";
import category from "../../components/seacrch/category.vue";
import bookList from "../../components/seacrch/bookList.vue";

import { searchKeyWord, getHotSearchWords } from "../../api/index.js";
import { getStorageSync, setStorageSync } from "../../api/wechat.js";
export default {
  computed: {
    isShowList() {
      const list = Object.keys(this.bookList);
      return list.length > 0;
    },
    lists() {
      if (this.bookList == 0) {
        return {};
      } else {
        return this.bookList ;
      }
    },
    author() {
      if (
        this.keyWordBackData &&
        this.keyWordBackData.author &&
        this.keyWordBackData.author.length > 0
      ) {
        return this.keyWordBackData.author[0].author;
      } else {
        return null;
      }
    },
    publisher() {
      if (
        this.keyWordBackData &&
        this.keyWordBackData.publisher &&
        this.keyWordBackData.publisher.length > 0
      ) {
        return this.keyWordBackData.publisher[0].publisher;
      } else {
        return null;
      }
    },
    categoryText() {
      if (
        this.keyWordBackData &&
        this.keyWordBackData.category &&
        this.keyWordBackData.category.length > 0
      ) {
        return this.keyWordBackData.category[0].categoryText;
      } else {
        return null;
      }
    }
  },
  components: {
    tagGroup,
    SearchBar,
    category,
    bookList
  },
  data() {
    return {
      focus: true,
      data: [],
      keyWordBackData: {},
      hotSearchWords: [],
      historySearchWords: [],
      bookList: [],
      category: "",
      //   categoryText:'',
      //   author:'',
      //   publisher:'',
      openId: "",
      page: 1,
      keyword:''
    };
  },
  methods: {
    //   获取热搜词
    getHotSearchWords() {
      getHotSearchWords().then(res => {
        console.log("热搜词组", res);
        res.data.data.forEach(item => {
          if (this.hotSearchWords.length > 5) {
            return;
          } else {
            this.hotSearchWords.push(item.title);
          }
        });
        console.log("截取后的热搜词组", this.hotSearchWords);
      });
    },
    //   搜索关键词
    searchKeyWord(keyWords) {
      searchKeyWord(keyWords).then(res => {
        console.log("搜索关键字返回的数据", res);
        this.keyWordBackData = res.data.data;
        const book=this.keyWordBackData.book;
        console.log("keyWordBackData", this.keyWordBackData);
        this.bookList.push(...book);
      });
    },
    // 输入并搜索
    oc(searchWords) {
        this.keyword=searchWords;
      if (!searchWords || searchWords.trim().length === 0) {
        //   搜索栏删除文字时数据要清空
        // this.bookList = [];
        // this.keyWordBackData = {};
        // this.page=1
        return;
      } else {
        this.searchKeyWord({
          keyword: searchWords,
          openId: this.openId
        });
      }
    },
    // 点击清除
    onClearClick() {
      this.bookList = [];
      //   this.author = null;
      //   this.publisher = null;
      //   this.categoryText = null;
      this.keyWordBackData = {};
    },
    // 点击键盘搜索
    onConfirm(keyword, defaultValue) {
      console.log("再次确认。。。。", keyword, defaultValue);
      if (!keyword || keyword.trim().length === 0) {
        // 空值时直接搜默认值computer
        console.log("走这了吗");

        this.searchKeyWord({
          keyword: defaultValue,
          openId: this.openId
        });
      } else {
        this.searchKeyWord({
          keyword: keyword,
          openId: this.openId
        });
        if (this.historySearchWords.includes(keyword)) {
          return;
        } else {
          this.historySearchWords.push(keyword);
          setStorageSync("historySearchWords", this.historySearchWords);
        }
      }
    },
    // showBookList() {},
    // onTagClick() {},
    // onBtnClick() {},
    // 热词搜索
    hotSearch() {},
    // 换一批
    change() {
      getHotSearchWords().then(res => {
        console.log("热搜词组", res);
        res.data.data.forEach(item => {
          if (this.hotSearchWords.length > 5) {
            return;
          } else {
            this.hotSearchWords.push(item.title);
          }
        });
        var start = Math.round(Math.random() * 5 + 1);
        var end = start + 4;
        this.hotSearchWords = this.hotSearchWords.slice(start, end);
        console.log("截取后的热搜词组", start, end, this.hotSearchWords);
      });
    },
    // 历史搜索
    historySearch(item) {
      this.searchKeyWord({
        keyword: item,
        openId: this.openId
      });
    },
    //清空历史搜索
    clearHistory() {
      (this.historySearchWords = []), setStorageSync("historySearchWords", []);
    }

    // unchange??
    // categorySearch() {},
    // authorSearch() {},
    // publisherSearch() {}
  },
  //   页面滚动时失去焦点否则会出问题
  onPageScroll() {
    if (this.focus) {
      this.focus = false;
    }
  },
  //   到达底部时加载新数据
  onReachBottom() {
      console.log('开始了吗',this.bookList,bookList.length>0);
      
    // if (bookList&&bookList.length>0) {
        
        
      this.page++;
      console.log('加加了吗');
      searchKeyWord({
        keyword: this.keyword,
        openId: this.openId,
        page: this.page
       
        
      }).then(res => {

           console.log('执行了吗');
        this.keyWordBackData = res.data.data;
        const book=this.keyWordBackData.book;
        
        
        if(book.length>0){
            this.bookList.push(...book);
        }
        else{
            wx.showToast({
            title: '没有更多数据了',
            // icon: 'success',
            duration: 2000
          })
            return
        }
        
      });
    // }
    console.log("bottom...",this.page,this.bookList);
  },

  mounted() {
    this.openId = getStorageSync("openId");
    this.getHotSearchWords();
    this.historySearchWords = getStorageSync("historySearchWords");
  }
};
</script>

<style lang="less" scoped>
.seacrch-index {
}
</style>