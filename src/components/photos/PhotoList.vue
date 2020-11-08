<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 给图片标题列表绑定一个点击事件：@click="getPhotoListByCateId(item.id)" 获取图片标题下个数据 -->
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h3 class="info-title">{{ item.title }}</h3>
                    <div class="info-bodys">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
//1.导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            cates:[
                {title:'全部',id:0},
                {title:'唯美',id:1},
                {title:'潮流',id:2},
                {title:'欧美',id:3},
                {title:'伤感',id:4},
                {title:'happy',id:5},
                {title:'袁乐',id:6}
            ], //所以分类的列表数组
            list:[
                {id:0,title:'有气质且带可爱的happy图',img_url:'http://www.wndhw.com/fengjing/zhaopian/images/zp013t1.jpg',zhaiyao:'轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。'},
                {id:1,title:'傻憨憨的happy图',img_url:'https://i03piccdn.sogoucdn.com/482bd8ce4494b7c3',zhaiyao:'秋天虽然不像冬天有洁白的衣服，可是它那桔黄色的衣服也不错呀！而且比冬天的那件白色衣服暖和多了。'},
                {id:2,title:'一giao我里giao happy图',img_url:'http://www.wndhw.com/fengjing/zhaopian/images/zp013t1.jpg',zhaiyao:'路旁边浪似地滚着高高低低的黄土。太阳给埋在黄土里，发着肉红色。可是太阳还烧得怪起劲的，把他们的皮肉烧得变成紫黑色，似乎还闻得到一股焦味儿。'},
                {id:3,title:'坏坏的happy图',img_url:'https://i01piccdn.sogoucdn.com/81ba0bf0db061d3e',zhaiyao:'夏夜特有的像梦幻一样的安溢使得一切生物似乎都愿俄人睡了，虽有金铃子一类的草虫的丝丝的叫声，但声音那样的细弱遥远，也象是在说梦话呢！'},
                {id:4,title:'我们是不是在哪见过',img_url:'http://www.wndhw.com/fengjing/zhaopian/images/zp013t6.jpg',zhaiyao:'秋天不像春天那样百花争艳，芳香怡人；也不像夏天那样有那么多的小生灵在歌唱；也没有冬天那么美丽。可是，它在我心中却是最美的。'},
                {id:5,title:'那是一个黄昏',img_url:'https://i01piccdn.sogoucdn.com/81ba0bf0db061d3e',zhaiyao:'太阳在朝霞的迎接中，露出了红彤彤的面庞，霎时，万道金光透过树梢给水面染上了一层胭脂红。'},
                {id:6,title:'看着你那黝黑的皮肤',img_url:'http://img5.cache.netease.com/photo/0001/2014-07-21/A1M0E3QL4T8F0001.jpg',zhaiyao:'在等流星的过程中，我也看到了天上有许多的小星星在向我眨着眼睛，密密麻麻的又亮，又美。在我观赏着这美丽的星空时，不经意间，我看到了传说中的‘北斗七星’果然，由七颗闪人的亮星有序地排成了一个勺子，逼真极了。'},
            ],//获取分类图片
            lists:[]
        }
    },
    //created(){
    //      this.getAllCategroy()
    //      this.getPhotoListByCateId(0) //默认进入页面，就主动请求所有图片数据
    //},
    mounted(){//当组件中的 DOM 结构渲染好并放到页面中的时候，会执行这个钩子函数
        //2. 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005 //filck 减速系数，系数过大，滚动速度越慢，滚动距离越小，默认值：0.0006
        })
    },
    methods:{
        getAllCategroy(){
            //获取所以的图片分类标题
            this.$http.get('api/getimgcategroy').then(result=>{
                if(result.body.status === 0){
                    //手动拼接出一个完整的标题
                    result.body.message.unshift({ title:'全部',id:0 })
                    this.cates=result.body.message;
                }else{
                    Toast('获取数据失败。。。')
                }
            })
        },
        getPhotoListByCateId(cateId){
            //根据图片 Id 获取 图片
            // this.$http.get('api/getimages/'+ cateId).then(result=>{
            //     if(result.body.status === 0){
            //         this.list=result.body.message;
            //     }else{
            //         Toast('获取数据失败。。。')
            //     }
            // })


            //假数据试用
            // console.log(cateId)
            // if(Object.keys(this.lists).length === 0) return this.list
            // this.lists=this.list[cateId-1]
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}

.photo-list{
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        list-style: none;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;//垂直对齐中间
            height: 360px;
            border: 1px;
            border-radius: 5px;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 80px;
            .info-title{
                font-size: 14px;
            }
            .info-bodys{
                font-size: 13px;
            }
        }
    }
}
</style>