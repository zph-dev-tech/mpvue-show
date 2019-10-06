<template>
  <div class="category" @click="OnCategoryClick">
    <div class="itemWrapper">
      <div class="itemIcon">
        <van-icon :name="icon" />
      </div>
      <div class="itemText">
        <div class="title">{{title}}</div>
        <div class="itemCategory">{{subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props : {
        title:{
            type:String,
            default:'计算机科学'
        },
        subTitle:{
            type:String,
            default:'类别'
        },
        icon:{
            type:String,
            default:'bars'
        }
    },
    methods: {
        OnCategoryClick(){
            this.$emit('onCategoryItemClick')
        }
    },
};
</script>

<style lang="less" scoped>
.category {
    margin-left: 14.5px;
    margin-right: 14.5px;
    margin-top: 20px;
  .itemWrapper {
    display: flex;
    justify-content: flex-start;
    .itemIcon {
      width: 32px;
      height: 32px;
      background: #f7f7f9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 10px;;
    }

    .itemText {
      .title {
        font-size: 14px;
        color: #333333;
      }
      .itemCategory {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>