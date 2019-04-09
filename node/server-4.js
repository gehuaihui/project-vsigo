  //1.引入模块
 const http = require("http");
  //引入fs（文件系统）模块
  const fs = require("fs");
   //引入 querystring模块：post接收数据解析模块
 //将查询字符与对象互相转换的模块
  const querystring = require("querystring");
   //引入url模块
    const urlModel = require("url")
	//这是模拟的数据库，用来存放用户注册的信息
	 var arr=[];
//开启服务器
http.createServer((req,res)=>{//站在后台的角度req是从前端接收的数据，res是发送给前端的
     var Urlobj = urlModel.parse(req.url,true);
	 //console.log( Urlobj.query)
			if(req.url != "/favicon.ico"){
					switch(Urlobj.pathname){
					case "/login":
					     login(req,res,Urlobj);
						 break;
				    case "/register":
					   register(req,res);
					   break;
					default:
					    	fs.readFile("www"+ req.url,(error,data)=>{
					    		if(error==null){
					    			res.write(data);
					    				
					    		}else{
					    				res.write("404");
					    		}
					    	  res.end();
					    })
				 }
							
			
    	
                 } 
		 

	}).listen("8181","localhost",()=>{//监听端口和地址
		console.log("服务器开启成功！");
	})
	function login(req,res,url){
		//准备做一个get请求数据的接口响应，登录
		//url.query就是前端发送过来的get数据
		var onoff=true;
		//准备验证数据是否正确，遍历现存的数据
		for(var i=0;i<arr.length;i++){
			//发现用户名和密码相同
			if(url.query.user===arr[i].user&&url.query.pass===arr[i].pass){
				//返回成功的信息
				res.write('{"msg":"登录成功","code":"0"}');
			
				onoff=false;
				break;
			}
			
		}
		//结束之后，没有发现相同数据返回失败
		if( onoff){
			res.write('{"msg":"登录失败","code":"1"}');
		}
	
		
		res.end();
	}
	function register(req,res){
		//准备做一个post请求数据的接口响应，注册
		//post发送的数据不在url上面，在req上
		//res.write("这是一个注册接口");
		var str="";
		var i=0;
		//找到req身上的data事件（会多次触发）
		req.on("data",(msg)=>{
			str+=msg;
			i++
			
		})
		//还需要找到end事件，发送结束会触发end,获取所有数据
		req.on("end",()=>{
			//res.write(str)
			//借助解析字符模块，解析接收到的数据为对象
			var obj=querystring.parse(str);
			var onoff=true;
			//查询初始用户库中是否有数据
			for(var i=0;i<arr.length;i++){
				//如果有就报错
				if(obj.user==arr[i].user){
					res.write('{"msg":"重名","code":"0"}');
					console.log(0)
					onoff=false;
					break;
				}
			}
			if(onoff){
				//没有就保存
				
				res.write('{"msg":"注册成功","code":"1"}');
				
				arr.push(obj);
			}
			
				console.log(arr)
			
			//console.log("接收到数据的次数:"+i)
			
			res.end();
		})
		
	}