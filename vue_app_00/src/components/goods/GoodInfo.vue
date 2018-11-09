<template>
    <div class="app-goodinfo">
        <!--1.商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper-box :list="imglist"></swiper-box>
                </div>
            </div>
        </div>        
        <!--2.商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{info.old}}</del>
                        销售价:<span class="now">￥{{info.now}}</span>
                    </p>
                    <p class="price">
                        购买的数量:
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1" v-model="val"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
                        </div>                        
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCartTo">加入购物车</mt-button>                        
                    </p>                     
                </div>
            </div>
            <div class="mui-card-footer"></div>
        </div>        
        <!--3.商品的参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品的参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{info.pid}}</p>
                    <p>商品运费:0</p>
                    <p>商品颜色:蕾丝长款婚纱</p>
                    <p>商品尺寸:10m</p>                    
                </div>
            </div>
            <div class="mui-card-footer"></div>
        </div>                
    </div>
</template>
<script>
    //父组件 GoodInfo.vue
    //1.引入
    import swiper from '../sub/swiper.vue';
    //2.引入mui的js库
    // import mui from '../../lib/mui/js/mui.js'
    import {Toast} from 'mint-ui';
    //2.注册
    //3.调用
    export default {
        data(){
            return{
                imglist:[],
                val:1,
                info:{}
            }
        },
        methods:{
            addCartTo(){
                //console.log("添加至购物车");
                //1.将商品编号和数量保存到服务器   发送一个ajax请求
                   //1.1获取商品编号 商品编号已经有了在地址栏上
                   var id=this.$route.params.id;                  
                   //1.2获取商品数量
                   var count=this.val;                   
                   //1.3发送请求
                   this.$http.get("addCart?pid="+id+"&count="+count).then(result=>{
                       if(result.body.code==1){
                           //1.4更新购物车中商品的数量
                           //修改Vuex共享数据
                           this.$store.commit("increment",count);
                           //共享数据不能刷新
                           //localStore 一个浏览器自带的对象 可以永久保存数据
                           Toast(result.body.msg);
                       }else{
                           Toast(result.body.msg);
                       }
                   });
                //2.更新App.vue组件中购物车的数量
            },
            getGoodInfo(){
                var id=this.$route.params.id;
                this.$http.get("goodsinfo?id="+id).then(result=>{
                    this.info = result.body;
                    //console.log(this.info);
                })
            },
            goodAdd(){
                if(this.val<=999){
                this.val++;                    
                }
            },
            goodSub(){
                if(this.val>1)
                this.val--;
            },
            //服务器返回模拟数据[id;title;now;old;商品编号]
            //参数:商品id
            getImageList(){
                this.$http.get("imagelist").then(result=>{
                    this.imglist=result.body;
                })
            }
        },
        created() {
            this.getImageList();
            this.getGoodInfo();
            console.log(this.$route.params.id);
        },
        components:{
            "swiper-box":swiper
        }
    }
</script>
<style>
    
</style>