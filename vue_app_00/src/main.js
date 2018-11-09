import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入mint-ui的css文件
import'mint-ui/lib/style.css'
Vue.config.productionTip = false

//引入mui的css文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入组件民退库Header
//按需引入
//1.引入指定的组件
// import {Button,Header,Swipe,SwipeItem,Lazyload} from "mint-ui";
// //2.注册当前项目中   (标签名称,...)   <mt-header>
// Vue.component(Button.name,Button);
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);//<mt-swipe>
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.use(Lazyload);

//完整引入
import MintUI from "mint-ui";
Vue.use(MintUI);


//2.引入vue-resource 发送ajax请求
//1.引入vue-resource  库所有组件
import VueResource from "vue-resource";
//2.经所有组件注册
Vue.use(VueResource);

//3.main.js 创建过滤器
//val 是原来的日期对象  格式不好的那个 return返回一个日期格式对象
/*Vue.filter("dataFilter",function(val){
  var data=new Date(val);   //创建日期对象  
  var y=data.getFullYear(); //获取年份
  var m=data.getMonth()+1;  //获取月份
  var d=data.getDate();     //获取日期
  m<10&&(m="0"+m);          //如果月份小于10加前缀0
  d<10&&(d="0"+d);          //如果日小于10加前缀0
  return `${y}-${m}-${d}`;  //拼接字符串
});
*/

//练习：创建过滤器 年月日 时:分:秒
Vue.filter("datatimeFilter",function(val){
  var data=new Date(val);   //创建日期对象  
  var y=data.getFullYear(); //获取年份
  var m=data.getMonth()+1;  //获取月份
  var d=data.getDate();    //创建日期对象  
  var h=data.getHours();        //获取小时
  var mi=data.getMinutes();  //获取分钟
  var s=data.getSeconds();     //获取秒数
  m<10&&(m="0"+m);          
  d<10&&(d="0"+d); 
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;  //拼接字符串
});

//配置信息  Vueresource服务器根目录
Vue.http.options.root="http://127.0.0.1:3000/";
//修改请求头  post格式发送正确
//Vue.http.options.emulateJSON=true;


//4.创建一个Vuex的实例对象
   //4.1下载安装Vuex npm i vuex -D
   //4.2引入Vuex
   import Vuex from "vuex"
   //4.3注册Vuex实例
   Vue.use(Vuex);
   //4.4创建Vuex实例对象
   var store=new Vuex.Store({
     state:{count:0},//购物车中商品的数量    全局状态
     mutations:{//操作状态方法
       increment(state,c){
         state.count+=parseInt;
      },//修改共享数据的两个方法
       substract(state){
         state.count--;
       } //参数共享数据属性
     },
     getters:{//获取状态方法
       optCount:function(state){
         return state.count;//返回共享数据
       }
     }
   });
//5.将Vuex实例对象注册Vue实例




new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
