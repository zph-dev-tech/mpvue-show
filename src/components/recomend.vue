<template>
    <div class="recomend">
        <div class="title">
            为你推荐
        </div>
        <div class="bookWrap">
            <div class="book"></div>
            <div class="bookName"></div>
        </div>

        <div class="action"></div>
    </div>
</template>

<script>
    export default {
        props:{
            title:'',
            data:[],
            btntext:'',
            row:0,
            col:1,
            mode:'row',
            showTitle:true,
            showBtn:true,
            linearBg:false,
        },
        methods: {
            onMoreClick(){

            },
            onBookClick(){

            }
        },
    }
</script>

<style lang="less" scoped>

</style>