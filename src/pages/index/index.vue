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
<recomend
:data="testData"
:row="1"
:col="3"
></recomend>


<recomend
:data="hotBookData"
:row="2"
:col="2"
:mode="'col'"
:title="'当前最热'"
></recomend>



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
      HomeCard:{},
      testData:[
            {
                "id":34,
                "fileName":"2018_Book_GeographiesOfTheUniversity",
                "cover":"https://www.youbaobao.xyz/book/res/img/Geography/978-3-319-75593-9_CoverFigure.jpg",
                "title":"宇宙的图形化演示",
                "author":"Peter Meusburger",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_GeographiesOfTheUniversity",
                "category":7,
                "categoryText":"Geography",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":59,
                "fileName":"2018_Book_DrinkingInVictorianAndEdwardia",
                "cover":"https://www.youbaobao.xyz/book/res/img/History/978-3-319-92964-4_CoverFigure.jpg",
                "title":"维多利亚和爱德华时代",
                "author":"Thora Hands",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_DrinkingInVictorianAndEdwardia",
                "category":8,
                "categoryText":"History",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":60,
                "fileName":"2018_Book_HarnessingThePowerOfTheCrimina",
                "cover":"https://www.youbaobao.xyz/book/res/img/History/978-3-319-77908-9_CoverFigure.jpg",
                "title":"犯罪心理学",
                "author":"Sarah Tarlow",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_HarnessingThePowerOfTheCrimina",
                "category":8,
                "categoryText":"History",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":75,
                "fileName":"2018_Book_TheEuropeanBloodAndMarrowTrans",
                "cover":"https://www.youbaobao.xyz/book/res/img/MedicineAndPublicHealth/978-3-319-50026-3_CoverFigure.jpg",
                "title":"The European Blood and Marrow Transplantation Textbook for Nurses",
                "author":"Michelle Kenyon",
                "publisher":"春季国际演讲",
                "bookId":"2018_Book_TheEuropeanBloodAndMarrowTrans",
                "category":17,
                "categoryText":"MedicineAndPublicHealth",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            }
        ],
      hotBookData: [
            {
                "id":89,
                "fileName":"2018_Book_ContemporaryPerspectivesOnAgei",
                "cover":"https://www.youbaobao.xyz/book/res/img/SocialSciences/978-3-319-73820-8_CoverFigure.jpg",
                "title":"Contemporary Perspectives on Ageism",
                "author":"Liat Ayalon",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_ContemporaryPerspectivesOnAgei",
                "category":2,
                "categoryText":"SocialSciences",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":218,
                "fileName":"2015_Book_PovertyReductionPoliciesAndPra",
                "cover":"https://www.youbaobao.xyz/book/res/img/Economics/2015_Book_PovertyReductionPoliciesAndPra.jpeg",
                "title":"Poverty Reduction Policies and Practices in Developing Asia",
                "author":"Almas Heshmati, Esfandiar Maasoumi and Guanghua Wan",
                "publisher":"Springer Singapore, Singapore",
                "bookId":"2015_Book_PovertyReductionPoliciesAndPra",
                "category":3,
                "categoryText":"Economics",
                "language":"en",
                "rootFile":"OEBPS/content.opf"
            },
            {
                "id":6,
                "fileName":"2018_Book_DronesAndTheCreativeIndustry",
                "cover":"https://www.youbaobao.xyz/book/res/img/BusinessandManagement/978-3-319-95261-1_CoverFigure.jpg",
                "title":"Drones and the Creative Industry",
                "author":"Virginia Santamarina-Campos",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_DronesAndTheCreativeIndustry",
                "category":13,
                "categoryText":"BusinessandManagement",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":139,
                "fileName":"2018_Book_EvolutionMonitoringAndPredicti",
                "cover":"https://www.youbaobao.xyz/book/res/img/EarthSciences/2018_Book_EvolutionMonitoringAndPredicti.jpeg",
                "title":"Evolution, Monitoring and Predicting Models of Rockburst",
                "author":"Chunlai Wang",
                "publisher":"Springer Singapore, Singapore",
                "bookId":"2018_Book_EvolutionMonitoringAndPredicti",
                "category":14,
                "categoryText":"EarthSciences",
                "language":"en",
                "rootFile":"OEBPS/content.opf"
            }
        ] 
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
     //console.log(shelf);
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
      //console.log(this.HomeCard.bookList);
      
      
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

