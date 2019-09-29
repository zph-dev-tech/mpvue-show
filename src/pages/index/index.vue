<template>
  <div class="home">
    <!-- 搜索组件 -->
    <SearchBar 
    disabled 
    @click="onSearchBarClick"
    :hotSearch='this.hotSearch'
    ></SearchBar>
    <!-- 读书card组件 -->
    <HomeCard
    :data='HomeCard'
    ></HomeCard>
    <!-- 图片组件 -->
    <!-- <ImageView
    
    mode="scaleToFill"
    height="160px"
    ></ImageView>-->
    <!-- banner组建 -->
    <Banner
    :title="title"
    :img="img"
    :subTitle="subTitle"
    ></Banner>
<!--  推荐图书 -->
<recomend></recomend>



  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar.vue'
import ImageView from '../../components/base/ImageView.vue'
import HomeCard from '../../components/base/HomeCard.vue'
import Banner from '../../components/base/Banner.vue'
import recomend from '../../components/recomend.vue'
// import {getData} from '../../api/index.js'
import {getData} from '../../api/index.js'
export default {
  computed: {
    title(){
      return this.banner&&this.banner.title
    },
    img(){
      return this.banner&&this.banner.img
    },
    subTitle(){
      return this.banner&&this.banner.subTitle
    }
  },
  mounted() {
    this.getdata()
  },
  data () {
    return {
      hotSearch:{},
     
      recomend:[],
      freeRead:[],
      hotBook:[],
      category:[],
      banner:{},
      shelfCount:0,
      HomeCard:{}
    }
  },

  components: {
  SearchBar,
  ImageView,
  HomeCard,
  Banner,
  recomend
  },

  methods: {
   onSearchBarClick(){

   },
   getdata(){
    //  this.$http.get('https://test.youbaobao.xyz:18081/book/home/v2?openId=1234')
    //  .then(res=>{
    //    console.log(res);
    //      }) 
  //  get('https://test.youbaobao.xyz:18081/book/home/v2?openId=1234')
  //  .then(res=>{
  //    console.log(res);
     
  //  })
  getData({openId:'1234'})
    .then(res=>{
     
      const {
        data:{
          banner,
          category,
          freeRead,
          hotBook,
          hotSearch,
          recomend,
          shelf,
          shelfCount
      }}=res.data
     console.log(shelf);
     this.banner=banner;
     this.category=category;
     this.freeRead=freeRead
     this.hotBook=hotBook
     this.hotSearch=hotSearch
     this.recomend=recomend
     this.shelf=shelf
     this.shelfCount=shelfCount
     this.HomeCard={
         bookList:shelf,
         num:shelfCount ,
         
     }
      console.log(this.HomeCard.bookList);
      
      
    })
    
    
      
   }
  },

  created () {
    // let app = getApp()
  }
}
</script>
<style lang="less" scoped>
</style>

