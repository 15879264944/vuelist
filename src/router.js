import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/taabar/HomeContainer.vue'
import MemberContainer from './components/taabar/MemberContainer.vue'
import ShopcarContainer from './components/taabar/ShopcarContainer.vue'
import SearchContainer from './components/taabar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [ //匹配路由规则
    {path:'/',redirect:'/home'}, //路由重定向，让网页一加载就去指定的 home 组件
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsinfo/:id',component:NewsInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'}
  ],
  linkActiveClass:'mui-active'  //覆盖默认路由高亮的类，默认的类叫做：router-link-active
})
// 把路由对象暴露出去
export default router