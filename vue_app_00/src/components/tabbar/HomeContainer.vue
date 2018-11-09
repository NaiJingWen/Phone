<template>
    <div class="app-homeContainer">
    <!--顶部导航条   1：-->
        <mt-header fixed title="克洛伊全球旅拍"></mt-header>
    <!--轮播图      2：-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url" />
            </mt-swipe-item>            
        </mt-swipe>

    <!--六宫格      3：-->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
            <img src="../../img/menu1.png"/>
            <div class="mui-media-body">婚纱资讯</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!--<a @click.stop.prevent="jumpShop()">-->
                <router-link  to="/home/goodslist">
                <img src="../../img/menu2.png"/>
                <div class="mui-media-body">婚纱预约</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/shop" href="#">
                <img src="../../img/menu3.png"/>
                <div class="mui-media-body">购物车</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photo"href="#"><!--to后边是一个变量时，to前要加冒号，否者不用加冒号-->
                <img src="../../img/menu4.png"/>
                <div class="mui-media-body">图片列表</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                <img src="../../img/menu5.png"/>
                <div class="mui-media-body">成功</div></a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                <img src="../../img/menu6.png"/>
                <div class="mui-media-body">列表</div></a>
        </li>
	  </ul> 
    </div>
</template>
<script>
    export default {
        data() {return{
            list:[]//创建一个data属性保存数据
        }},
        methods:{
            jumpShop(){
                //编程式的跳转方式
                //this.$router.push("/home/shop?id=15");//方法一
                this.$router.push("/home/shop/19");//方法二
            },
            getImage(){
                //发送ajax请求并且获取图片列表并且显示
                var url="http://127.0.0.1:3000/imagelist"
                this.$http.get(url).then(result=>{
                    //获取返回数，保存 list属性中
                    console.log(result.body);
                    this.list=result.body;

                })
            }
        },
        created(){
            this.getImage();
        }
    }
</script>
<style>
    /*自定义组件样式
    .app-homeContainer header.mint-header{
        background-color:#ccc;
        color:purple;
    }*/
    /*图片轮播设置高度*/
    .app-homeContainer .mint-swipe{
        height:140px;
    }
    .app-homeContainer .mint-swipe img{
        width:100%;
    }
    /*调整六宫格*/
    .app-homeContainer .mui-grid-view.mui-grid-9{
        background:#fff;
        border:0;
    }
    /*像素分为两种：物理像素、逻辑像素
      设计师：创建效果图  pd 称为物理像素
      程序代码内的：代码内的  称为逻辑像素
      比值：iPhone6:2  iphone6-plus:3
      设计师图片物理像素120px/2=60px;
    */
    .app-homeContainer .mui-grid-view.mui-grid-9 img{
        width:60px;
        height:60px;
    }
    .app-homeContainer .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size:16px;
    }  
</style>