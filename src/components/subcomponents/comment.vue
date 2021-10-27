<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="有什么想对happy说的么~" v-model="msg"></textarea>
        <mt-button type='primary' size='large' @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageIndex:1, //默认展示第一页数据123456
            comments:[
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:52',content:'好喜欢你和happy'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:53',content:'看你们好开心的样子'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:54',content:'happy好漂亮'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:55',content:'我也好喜欢happy'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:56',content:'happyhappy'},
            ],
            morecomment:[
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:52',content:'哇'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:53',content:'好秀啊！'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:54',content:'666'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:55',content:'我也好喜欢happy'},
                {user_name:'匿名用户',add_time:'2020.05.20  13:14:56',content:'happy'},
            ],
            msg:'' //评论输入的内容
        }
    },
    // created(){
    //     this.getComments()
    // },
    methods:{
        getComments(){//获取评论
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                 if(result.body.status === 0){
                    //this.comments = result.body.message
                    //每当获取新评论数据的时候，不要把老数据覆盖清空，而是应该以老数据拼接上新数据
                    this.comments=this.comments.concat(result.body.message)
                }else{
                    Toast('获取数据失败。。。')
                }
            })
        },
        getMore(){//加载更多
            this.pageIndex++;
            //this.getComments()return
            this.comments=this.morecomment.concat(this.comments)
        },
        postComment(){
            // 校验评论内容是否为空
            if(this.msg.trim().length===0){
               return Toast("评论内容不能为空！！！")
            }
            //发表评论
            //没有有效官网接口，只能用本地方法
            
            // this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()}).then(function(result){
            //     if(result.body.status === 0){
            //         //1.拼接出一个评论对象
            //         var cmt={user_name:'匿名用户',add_time:Data.now(),content:this.msg.trim()};
            //         this.comments.unshift(cmt);
            //         this.msg='';
            //     }else{
            //         Toast('评论发表失败！！')
            //     }
            // })
            var cmt={user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()};
            this.comments.unshift(cmt);
            this.msg='';
        }
    },
    props:['id']
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{font-size: 18px;}
    textarea{
        font-size: 16px;
        height: 85px;
        margin: 0;
        }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
             font-size: 13px;
             .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                 line-height: 35px;
                 text-indent: 2em;
            }
        }
       
    }
}

</style>