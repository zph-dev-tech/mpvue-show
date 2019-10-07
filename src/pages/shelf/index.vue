<template>
    <div> 
<ShelfInfo
:readDay="joinDays"
:userInfo="userInfo"
:num="list.length"
></ShelfInfo>
<ShelfList
:shelfList="list"
></ShelfList>
    </div>
</template>

<script>
import ShelfInfo from '../../components/shelf/ShelfInfo';
import ShelfList from '../../components/shelf/ShelfList';
import { getShelfList,getJoinDays } from "../../api/index.js";
import { getStorageSync } from "../../api/wechat.js";
    export default {
        data() {
            return {
                list: [],
                joinDays:0,
                userInfo:{},
                num:0

            }
        },
        components: {
            ShelfInfo,
            ShelfList
        },
        mounted() {
            const openId=getStorageSync('openId')
             this.userInfo=getStorageSync('userInfo')
            console.log('-------s-s-s-s-s-s-s-ss-s-s-s',this.userInfo);
            
            getShelfList({openId}).then(res=>{
                console.log('shelfList---',res.data.data);
                this.list=res.data.data
                
                
            })
            getJoinDays({openId}).then(res=>{
                console.log('joinDays----',res)
                this.joinDays=res.data.data.day
                
            })
        },
    }
</script>

<style lang="less" scoped>

</style>