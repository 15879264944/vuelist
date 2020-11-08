<template>
    <div class="shopcar-container">
        <!-- 商品列表区 -->
        <div class="goodslist">
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="(item,i) in goodslist" :key="item.id">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                         @change="selectedChang(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img_url" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_prick}}</span>
                                <numbox :init="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                            <!-- 问题：如何从购物车中获取商品数据 -->
                            <!-- 
                                1.我们可以县创一个空对象，然后循环购物车中所有的商品数据，把当前循环这条商品的id
                                作为对象的属性名，count 值作为对象的属性值，这样，把所有商品循环一遍，会得到一个对象
                             -->
                        </div>
					</div>
				</div>
			</div>
        </div>
        <!-- 结算区 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type='danger'>去结算</mt-button>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
import numbox from '../subcomponents/numbox.vue'
import {Toast} from 'mint-ui'

var car = JSON.parse(localStorage.getItem('car') || '[]')
export default{
    
    mounted(){
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    data(){
        return{
            goodslist:[
                {id:1,title:'华为荣耀 8x  4g旗舰，拍照手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:1599,},
                {id:2,title:'华为mate 30 Pro 5G 性能怪兽',img_url:'http://image.it168.com/n/0x0/8/8545/8545641.jpg',sell_prick:4599,},
                {id:3,title:'MeiZu 游戏手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:2099,},
                {id:4,title:'红米note7 pp小可爱游戏用',img_url:'http://img.yinhang123.net/161017/dahjyyeqglc.jpg',sell_prick:999},
                {id:5,title:'vivo x27 pp小可爱拍照用',img_url:'http://img.178hui.com/upload/2015/0413/13461518064.jpg',sell_prick:1999},
                {id:6,title:'oppo r17  pp买菜用',img_url:'http://images.51bi.com/opt/siteimg/pb/20140518/8030cb9fb3dc2535c0ba56957216bfa2.jpeg',sell_prick:1099},
                {id:7,title:'1加6 pp学习用',img_url:'http://image.it168.com/n/280x210/6/6273/6273991.jpg',sell_prick:1499,},
                {id:8,title:'诺基亚 x100  pp炫耀用',img_url:'http://image.it168.com/n/640x480/2/2122/2122904.jpg',sell_prick:9999},
            ],  //购物车中所有商品的数据
            car:car,
            list:[]
            /*
            {id:1,title:'华为荣耀 8x  4g旗舰，拍照手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:1599,},
                {id:2,title:'华为mate 30 Pro 5G 性能怪兽',img_url:'http://image.it168.com/n/0x0/8/8545/8545641.jpg',sell_prick:4599,},
                {id:3,title:'MeiZu 游戏手机',img_url:'http://image.it168.com/n/640x480/8/8540/8540865.jpg',sell_prick:2099,},
                {id:4,title:'红米note7 pp小可爱游戏用',img_url:'http://img.yinhang123.net/161017/dahjyyeqglc.jpg',sell_prick:999},
                {id:5,title:'vivo x27 pp小可爱拍照用',img_url:'http://img.178hui.com/upload/2015/0413/13461518064.jpg',sell_prick:1999},
                {id:6,title:'oppo r17  pp买菜用',img_url:'http://images.51bi.com/opt/siteimg/pb/20140518/8030cb9fb3dc2535c0ba56957216bfa2.jpeg',sell_prick:1099},
                {id:7,title:'1加6 pp学习用',img_url:'http://image.it168.com/n/280x210/6/6273/6273991.jpg',sell_prick:1499,},
                {id:8,title:'诺基亚 x100  pp炫耀用',img_url:'http://image.it168.com/n/640x480/2/2122/2122904.jpg',sell_prick:9999},
             */
        }
    },
    created(){
        this.getGoodsList()
     },
    methods:{
        getGoodsList(){
            //1.获取 store 中所有的商品id， 然后拼接出一个 用逗号分隔的字符串
            //var idArr=[];
            this.$store.state.car.forEach(item =>{

                //idArr.push(item.id)

                item.ids=parseInt(item.id)
            });
            this.list=this.$store.state.car

            //2.如果购物车没有商品，则直接返回，不需要请求数据接口,否则会报错
            // if(idArr.length<=0){
            //     return;
            // }
            //获取购物车商品列表
            // this.$http.get('api/goods/getshopcarlist'+idArr.join(',')),then(result=>{
            //     if(result.body.status == 0){
            //         this.goodslist = result.body.message;
            //     }else{
            //         Toast('数据获取失败。。。。')
            //     }
            // })
            
            //console.log(this.list.ids);
        },
        remove(id,index){
            //点击删除，把商品从 store 中根据传递的 id 删除，同时 把当前组件中的 goodslist 中对应要删除得到那个商品，使用 index来删除
            //删除 goodslist 中的数据
            this.goodslist.splice(index,1);
            //删除 store 中的数据
            this.$store.commit('removeFromCar',id)
        },
        selectedChang(id,val){
            //console.log(id+'-----'+val);
            this.$store.commit('updataGoodsSelected',{id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goodslist{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-content: center;
        .red{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>