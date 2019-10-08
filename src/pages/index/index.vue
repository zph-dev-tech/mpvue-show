<template>
  <div class="home">
    <!-- 搜索组件 -->
    <SearchBar 
    disabled 
    @onSearchBarClick="onSearchBarClick"
    :hotSearch='this.hotSearch'
    ></SearchBar>
    <!-- 读书card组件 -->
    <HomeCard
    :data='HomeCard'
    @onBookClick="onBookClick"
    @onShelfClick="onShelfClick"
    ></HomeCard>
    <!-- 图片组件 -->
    <!-- <ImageView
    
    mode="scaleToFill"
    height="160px"
    ></ImageView>-->
    <!-- banner组建 -->
    <Banner
    @onBannerClick="onBannerClick"
    ></Banner>
<!--  推荐图书 -->
<recomend
:data="testData"
:row="1"
:col="3"
@onMoreClick="getMoreBook('recommend')"
@onBookClick='getBook'
></recomend>


<recomend
:data="freeBookData"
:row="2"
:col="2"
:mode="'col'"
:title="'免费阅读'"
@onMoreClick="getMoreBook('free')"
@onBookClick='getBook'
></recomend>

<recomend
:data="hotBookData"
:row="1"
:col="4"
:mode="'hot'"
:title="'当前最热'"
@onMoreClick="getMoreBook('hot')"
@onBookClick='getBook'
></recomend>

<recomend
:data="categoryData"
:row="3"
:col="2"
:mode="'category'"
:title="'分类'"
@onMoreClick="getMoreBook('category')"
@onBookClick='getCategory'
:btntext="'查看全部分类'"
></recomend>

<!--  登陆授权面板 -->
<auth
@getUserInfo="init"
v-if="!isAuth"></auth>
<!-- 首页骨架图 -->
<indexSkeleton 
v-if="isShowSkeleton"
></indexSkeleton>

<!-- <button open-type="contact">进入客服会话</button>
<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button> -->


  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar'
import ImageView from '../../components/base/ImageView.vue'
import HomeCard from '../../components/base/HomeCard.vue'
import Banner from '../../components/base/Banner.vue'
import recomend from '../../components/recomend.vue'
import auth from '../../components/base/auth.vue'
import indexSkeleton from '../../components/skeleton/indexSkeleton.vue'
// import {getData} from '../../api/index.js'
import {getHomeData, getRecommend,getFreeRead,getHotBook,getAllCategory} from '../../api/index.js'
import {
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  getUserOpenId,
  register,
  showLoading,
  hideLoading
  } from '../../api/wechat.js'
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
    },
    // HomeCard(){
    //   return {
    //     userInfo:this.userInfo,
    //     nickName:this.userInfo.nickName
    //   }
    // }
    isShowSkeleton(){
      if(isShowSkeleton)
      {
return this.isShowSkeleton
      }
      
    }
  },
  mounted() {
    this.init()
    
    // this.getUserSetting()
    // 获取首页数据
     //this.getdata()
  },
  data () {
    return {
      isAuth:true,
      hotSearch:{},
     isShowSkeleton:false,
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
      freeBookData: [
            {
                "id":89,
                "fileName":"2018_Book_ContemporaryPerspectivesOnAgei",
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33187120.jpg",
                "title":"为我有生活",
                "author":"杨占家",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_ContemporaryPerspectivesOnAgei",
                "category":2,
                "categoryText":"艺术 / 电影",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":218,
                "fileName":"2015_Book_PovertyReductionPoliciesAndPra",
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33441355.jpg",
                "title":"书店日记",
                "author":"肖恩·白塞尔",
                "publisher":"Springer Singapore, Singapore",
                "bookId":"2015_Book_PovertyReductionPoliciesAndPra",
                "category":3,
                "categoryText":"随笔",
                "language":"en",
                "rootFile":"OEBPS/content.opf"
            },
            {
                "id":6,
                "fileName":"2018_Book_DronesAndTheCreativeIndustry",
                "cover":"https://img3.doubanio.com/view/subject/m/public/s32346181.jpg",
                "title":"加西亚·马尔克斯访谈录",
                "author":"吉恩·贝尔 ",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_DronesAndTheCreativeIndustry",
                "category":13,
                "categoryText":"访谈录 ",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            },
            {
                "id":139,
                "fileName":"2018_Book_EvolutionMonitoringAndPredicti",
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33450463.jpg",
                "title":"佛兰德镜子",
                "author":"dome",
                "publisher":"Springer Singapore, Singapore",
                "bookId":"2018_Book_EvolutionMonitoringAndPredicti",
                "category":14,
                "categoryText":"小说 ",
                "language":"en",
                "rootFile":"OEBPS/content.opf"
            }
        ],
        hotBookData:[
            {
                "id":34,
                "fileName":"2018_Book_GeographiesOfTheUniversity",
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33451896.jpg",
                "title":"伦敦人",
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
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33475751.jpg",
                "title":" 鸟瞰古文明",
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
                "cover":"https://img3.doubanio.com/view/subject/m/public/s33457860.jpg",
                "title":"剧本结构论",
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
                "cover":"https://img1.doubanio.com/view/subject/m/public/s33466058.jpg",
                "title":"离婚",
                "author":"Michelle Kenyon",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_TheEuropeanBloodAndMarrowTrans",
                "category":17,
                "categoryText":"MedicineAndPublicHealth",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
            }
        ],
      categoryData:[
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Biomedicine/978-3-319-25474-6_CoverFigure.jpg",
                "category":12,
                "title":"生物医学",
                "categoryText":"Biomedicine",
                "num":14,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Biomedicine/978-3-319-72790-5_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/BusinessandManagement/978-3-319-33515-5_CoverFigure.jpg",
                "category":13,
                "title":"工商管理",
                "categoryText":"BusinessandManagement",
                "num":16,
                "cover2":"https://www.youbaobao.xyz/book/res/img/BusinessandManagement/978-3-319-95261-1_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/ComputerScience/978-3-319-90415-3_CoverFigure.jpg",
                "category":1,
                "title":"计算机科学",
                "categoryText":"ComputerScience",
                "num":56,
                "cover2":"https://www.youbaobao.xyz/book/res/img/ComputerScience/978-3-319-96142-2_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/EarthSciences/978-981-10-3713-9_CoverFigure.jpg",
                "category":14,
                "title":"地球科学",
                "categoryText":"EarthSciences",
                "num":16,
                "cover2":"https://www.youbaobao.xyz/book/res/img/EarthSciences/978-3-319-65633-5_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Economics/978-3-319-69772-7_CoverFigure.jpg",
                "category":3,
                "title":"经济学",
                 "categoryText":"Economics",
                "num":30,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Economics/978-3-319-91400-8_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Education/978-3-319-39450-3_CoverFigure.jpg",
                "category":4,
                "title":"教育学",
                "categoryText":"Education",
                "num":60,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Education/978-3-319-52980-6_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Engineering/978-3-319-91707-8_CoverFigure.jpg",
                "category":5,
                "categoryText":"Engineering",
                "num":23,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Engineering/978-3-319-64816-3_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Environment/978-3-319-29671-5_CoverFigure.jpg",
                "category":6,
                "categoryText":"Environment",
                "num":42,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Environment/978-4-431-54895-9_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Geography/978-3-319-75593-9_CoverFigure.jpg",
                "category":7,
                "categoryText":"Geography",
                "num":7,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Geography/978-3-319-92813-5_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/History/978-3-319-64337-3_CoverFigure.jpg",
                "category":8,
                "categoryText":"History",
                "num":18,
                "cover2":"https://www.youbaobao.xyz/book/res/img/History/978-3-319-92964-4_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Laws/978-3-319-71087-7_CoverFigure.jpg",
                "category":9,
                "categoryText":"Laws",
                "num":13,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Laws/978-981-13-1232-8_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/LifeSciences/978-3-319-68152-8_CoverFigure.jpg",
                "category":10,
                "categoryText":"LifeSciences",
                "num":24,
                "cover2":"https://www.youbaobao.xyz/book/res/img/LifeSciences/978-3-319-69539-6_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Literature/2010_Book_CyborgsInLatinAmerica.jpeg",
                "category":11,
                "categoryText":"Literature",
                "num":6,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Literature/2010_Book_HistoryAndCulturalMemoryInNeo-.jpeg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/MaterialsScience/978-981-10-7617-6_CoverFigure.jpg",
                "category":15,
                "categoryText":"MaterialsScience",
                "num":2,
                "cover2":"https://www.youbaobao.xyz/book/res/img/MaterialsScience/2018_Book_ProceedingsOfTheScientific-Pra.jpeg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Mathematics/978-3-319-29439-1_CoverFigure.jpg",
                "category":16,
                "categoryText":"Mathematics",
                "num":9,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Mathematics/2015_Book_InnovationsInQuantitativeRiskM.jpeg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/MedicineAndPublicHealth/978-3-319-28624-2_CoverFigure.jpg",
                "category":17,
                "categoryText":"MedicineAndPublicHealth",
                "num":20,
                "cover2":"https://www.youbaobao.xyz/book/res/img/MedicineAndPublicHealth/978-3-319-75019-4_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Philosophy/978-3-319-26300-7_CoverFigure.jpg",
                "category":18,
                "categoryText":"Philosophy",
                "num":16,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Philosophy/978-3-319-94610-8_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Physics/978-3-319-42424-8_CoverFigure.jpg",
                "category":19,
                "categoryText":"Physics",
                "num":10,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Physics/978-3-662-57366-2_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/PoliticalScienceAndInternationalRelations/978-3-319-69929-5_CoverFigure.jpg",
                "category":20,
                "categoryText":"PoliticalScienceAndInternationalRelations",
                "num":26,
                "cover2":"https://www.youbaobao.xyz/book/res/img/PoliticalScienceAndInternationalRelations/978-981-10-7182-9_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Psychology/978-3-319-78160-0_CoverFigure.jpg",
                "category":21,
                "categoryText":"Psychology",
                "num":3,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Psychology/2015_Book_PromotingSocialDialogueInEurop.jpeg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/SocialSciences/978-3-319-72356-3_CoverFigure.jpg",
                "category":2,
                "categoryText":"SocialSciences",
                "num":51,
                "cover2":"https://www.youbaobao.xyz/book/res/img/SocialSciences/978-3-319-77991-1_CoverFigure.jpg"
            },
            {
                "cover":"https://www.youbaobao.xyz/book/res/img/Statistics/2013_Book_ShipAndOffshoreStructureDesign.jpeg",
                "category":22,
                "categoryText":"Statistics",
                "num":1,
                "cover2":"https://www.youbaobao.xyz/book/res/img/Statistics/2013_Book_ShipAndOffshoreStructureDesign.jpeg"
            }
        ] 
    }
  },

  components: {
  SearchBar,
  ImageView,
  HomeCard,
  Banner,
  recomend,
  auth,
  indexSkeleton
  },

  methods: {
  //  初始化步骤
  init(){
    //  第一步调用getsetting
    this.getSetting()
  },
    //  获取用户信息设置
    getSetting(){
        getSetting('userInfo',
                  (res)=>{console.log('成功')
                  // 隐藏面板
                          this.isAuth=true;
                          // 获取用户信息
                          this.getUserInfo()
                        
                         },
                  (res)=>{console.log('失败');
                  // 弹出授权面板
                          this.isAuth=false;
                  })
    },
    //  获取用户信息
    getUserInfo(e){
      var vue=this;
      // 显示loading
      showLoading()
      // 设置处理openid的参数
      const getHomeDataByOpenId=(openid,userInfo)=>{
        // 将userInfo传入获取首页数据方法直接存储利用
        this.getHomeData(openid,userInfo) 
        console.log('vue中的data',this );
            
        // register放在这既能获取openid又能获取userInfo
        register(openid,userInfo)
      }
      getUserInfo(
        (userInfo)=>{
          // console.log(userInfo);
        setStorageSync("userInfo",userInfo)
          // 获取openid
           const openId = getStorageSync('openId')
            // console.log('openId', openId)
            if (!openId || openId.length === 0) {
              // 通过服务端获取用户openId
              getUserOpenId(getHomeDataByOpenId)
              // 刷新
              //this.init()
              
            } else {
              // onOpenIdComplete(vue, openId, userInfo)
              console.log('以获得openid');
                // 获取首页数据
              //this.getHomeData(openId)
              getHomeDataByOpenId(openId,userInfo)
            // getHomeData(openId)
              
            }
            // 骨架图消失
            this.isShowSkeleton=false;
     console.log('endtagtagtag',this.isShowSkeleton);   
            // 隐藏loading
            hideLoading()
            
        }
      )
      // 隐藏授权面板
      this.isAuth=true;
      
    },
    
   
   onSearchBarClick(){
     //console.log('index-S-B-c');
     this.$router.push({
       path:'/pages/search/main',
     })
   },
  //  获取首页数据
  getHomeData(openId,userInfo){
    getHomeData(openId)
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
         num:shelfCount, 
         userInfo:userInfo  
     }
      console.log('homecard的数据----',this.HomeCard.userInfo);
        
    })   
   },
  //  获取更多图书
  getMoreBook(key){
    switch (key) {
      case 'recommend':
        getRecommend()
        .then(res=>{
          this.testData=res.data.data;
        })
        break;
         case 'free':
        getFreeRead()
        .then(res=>{
          this.freeBookData=res.data.data;
        })
        break;
         case 'hot':
        getHotBook()
        .then(res=>{
          this.hotBookData=res.data.data;
        })
        break;
         case 'category':
        // getAllCategory()
        // .then(res=>{
        //   this.categoryData=res.data.data;
        // })
        this.$router.push({
          path:'/pages/categoryList/main'
        })
        break;
    
      default:
        break;
    }
  },
  // 获取推荐图书详情
  getBook(book){
    const openId=getStorageSync('openId')
      this.$router.push({
      path:'/pages/bookDetail/main',
       query:{
         openId,
         fileName:book.fileName,
       }
    })
  },
  // 获取图书详情
  onBookClick(book){
    console.log('单项book的值--',book);
    
    const openId=getStorageSync('openId')
    
    this.$router.push({
      path:'/pages/bookDetail/main',
       query:{
         openId,
         fileName:book.fileName,
       }
    })
  },
  // 获取类型列表
  getCategory(book){
    this.$router.push({
      path:"/pages/categoryBookList/main",
      query:{
        category:book.categoryText
      }
    })
  },
  // 跳转书架
  onShelfClick(){
    this.$router.push({
      path:'/pages/shelf/main',
    })
  },
  // 跳转网页
  onBannerClick(){
    console.log('onBannerClick');
    
    this.$router.push({
      path:'/pages/webview/main'
    })
  },
  
  },
  onLoad(){
    this.isShowSkeleton=true;
    console.log('tagtagtag',this.isShowSkeleton);
    
  },
  onReady (){
   
  },

  created () {
    // let app = getApp()
    
  }
}
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 10px;
}
</style>

