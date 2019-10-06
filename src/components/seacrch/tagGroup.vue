<template>
  <div class="tagGroup">
    <div class="header">
      <div class="hot">{{headTxt}}</div>
      <div class="change" @click="onBtnClick">{{btnTxt}}</div>
    </div>
    <div class="content">
      <tag :value="value" @onTagClick="onTagClick"></tag>
    </div>
  </div>
</template>

<script>
import tag from "../../components/seacrch/tag.vue";
export default {
  components: {
    tag
  },
  props: {
      headTxt:{
          type:String,
          default:"热门搜索"
      },
      btnTxt:{
          type:String,
          default:"换一批"
      },
      value:{
          type:Array,
          default:["11111111111111111111",
        "22222",
        "a",
        "cccc",
        "微信小程序开发"]
      }
  },
  data() {
    return {
     
    };
  },
  methods: {
    onTagClick(item) {
        this.$emit('onTagClick',item)
    },
    onBtnClick(){
        this.$emit('onBtnClick')
    }
  }
};
</script>

<style lang="less" scoped>
.tagGroup {
    margin-top: 35px;
  padding-left: 14.5px;
  padding-right: 14.5px;

  //border: 1px solid #000;
  .header {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    .hot {
      font-size: 14px;
      color: #333333;
    }
    .change {
      font-size: 14px;
      color: #3696ef;
    }
  }
  .content {
    margin-top: 8px;
  }
}
</style>