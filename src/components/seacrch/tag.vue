<template>
  <div class="tagCom">
    <div class="tagwrapper" @click="onTagClick(item)" v-for="(item,index) in value" :key="index">
      <div class="tag">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  methods: {
    onTagClick(item) {
      this.$emit("onTagClick",item);
    }
  }
};
</script>

<style lang="less" scoped>
.tagCom {
  
   display: flex;
   justify-content: flex-start;
   flex-wrap: wrap;

  .tagwrapper {
    //border: 1px solid #000;
    //width: fit-content;
    padding: 5.5px 17.5px 6.5px 17px;
    background: #f7f7f9;
    border-radius: 16px;
    //height: 32px;
    text-align: center;
    margin-right: 12px;
    font-size: 14px;
    margin-top: 12px;
    //line-height: 32px;
    color: #272e37 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .tag {
      max-width: 70px;
      height: 20px;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>