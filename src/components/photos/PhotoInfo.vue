<template>
    <div class="container">
        <h3>{{photoinfos[id].title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfos[id].add_time | dateFormat}}</span>
            <span>点击：{{photoinfos[id].click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="preview">
            <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" width="100" @click="$preview.open(index,list)" :key="item.src"> -->
            <vue-preview :slides="list" class="imgPrev"  @close="handleClose"></vue-preview>
        </div>
        <!-- 图片内容 -->
        <div class="content">{{photoinfos[id].content}}</div>
        <!-- 评论区域 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
//导入评论组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            photoinfos:[
                {id:0,click:520,add_time:Date.now(),title:'有气质且带可爱的happy图',img_url:'http://www.wndhw.com/fengjing/zhaopian/images/zp013t1.jpg',content:'轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。'},
                {id:1,click:50,add_time:Date.now(),title:'傻憨憨的happy图',img_url:'https://i03piccdn.sogoucdn.com/482bd8ce4494b7c3',content:'秋天虽然不像冬天有洁白的衣服，可是它那桔黄色的衣服也不错呀！而且比冬天的那件白色衣服暖和多了。'},
                {id:2,click:20,add_time:Date.now(),title:'一giao我里giao happy图',img_url:'http://img1.juimg.com/171204/330842-1G20412503048.jpg',content:'路旁边浪似地滚着高高低低的黄土。太阳给埋在黄土里，发着肉红色。可是太阳还烧得怪起劲的，把他们的皮肉烧得变成紫黑色，似乎还闻得到一股焦味儿。'},
                {id:3,click:120,add_time:Date.now(),title:'坏坏的happy图',img_url:'https://i01piccdn.sogoucdn.com/81ba0bf0db061d3e',content:'夏夜特有的像梦幻一样的安溢使得一切生物似乎都愿俄人睡了，虽有金铃子一类的草虫的丝丝的叫声，但声音那样的细弱遥远，也象是在说梦话呢！'},
                {id:4,click:440,add_time:Date.now(),title:'我们是不是在哪见过',img_url:'http://www.wndhw.com/fengjing/zhaopian/images/zp013t6.jpg',content:'秋天不像春天那样百花争艳，芳香怡人；也不像夏天那样有那么多的小生灵在歌唱；也没有冬天那么美丽。可是，它在我心中却是最美的。'},
                {id:5,click:230,add_time:Date.now(),title:'那是一个黄昏',img_url:'http://img.c-c.com/Timg/2015/07/07/16/wxbapx1614220342.jpg',content:'太阳在朝霞的迎接中，露出了红彤彤的面庞，霎时，万道金光透过树梢给水面染上了一层胭脂红。'},
                {id:6,click:23,add_time:Date.now(),title:'看着你那黝黑的皮肤',img_url:'http://img5.cache.netease.com/photo/0001/2014-07-21/A1M0E3QL4T8F0001.jpg',content:'在等流星的过程中，我也看到了天上有许多的小星星在向我眨着眼睛，密密麻麻的又亮，又美。在我观赏着这美丽的星空时，不经意间，我看到了传说中的‘北斗七星’果然，由七颗闪人的亮星有序地排成了一个勺子，逼真极了。'},
            ],
            list:[
                {src:'http://img1.juimg.com/171204/330842-1G20412503048.jpg'},
                {src:'http://img.c-c.com/Timg/2015/07/07/16/wxbapx1614220342.jpg'},
                {src:'http://5b0988e595225.cdn.sohucs.com/images/20180415/4908684fad2b4e37b38683f0bec9d29b.jpeg'},
                {src:'http://pic.yupoo.com/56gee-sohu/C5zsFem0/fqJuh.jpg'},
                {src:'https://bbs-fd.zol-img.com.cn/t_s800x5000/g5/M00/0B/04/ChMkJ1nCBD-IG9P9AAVSwZB56dgAAgoHAFMuT4ABVLZ062.jpg'},
            ],
            thislist:[]
        }
    },
     created(){
    //     this.getPhotoInfo()
       this.getThumbs()
    },
    methods:{
        getPhotoInfo(){//获取图片详情
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }else{
                    Toast('数据获取失败。。。')
                }
            })

        },
        getThumbs(){ //获取缩略图
            // this.$http.get('api/getthumimages/'+this,id).then(result=>{
            //     if(result.body.status === 0){
            //         //循环每个图片数据，补全图片的宽和高
            //         result.body.message.forEach(item=>{
            //             item.w=600;
            //             item.h=400;
            //         })
            //         //把完整的数据保存到 list 中
            //         this.list=result.body.message
            //     }else{
            //         Toast('数据获取失败。。。')
            //     }
            // })

                    this.list.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                    })
                    //把完整的数据保存到 list 中
                    this.thislist=this.list
        },
        handleClose () {  //加上这个方法
                console.log('close event')
            }
    },
    components:{//挂载评论组件
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
 .container{
     padding: 3px;
     h3{
         color: #26a2ff;
         font-size: 15px;
         text-align: center;
         margin: 15px 0;
     }
     .subtitle{
         display: flex;
         justify-content: space-between;
         font-size: 13px;
     }
     .content{
         font-size: 13px;
         line-height: 30px;
     }
     .preview{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      height: 100px;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        
     }
 }
</style>