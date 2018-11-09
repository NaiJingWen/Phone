//app.js
//1.加载模块
const express = require("express");
const pool=require("./pool")
//2.创建express对象
var app=express();

//服务器node.js允许跨域访问配置项
//2.1 引入跨域模块
const cors=require("cors");
//2.2 配置允许那个程序跨域访问 脚手架
app.use(cors({
    origin:[
        "http://127.0.0.1:3001",
        "http://localhost:3001"],
    credentials:true
}))

//3.指定静态目录
//服务器指定目录 相对路径 出错 可以改为绝对路径
//c:/wxamp/htdocs/vueui/ww/day01....
//app.use(express.static("public"));//相对路径
app.use(express.static(__dirname+"/public"));//绝对路径
//4.绑定监听端口
app.listen(3000);


//功能一：学子商城首页图片轮播 
//GET  /imglist   json
app.get("/imagelist",(req,res)=>{
    var obj=[
        {id:1,img_url:"http://127.0.0.1:3000/img/a93.jpg"},
        {id:2,img_url:"http://127.0.0.1:3000/img/a94.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/a95.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/a96.jpg"},
        {id:5,img_url:"http://127.0.0.1:3000/img/a97.jpg"},
        {id:6,img_url:"http://127.0.0.1:3000/img/a98.jpg"},
        {id:7,img_url:"http://127.0.0.1:3000/img/a99.jpg"}
    ];
    res.send(obj);
});


//分页显示:新闻分页
app.get("/newslist",(req,res)=>{
    //1:参数  当前页码  页大小(一页显示几行数据)
    var pno = req.query.pno;            //2
    var pageSize = req.query.pageSize;  //5
    //2:sql
    //2.1:查找总记录数->转换总页数  15->3
    var sql = "SELECT count(id) as c FROM xz_chloee";
  
  
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        obj.pageCount = c;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    });
    //2.2:查找当前页内容           中间5行
    var sql = " SELECT id,title,img_url,ctime,point";
       sql += " FROM xz_chloee";
       sql += " LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
    pageSize = parseInt(pageSize)
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err)throw err;
        //console.log(result);
        obj.data = result;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    })
    //3:结果格式
    //res.send({code:"ok"})
  });
  //功能三：发送脚手架新闻详情
  app.get("/newsinfo",(req,res)=>{
      var obj={
          title:"近日婚纱旅拍有活动",
          content:"价格实惠 快来订购啊！！"
      };
      res.send(obj);
  })

  //功能4：用户发表评论
  const qs=require("querystring");
  app.post("/postcomment",(req,res)=>{
      //为request绑定事假data  客户和数据发送成功就会触发这个事件
      req.on("data",(buf)=>{
          var str=buf.toString();       //1.参数转成字符串
          var obj=JSON.parse(str);        //2.将字符串转化为js对象
          var msg=obj.msg;              //3.msg 评论内容
          var nid=parseInt(obj.nid);    //4.nid 新闻编号
          var sql="INSERT INTO xz_comment(content,user_name,ctime,nid)VALUE(?,'匿名',now(),?)";
          pool.query(sql,[msg,nid],(err,result)=>{
              if(err) throw err;
              res.send({code:1,msg:"添加成功"})
          })
      })
  })

  //功能5：用户获取执行新闻编号所有评论
  app.get("/getComment",(req,res)=>{
    //获取指定新闻的编号
    var nid=parseInt(req.query.id);
    //1:参数  当前页码  页大小(一页显示几行数据)
    var pno = req.query.pno;            
    var pageSize = req.query.pageSize;  
    //2:sql
    //2.1:查找总记录数->转换总页数  15->3
    var sql = " SELECT count(id) as c FROM xz_comment";
        sql+=" WHERE nid=?";
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,[nid],(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        obj.pageCount = c;
        progress+=50;
        if(progress==100){
        res.send(obj);
        }
    });
    //2.2:查找当前页内容           中间5行
    var sql = " SELECT id,content,ctime,user_name";
    sql += " FROM xz_comment";
    sql += " WHERE nid = ?";
    sql += " ORDER BY id DESC";//降序排列
    sql += " LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
    pageSize = parseInt(pageSize)
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err)throw err;
        //console.log(result);
        obj.data = result;
        progress+=50;
        if(progress==100){
        res.send(obj);
        }
    })      
  })
 
//功能6：返回商品的详细信息
//服务器返回模拟数据[id;title;now;old;商品编号]
//参数:商品id
app.get("/goodsinfo",(req,res)=>{
    var id=req.query.id;
    var obj={id:id,title:"巴厘岛度假胜地",old:19999,now:8888,pid:9527};

    res.send(obj);
})

//功能七:购物车的数据列表
//组件发送ajax请求获取并显示数据
app.get("/shopCart",(req,res)=>{
    var obj=[];
    obj.push({id:1,title:"巴厘岛",price:8999,count:2})
    obj.push({id:2,title:"马尔代夫o",price:9999,count:1})
    obj.push({id:3,title:"普吉岛",price:7999,count:1})    
    res.send(obj);
})

//功能八:将商品信息添加至购物车
//INSERT INTO xz_cart VALUE
app.get("/addCart",(req,res)=>{
    //1.参数  ①商品的id ②商品放的数量
       //1.1获取参数
       var pid=req.query.pid;
       var count=req.query.count;
       //1.2创建正则表达式验证  一定做
       //所有用户参数都需要验证  js第一次  node.js是第二次 -->会比较安全
       var reg=/^[0-9]{1,}$/;//创建了正则表达式
       if(!reg.test(pid)){    //如果参数验证失败了
           res.send({code:-1,msg:"商品编号参数有误"}); 
           return;           //输出错误信息并停止 
       }
       if(!reg.test(count)){
           res.send({code:-2,msg:"商品数量参数有误"});
           return;           //输出错误信息并停止
       }
       //1.3如果验证失败 返回
    //2.连接数据库
    //3.返回成功值
       res.send({code:1,msg:"添加成功"});
})


//功能八
app.get("/login",(req,res)=>{
    //1:参数 2 uname upwd
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //2:正则表达式验证 
    //3:sql 
    var sql = " SELECT count(id) as c FROM xz_user2";
        sql +=" WHERE uname=? AND upwd = md5(?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
          if(err)throw err;
          if(result[0].c==0){
            res.send({code:-1,msg:"用户名或密码错误"});
          }else{
            res.send({code:1,msg:"登录成功"});
          }
    })
  
  });