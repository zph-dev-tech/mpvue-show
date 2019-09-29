<template>
    <div class="img-tab" @click="onClick">
        
            <img 
            :class="round ? 'round image':'image'"
            :src="src"
            :mode="mode"
            :lazy-load="lazyLoad"
            :style="{height:height}"
            @load="onLoading"
            @error="onError"
            v-show="!isLoading||error"
             >
            <!-- 占位图片 -->
             <img 
             :class="round ? 'round image':'image'"
            src="../../../static/loading.gif"
            :mode="mode"
            :lazy-load="lazyLoad"
            :style="{height:height}"
            v-show="isLoading||error"
             >
        
    </div>
</template>

<script>
    export default {
        props:{
            src:{
              type:String,
              default:'https://www.youbaobao.xyz/mpvue-res/big.jpg'  
            },
            mode:{
                type:String,
                default:"widthFix"
            },
            lazyLoad:{
                type:Boolean,
                default:true
            },
            round:{
                type:Boolean,
                default:false
            },
            height:{
                type:String,
                default:"auto"
            }
        },
        watch: {
            src:function(newVal,oldVal){

            }
        },
        data(){
            return {
                isLoading:true,
                error:false
            }
        },
        methods: {
            onClick(){
                this.$emit('onClick')
            },
            onLoading(){
                //  false为加载成功loading状态解除
                //console.log('loading');
                
                this.isLoading=false;
                this.error=false
            },
            onError(){
                //console.log('err');
                
                this.isLoading=false;
                this.error=true
            }
        },
    }
</script>

<style lang="less" scoped>
.img-tab {
    width: 100%;
    height: 100%;
    .round {
       
        border-radius: 50%;
    }
    .image {
        width: 100%;
    }
}
</style>