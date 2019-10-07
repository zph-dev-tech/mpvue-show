<template>
    <div>
<bookList
:data="bookLists"
 @onBookClick="onBookClick"
></bookList>
    </div>
</template>

<script>
import bookList from '../../components/seacrch/bookList.vue'
import {getBookList} from '../../api/index.js'
import {setNavigationBar} from '../../api/wechat.js'
    export default {
        methods: {
             // 点击图书详情
    onBookClick(book){
        console.log("book",book);
        this.$router.push({
          path:"/pages/bookDetail/main",
          query:{fileName:book.fileName}
        }) 
    }
        },
        components: {
            bookList,
        },
        data() {
            return {
                bookLists: []
            }
        },
       mounted() {
          getBookList({
              category:this.$route.query.category
          }).then(res=>{
              console.log('cbl返回数据',res);
              this.bookLists=res.data.data
          }) 
        //   设置标题
        setNavigationBar(this.$route.query.category)
       }, 
    }
</script>

<style lang="less" scoped>

</style>