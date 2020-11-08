//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3 导入自己的router.js路由模块
import router from './router.js'

//导入 vue-resource
import VueResource from 'vue-resource'
//安装 vue-resource
Vue.use(VueResource)

//导入 Vuex
import Vuex from 'vuex'
//安装 Vuex
Vue.use(Vuex)

//每次刚进入网站，很定会调用 main.js，在刚调用的时候，把购物车的数据读出来。放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
  state:{ //存放数据
    car:car  //将购物车中商品是数据用一个数组存放起来
  },
  mutations:{ //存放方法
    addToCar(state,goodsinfo){
      // 点击加入购物车，将信息保存到 state 中的 car 上
      // 分析：
      //1.如果购物车中，之前就已经有这个对应商品了，那么，只需要更新数量
      //2.如果没有，则直接把商品数据 push 到 car 中即可

      //假设购物车中没有找到相应的数据
      var flag=false;

      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag=true;
          return true
        }
      })
      //如果购物车中没有商品数据，就添加商品数据
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品数量的值
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    removeFromCar(state,id){
      //根据 id ，从 store中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if(item.id == id){
          state.car.splice(i,1);
          return true
        }
      })
      //当删除完商品的最新数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updataGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id = info.id){
          item.selected=info.selected;
          return true
        }
      })
      //把最新的所有商品的状态保存到 state 中去
      localStorage.setItem('car',JSON.stringify(state.car));
    }
  },
  getters:{ //打包数据
    //相当于计算属性，也相当于 Filters
    getAllCount(state){
      var c = 0;
      state.car.forEach(item=>{
        c += parseInt(item.count)
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item=>{
        o[item.id]=item.count
      })
      return o
    },
    getGoodsSelected(state){
      var p ={};
      state.car.forEach(item=>{
        p[item.id] = item.selected
      })
      return p
    },
    getGoodsCountAndAmount(state){
      var p ={count:0,amount:0};
      state.car.forEach(item=>{
        if(item.selected){
          p.count += parseInt(item.count)
          p.amount += item.price * item.count
        }
      })
      return p
    }
  }
})

//设置请求的根路径，全局配置一下根路径
Vue.http.options.root='http://vue.studyit.io'
//全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON=true

// 导入node中的 时间 插件
import moment from 'moment'
//定义全局过滤器，把时间格式处理一下
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})


//导入App组件
import app from './App.vue'

//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
//导入 MUI 字体拓展类
import './lib/mui/css/icons-extra.css'


//按需导入 mint-ui 中的组件
// import {Header,Swipe, SwipeItem,Button} from 'mint-ui'
// //注册Header
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'


// 安装缩略图插件   cnpm i vue-preview -S
import VuePreview from "vue-preview"
Vue.use(VuePreview)

var vm = new Vue({
  el:'#app',
  data:{},
  render:c => c(app),
  router,  //1.4挂载路由对象
  store  // 将 vuex 挂载到 vm 上
})