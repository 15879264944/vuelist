<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo[id-1].title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo[id-1].add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo[id-1].click }}次</span>
        </p>
        <hr>
        <!-- 内容区 -->
        <div class="content">
            <p>{{ newsinfo[id-1].container }}</p>
        </div>
        <!-- 评论区 -->
        <comment-box :id='this.id'></comment-box>
        <!-- 父组件向子组件传值 -->
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
//导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            // $route.params.id  拿到 url 中的参数 id
            newsinfo:[
                {id:1,title:'和happy的第一天',add_time:'2020.05.20  13:14:52',click:2,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'既然无法追回逝去的岁月，为何不将从前隐忍放弃？既然感觉未来时光缥缈，为何今天不能倍加珍惜？既然懂得梦想就是明天的希翼，为何现在还不奋发努力？既然人生不能万事遂愿，为何不敢拆除心灵的藩篱？既然生命总有风雨侵袭，为何不趁早筑牢防范的岸堤？……珍视当下，走出低迷，相信自己，创造奇迹。'},
                {id:2,title:'和happy的第二天',add_time:'2020.05.20  13:14:52',click:3,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:3,title:'和happy的第三天',add_time:'2020.05.20  13:14:52',click:4,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:4,title:'和happy的第四天',add_time:'2020.05.20  13:14:52',click:5,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:5,title:'和happy的第五天',add_time:'2020.05.20  13:14:52',click:55,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:6,title:'和happy的第六天',add_time:'2020.05.20  13:14:52',click:520,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:7,title:'和happy的第七天',add_time:'2020.05.20  13:14:52',click:600,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:8,title:'和happy的第八天',add_time:'2020.05.20  13:14:52',click:250,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:9,title:'和happy的第九天',add_time:'2020.05.20  13:14:52',click:150,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},
                {id:10,title:'和happy的第十天',add_time:'2020.05.20  13:14:52',click:1314,
                img_url:'https://img.meishanren.com/forum/201204/05/102355mk2qzku2rq992icm.jpg',
                container:'今天和happy出去玩了，玩的很开心，还吃了好多好吃的东西！'},

            ]
        }
    },
     // created(){
    //     this.getNewsInfo()
    // },
    methods:{
        getNewsInfo(){ //获取新闻详细页面数据
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.newsinfo = result.body.message
                }else{
                    Toast('获取数据失败。。。')
                }
            })
        }
    },
    components:{
        //用来注册子组件的
        'comment-box':comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{}
}
</style>