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
        :placeholder="hotSearch||''"
        v-model="SearchWord"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
      />

      <div class="clear" @click="onClearClick">
        <van-icon name="clear" size="14px" color="#7a7b7c" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
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
      SearchWord: ""
    };
  },
  methods: {
    // 搜索框点击事件
    onSearchBarClick() {
      this.$emit("onClick");
    },
    // 点击清空时间
    onClearClick() {
      this.SearchWord = "";
      this.$emit("onClear");
    },
    //  输入监听事件
    onchange(e) {
      const { value } = e.mp.detail;
      this.$emit("onChange", value);
    },
    // 点击虚拟键盘搜索事件
    onConfirm() {
      const { value } = e.mp.detail;
      this.$emit("onConfirm", value);
    },
    // 获取输入框的值
    getValue() {
      return this.SearchWord;
    },
    // 给输入框赋值
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
    margin: 15px 15px 35px 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
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
      align-items: center;
      height: 100%;
    }
  }
}
</style>