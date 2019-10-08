<template>
  <div class="Banner" @click="test">
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      console.log("testbannerCom-----");
    }
  }



  
};
</script>

<style lang="less" scoped>
.test {
//   width: 100px;
//   height: 100px;
//   background-color: red;
}
</style>