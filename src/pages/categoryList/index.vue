<template>
    <div>

<recomend
:data="list"
:mode="'category'"
:col="2"
:row="10"
title="全部分类"
:showBtn="false"
@onBookClick="showList"
></recomend>
    </div>
</template>

<script>
import recomend from '../../components/recomend.vue'
import {getAllCategory,getBookList} from '../../api/index.js'
    export default {
        methods: {
            showList(category){
                console.log('分类列表----',category);
                
                this.$router.push({
                    path:"/pages/bookList/main",
                    query:{
                        category:category.categoryText
                    }
                })
            }
        },
        data() {
            return {
                list:[]
            }
        },
       components: {
           recomend,
       },
       mounted() {
           getAllCategory().then(res=>{
               console.log('全部分类列表',res);
               this.list=res.data.data
               console.log('首页-catelist',this.list);
               
               
           })
       },
    
    }
</script>

<style lang="less" scoped>

</style>