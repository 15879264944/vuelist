<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中使用 v-for 一定要使用key -->
            
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item> 
           
            <!-- <mt-swipe-item>一个可爱的happy</mt-swipe-item>
            <mt-swipe-item>一个傻傻的happy</mt-swipe-item>
            <mt-swipe-item>一个骚骚的happy</mt-swipe-item> -->
        </mt-swipe>

        <!-- 9宫格到 6宫格的改造工程· -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 

    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default{
    data(){
        return{
            lunbotuList:[
               //因为没有有效的api获取数据，只能自己手动导入一下数据，嘿嘿~~~
                {img:"https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg",url:"www"},
                {img:"https://img.meishanren.com/forum/201204/05/1023025u4414j5dg1j5r81.jpg",url:"aaa"}
            ]  //保存轮播图的数据
        }
    },

    // 因为没有有效数据 api ，所以先不调用
    // created(){
    //     this.getlunbotu();
    // },
    methods:{
        getlunbotu(){ //获取轮播图数据的方法
            this.$http.get("http://vue.studyit.io/api/getlunbo").then(result=>{
                // 
                if(result.body.status===0){
                    //成功了
                    this.lunbotuList=result.body.message;
                    Toast("加载轮播图成功。。。");
                }else{
                    //失败了
                    Toast("加载轮播图失败。。。");
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    text-align: center;
    .mint-swipe-item{
        
        img{
            width: 100%;
            height: 100%;
        }
    }
    
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
}
</style>