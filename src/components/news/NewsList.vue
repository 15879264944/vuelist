<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{ item.add_time | dateFormat}}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            
        </ul>
    </div>
</template>

<script>

import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            newslist:[
                {id:1,title:'和happy的第一天',add_time:'2020.05.20  13:14:52',click:2,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:2,title:'和happy的第二天',add_time:'2020.05.20  13:14:52',click:3,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:3,title:'和happy的第三天',add_time:'2020.05.20  13:14:52',click:4,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:4,title:'和happy的第四天',add_time:'2020.05.20  13:14:52',click:5,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:5,title:'和happy的第五天',add_time:'2020.05.20  13:14:52',click:55,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:6,title:'和happy的第六天',add_time:'2020.05.20  13:14:52',click:520,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:7,title:'和happy的第七天',add_time:'2020.05.20  13:14:52',click:600,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:8,title:'和happy的第八天',add_time:'2020.05.20  13:14:52',click:250,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:9,title:'和happy的第九天',add_time:'2020.05.20  13:14:52',click:150,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},
                {id:10,title:'和happy的第十天',add_time:'2020.05.20  13:14:52',click:1314,img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg'},

            ]  //定义一个空数组，存放获取到的新闻咨询
        }
    },
    // created(){
    //     this.getNewsList()
    // },
    methods:{
        getNewsList(){ //获取新闻列表
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status === 0){
                    this.newslist = result.body.message
                }else{
                    Toast('获取数据失败。。。')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{font-size: 14px;}
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
            }
    }
}
</style>