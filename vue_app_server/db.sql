#1:进入xz库中
USE xz;
#2:创建新闻表
CREATE TABLE xz_chloee(
 id    INT PRIMARY KEY AUTO_INCREMENT, 
 title VARCHAR(128),
 ctime DATETIME,
 img_url VARCHAR(255),
 point INT
);
#now() 当前数据库时间 年月日时分秒
INSERT INTO xz_chloee VALUES(null,'..巴厘岛',now(),
"http://127.0.0.1:3000/img/1.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..日本',now(),
"http://127.0.0.1:3000/img/2.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..济州岛',now(),
"http://127.0.0.1:3000/img/3.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..曼谷',now(),
"http://127.0.0.1:3000/img/4.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..普吉岛',now(),
"http://127.0.0.1:3000/img/5.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..马尔代夫',now(),
"http://127.0.0.1:3000/img/6.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..三亚',now(),
"http://127.0.0.1:3000/img/7.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..厦门',now(),
"http://127.0.0.1:3000/img/8.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..丽江',now(),
"http://127.0.0.1:3000/img/9.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..大理',now(),
"http://127.0.0.1:3000/img/10.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..香格里拉',now(),
"http://127.0.0.1:3000/img/11.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..青海',now(),
"http://127.0.0.1:3000/img/12.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..西藏',now(),
"http://127.0.0.1:3000/img/13.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..塞班岛',now(),
"http://127.0.0.1:3000/img/14.jpg",0);
INSERT INTO xz_chloee VALUES(null,'..青岛',now(),
"http://127.0.0.1:3000/img/15.jpg",0);


CREATE TABLE xz_comment(
  id  INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(140),
  ctime   DATETIME,
  user_name VARCHAR(50),
  nid  INT
);


INSERT INTO xz_comment VALUES(null,'ha ha1',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha2',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha3',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha4',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha5',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha6',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha7',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha8',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha9',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha10',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha11',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha12',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha13',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha14',now(),'匿名 ',1);
INSERT INTO xz_comment VALUES(null,'ha ha15',now(),'匿名 ',1);


CREATE TABLE xz_user2(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25),
  upwd  VARCHAR(32)
);
#通用加密算法md5 对称加密算法  散列算法
#单向加密
#对此循环加密md5(md5('123'))
#进行解决方案：强制用户密码超过8位，大写字母小写字母数字特殊字符
INSERT INTO xz_user2 VALUES(null,'dd',md5('123'));
INSERT INTO xz_user2 VALUES(null,'wh',md5('123'));
INSERT INTO xz_user2 VALUES(null,'lily',md5('123'));






