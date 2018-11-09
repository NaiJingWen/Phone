import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"

//1.引入自定义组件
import TestContainer from "./components/testContainer.vue"
import ListContainer from "./components/listContainer.vue"
import homeContainer from "./components/tabbar/HomeContainer.vue"
import newsListContainer from "./components/news/newsListContainer.vue"
import newInfoContainer from "./components/news/newInfoContainer.vue"
import ShopCountainer from "./components/tabbar/ShopCountainer.vue"
import goodsList from "./components/goods/GoodList.vue"
import goodsinfo from "./components/goods/GoodInfo.vue"
import photoContainer from "./components/photo/PhotoContainer.vue"
import loginContainer from "./components/home/LoginContainer.vue"
Vue.use(Router) 

//2.配置访问自定义组件路径
//  {path:组件访问路径 component:组件访问名称}
export default new Router({
  routes: [
    {path:'/',redirect:"/home"},//加载斜杠/时快速跳转到home页面
    {path:'/test',component:TestContainer},
    {path:'/list',component:ListContainer},
    {path:'/home',component:homeContainer},
    {path:"/home/newslist",component:newsListContainer},
    {path:"/home/newsinfo",component:newInfoContainer},
    //{path:"/home/shop",component:ShopCountainer},//方法一
    {path:"/shop",component:ShopCountainer},//方法二
    {path:"/home/goodslist",component:goodsList},
    {path:"/home/goodsinfo/:id",component:goodsinfo},
    {path:"/home/photo",component:photoContainer},
    {path:"/home/login",component:loginContainer}
  ]                                                                         
})
