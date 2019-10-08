<template>
  <div class="search-con">
    <div class="search-bar" @click="onSearchBarClick">
      <div class="search">
        <van-icon name="search" size="15px" color="#a0a6ae" />
      </div>
      <!-- 搜索框数据 -->
      <input
        type="text"
     
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="keyword||''"
        placeholder-style="color:#ADB4BE"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
       v-model="SearchWord" />

      <div class="clear" @click="onClearClick">
        <van-icon 
        name="clear" 
        size="14px" 
        color="#7a7b7c" 
        v-if="SearchWord.length>0"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // keyword(){
    //   return this.hotSearch&&this.hotSearch.keyword
    // }
  },
  props: {
    // bug设置为false的话会随时失去焦点
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: "搜索"
    }
  },
  data() {
    
    return {
      SearchWord:'',
      keyword:'computer'
    }
  },
  methods: {
    //  解决输入框光标bug
    //handleSearchChange (e) {
      //console.log(e.mp.detail.value);
      
       //this.SearchWord= e.mp.detail.value
   // },
    //搜索框点击事件
    onSearchBarClick() {
      //console.log('s-s-b-c');
      
      this.$emit("onSearchBarClick");
    },
    //点击清空时间
    onClearClick() {
      this.SearchWord = "";
      this.$emit("onClearClick");
    },
    // 输入监听事件
    onChange(e) {
      const { value } = e.mp.detail;
      console.log('S-B输入事件监听',value);
      
      this.$emit("oc",value);
    },
    //点击虚拟键盘搜索事件
    onConfirm(e) {
      const { value } = e.mp.detail;
      console.log('确认。。。。',value);
      this.$emit("onConfirm",value,this.keyword);
      
      
    },
    //获取输入框的值
    getValue() {
      return this.SearchWord;
    },
    //给输入框赋值
    setValue(v) {
      this.SearchWord = v;
    }
  }
};
</script>

<style lang="less" scoped>
.search-con {
  .search-bar {
    width: 345px;
    height: 40px;
    padding-left: 16.3px;
    padding-right: 18.1px;
    border-radius: 20px;
    background-color: #f5f7f9;
    margin: 15px 15px 0px 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, .3);
    .search {
      display: flex;
      align-items: center;
      height: 100%;
    }
    input {
      flex: 1;
      margin-left: 11.8px;
      font-family: PingFangSC-Regular;
      //   font-size: 15px;
      color: #000000;
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 14px;
    }
    .clear {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 40px;
      //background-color: red;
    }
  }
}
</style>