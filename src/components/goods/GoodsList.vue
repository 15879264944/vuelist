<template>
    <div class="goods-list">
        <router-link :to="'/home/goodsinfo/'+item.id" class="item" v-for="item in goodslist" :key="item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_prick}}</span>
                    <span class="old">￥{{item.market_prick}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <!-- 底部按钮 -->
        
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageindex:1,//默认展示第一页
            goodslist:[
                {id:1,title:'华为荣耀 8x  4g旗舰，拍照手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:1599,market_prick:1899,stock_quantity:60},
                {id:2,title:'华为mate 30 Pro 5G 性能怪兽',img_url:'http://image.it168.com/n/0x0/8/8545/8545641.jpg',sell_prick:4599,market_prick:4999,stock_quantity:50},
                {id:3,title:'MeiZu 游戏手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:2099,market_prick:2399,stock_quantity:30},
                {id:4,title:'红米note7 pp小可爱游戏用',img_url:'http://img.yinhang123.net/161017/dahjyyeqglc.jpg',sell_prick:999,market_prick:1599,stock_quantity:1},
                {id:5,title:'vivo x27 pp小可爱拍照用',img_url:'http://img.178hui.com/upload/2015/0413/13461518064.jpg',sell_prick:1999,market_prick:2599,stock_quantity:1},
            ],
            newgoods:[
                {id:6,title:'oppo r17  pp买菜用',img_url:'http://images.51bi.com/opt/siteimg/pb/20140518/8030cb9fb3dc2535c0ba56957216bfa2.jpeg',sell_prick:1099,market_prick:2099,stock_quantity:30},
                {id:7,title:'1加6 pp学习用',img_url:'http://image.it168.com/n/280x210/6/6273/6273991.jpg',sell_prick:1499,market_prick:2399,stock_quantity:0},
                {id:8,title:'诺基亚 x100  pp炫耀用',img_url:'http://image.it168.com/n/640x480/2/2122/2122904.jpg',sell_prick:9999,market_prick:13999,stock_quantity:6},
            ]
        }
    },
    // created(){
    //     this.getDoodsList()
    // },
    methods:{
        getDoodsList(){//获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status === 0){
                    this.goodslist=this.goodslist.concat(result.body.message)
                }else{
                    Toast('数据获取失败。。。')
                }
            })
        },
        getMore(){
            //this.pageindex++;
            //this.getDoodsList()


            this.goodslist=this.goodslist.concat(this.newgoods)
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
   
    .item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{margin: 0;padding: 5px;}
            .price{
                .now{
                    color: red;
                    font-size: 18px;
                    font-weight: bold;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 5px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>