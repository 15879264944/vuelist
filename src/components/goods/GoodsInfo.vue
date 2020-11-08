<template>
    <div class="container">
        <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 轮播 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <!-- 在组件中使用 v-for 一定要使用key -->
                        
                        <mt-swipe-item v-for="item in lunbotu" :key="item.url">
                            <img :src="item.img" alt="">
                        </mt-swipe-item> 
                    </mt-swipe>
                </div>
            </div>
        </div>
        <!-- 中间 -->
        <div class="mui-card">
            <div class="mui-card-header">{{getinfolist[id-1].title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{getinfolist[id-1].market_prick}}</del>&nbsp;&nbsp;&nbsp;销售价:<span style="color:red;font-size:16px;font-weight: bold;">￥{{getinfolist[id-1].sell_prick}}</span>
                    </p>
                    <div class="number">
                        <p>购买数量 :</p>
                        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='getinfolist[id-1].stock_quantity'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				        </div>
                    </div>
                    <p>
                        <mt-button type="primary" size='small'>立即购买</mt-button>
                        <mt-button type="danger" size='small' @click="addToShoppcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{getinfolist[id-1].goods_on}}</p>
                    <p>库存情况：{{getinfolist[id-1].stock_quantity}}件</p>
                    <p>上架时间：{{getinfolist[id-1].add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size='large' plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size='large' plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    data(){
        return{
            id:this.$route.params.id,//获取路由地址中的id
            lunbotu:[
                {img:"http://image.it168.com/n/640x480/8/8540/8540865.jpg",url:"www"},
                {img:"http://image.it168.com/n/0x0/8/8545/8545641.jpg",url:"aaa"},
                {img:"http://img.yinhang123.net/161017/dahjyyeqglc.jpg",url:"ppp"}
            ],
            getinfolist:[
                {id:1,title:'华为荣耀 8x  4g旗舰，拍照手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:1599,market_prick:1899,stock_quantity:60,add_time:'2020.09.08  12:13:20',goods_on:'A562149872'},
                {id:2,title:'华为mate 30 Pro 5G 性能怪兽',img_url:'http://image.it168.com/n/0x0/8/8545/8545641.jpg',sell_prick:4599,market_prick:4999,stock_quantity:50,add_time:'2020.09.08  12:14:20',goods_on:'B562149872'},
                {id:3,title:'MeiZu 游戏手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:2099,market_prick:2399,stock_quantity:30,add_time:'2020.09.08  12:15:20',goods_on:'C562149872'},
                {id:4,title:'红米note7 pp小可爱游戏用',img_url:'http://img.yinhang123.net/161017/dahjyyeqglc.jpg',sell_prick:999,market_prick:1599,stock_quantity:1,add_time:'2020.09.08  12:16:20',goods_on:'D562149872'},
                {id:5,title:'vivo x27 pp小可爱拍照用',img_url:'http://img.178hui.com/upload/2015/0413/13461518064.jpg',sell_prick:1999,market_prick:2599,stock_quantity:1,add_time:'2020.09.08  12:17:20',goods_on:'E562149872'},
                {id:6,title:'oppo r17  pp买菜用',img_url:'http://images.51bi.com/opt/siteimg/pb/20140518/8030cb9fb3dc2535c0ba56957216bfa2.jpeg',sell_prick:'1099',market_prick:'2099',stock_quantity:30,add_time:'2020.09.08  12:18:20',goods_on:'F562149872'},
                {id:7,title:'1加6 pp学习用',img_url:'http://image.it168.com/n/280x210/6/6273/6273991.jpg',sell_prick:'1499',market_prick:'2399',stock_quantity:0,add_time:'2020.09.08  12:19:20',goods_on:'G562149872'},
                {id:8,title:'诺基亚 x100  pp炫耀用',img_url:'http://image.it168.com/n/640x480/2/2122/2122904.jpg',sell_prick:'9999',market_prick:'13999',stock_quantity:6,add_time:'2020.09.08  12:20:20',goods_on:'H562149872'}
            ],
            ballFlag:false, //控制小球的显示隐藏
            selectedCount:1,//默认购买数量为 1
        }
    },
    // created(){
    //     this.getLunbotu()
    //     this.getGoodsInfo()
    // },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.lunbotu=result.body.message
                }else{
                    Toast('数据获取失败。。。。')
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo' + this.id).then(result=>{
                if(result.body.status === 0){
                    this.getinfolist=result.body.message[0]
                }else{
                    Toast('数据获取失败。。。。')
                }
            })
        },
        goDesc(id){
            //点击使用编程式导航，跳转到 图文介绍 页面
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            //点击跳转到评论页面
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShoppcar(){
            //加入购物车
            this.ballFlag =! this.ballFlag
            //{id:商品id,count:购买的数量,price:商品的单价,selected:false}
            // 拼接一个数组，存放到 store 中的 car 数组中

            //var goodsinfo={id:this.id,count:this.selectedCount,price:this.getinfolist[this.id-1].sell_prick,title:this.getinfolist[this.id-1].title,img_url:this.getinfolist[this.id-1].img_url,selected:true};
            var goodsinfo={id:this.id,count:this.selectedCount,price:this.getinfolist[this.id-1].sell_prick,selected:true};
            //调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform='translate(0,0)';
        },
        enter(el,done){
            el.offsetWidth; //缺少这个就没有动画

            //小球动画优化思路：
            //1.先分析导致 动画 不准确的本质原因：我们把小球最终 位移到的位置，已经局限到了某一分辨率下，滚动条未滚动的情况下
            //2.只要分辨率和测试的时候不一样，或者，滚动条有一定的滚动距离之后，问题就出现了
            //3.因此，我们经过分析，得到结论，不能把位置的 横纵坐标 直接写死了，根据不同的情况，动态计算这个坐标值
            //4.经过分析，得出解题思路，先得到徽标的横纵坐标，再得到小球的横纵坐标，然后，让 y 值求差，x 值也求差，得到的结果，就是横纵坐标邀位移的距离
            //5.如何获取徽标和小球的位置。 domObject.getBoundingClientRect()

            //获取小球在页面中的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            //获取徽标位置
            const badgePosition=document.getElementById('badge').getBoundingClientRect();

            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top


            el.style.transform= `translate(${xDist}px,${yDist}px)`;
            el.style.transition='all 0.5s cubic-bezier(.4,-0.3,1,.68)';
            done()
        },
        afterEnter(el){
            this.ballFlag =! this.ballFlag
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount=count
        },
        countChange(){
            //每当购买数量文本框发生改变，立即把最新的数据传到 data 上
            //console.log(this.$refs.numbox.value);
            this.selectedCount=this.$refs.numbox.value;
        }
    }

    //分析：如何实现加入购物车的时候，拿到选择的数量
    //1.徽标属于父组件
    //2.由于涉及到父子组件的嵌套，所以，无法直接再 goodsinfo 页面中，获取数值
    //3.怎么解决这个问题，涉及到了子组件向父组件传值（事件调用机制）
    //4.事件调用的本质，父向子传递方法，子调用这个方法，同时把数据当参数，传递过去
}
</script>

<style lang="scss" scoped>
.container{
    background-color: #eee;
    overflow: hidden;
    .mint-swipe{
        height: 200px;
        text-align: center;
        
        .mint-swipe-item{
            
            img{
                height: 100%;
            }
        } 
    }
    .mui-card-content-inner{
        
        p{
            font-size: 14px;
            color: #000;
        }
        .number{
            p{line-height: 30px;}
            display: flex;
            margin: 5px;
        }
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
.ball{
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
}
}

</style>