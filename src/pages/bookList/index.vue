<template>
  <div class="bookListCom">
    <div class="bookList" v-for="(item,index) in data" :key="index" @click="onBookClick(item)">
      <div class="bookWrapper">
        <div class="book">
          <ImageView :mode="scaleToFill" :height="'68.5px'" :src="item.cover"></ImageView>
        </div>
      </div>
      <div class="bookInfo">
        <div class="title">{{item.title}}</div>
        <div class="author">{{item.author}}</div>
        <div class="category">{{item.categoryText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from "../../components/base/ImageView";
import  {getBookList} from '../../api/index.js';
export default {
    data() {
        return {
            param: {},
            page:1,
            category:'',
            //bookList:[]
        }
    },
  components: {
    ImageView
  },
  props: {
    data: {
      type: Array,
      default: [
        {
          id: 89,
          fileName: "2018_Book_ContemporaryPerspectivesOnAgei",
          cover:
            "https://img3.doubanio.com/view/subject/m/public/s33187120.jpg",
          title: "为我有生活",
          author: "杨占家",
          publisher: "Springer International Publishing",
          bookId: "2018_Book_ContemporaryPerspectivesOnAgei",
          category: 2,
          categoryText: "艺术 / 电影",
          language: "en",
          rootFile: "OEBPS/package.opf"
        },
        {
          id: 218,
          fileName: "2015_Book_PovertyReductionPoliciesAndPra",
          cover:
            "https://img3.doubanio.com/view/subject/m/public/s33441355.jpg",
          title: "书店日记",
          author: "肖恩·白塞尔",
          publisher: "Springer Singapore, Singapore",
          bookId: "2015_Book_PovertyReductionPoliciesAndPra",
          category: 3,
          categoryText: "随笔",
          language: "en",
          rootFile: "OEBPS/content.opf"
        },
        {
          id: 6,
          fileName: "2018_Book_DronesAndTheCreativeIndustry",
          cover:
            "https://img3.doubanio.com/view/subject/m/public/s32346181.jpg",
          title: "加西亚·马尔克斯访谈录",
          author: "吉恩·贝尔 ",
          publisher: "Springer International Publishing",
          bookId: "2018_Book_DronesAndTheCreativeIndustry",
          category: 13,
          categoryText: "访谈录 ",
          language: "en",
          rootFile: "OEBPS/package.opf"
        },
        {
          id: 139,
          fileName: "2018_Book_EvolutionMonitoringAndPredicti",
          cover:
            "https://img3.doubanio.com/view/subject/m/public/s33450463.jpg",
          title: "佛兰德镜子",
          author: "dome",
          publisher: "Springer Singapore, Singapore",
          bookId: "2018_Book_EvolutionMonitoringAndPredicti",
          category: 14,
          categoryText: "小说 ",
          language: "en",
          rootFile: "OEBPS/content.opf"
        }
      ]
    }

  },
  methods: {
      onBookClick(item){
         this.$router.push({
             path:'/pages/bookDetail/main',
             query:{
                 fileName:item.fileName
             }
         })
      }
  },
  mounted() {
      this.category=this.$route.query.category
       const category=this.$route.query.category
       getBookList({category:category}).then(res=>{
           console.log('首页-cateList-BookList',res);
           this.data=res.data.data
           
       })

      
  },
     //   到达底部时加载新数据
  onReachBottom() {
      console.log('开始了吗');  
      this.page++;
      console.log('加加了吗');
      getBookList({
        category: this.category,
        openId: this.openId,
        page: this.page
      }).then(res => {
           console.log('执行了吗',res);
        const book=res.data.data.book;
        if(book.length>0){
            this.data.push(...book);
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
    console.log("bottom...",this.page,this.data);
  },
};
</script>

<style lang="less" scoped>
.bookListCom {
  .bookList {
      width: 100%;
    margin-top: 28.5px;
    display: flex;
    justify-content: flex-start;
    margin-left: 14.5px;
    margin-right: 14.5px;
    .bookWrapper {
      margin-right: 15.5px;
      .book {
        width: 47px;
        height: 68.5px;
        border: 1px solid #000;
      }
    }
    .bookInfo {
        width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      white-space: nowrap;
      text-overflow: ellipsis;
      .title {
        font-size: 16px;
        color: #333333;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 60%;
      }
      .author {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.65);
      }
      .category {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>