function ajaxGet(url,callback,data){
			//?user=admin&pass=123456
			data=data==undefined?{}:data;
			str="";
			for(var i in data){
				str=str+i+"="+data[i]+"&";
			}
			//console.log(str);
			 var d=new Date();
		    url=url+"?"+str+"_lyt="+d.getTime();
			var ajax=new XMLHttpRequest();
			ajax.open("GET",url,true);
			ajax.onreadystatechange=function(){
				if(ajax.readyState==4&&ajax.status==200){
					callback(ajax.responseText);
				}
					
				
			}; 
			ajax.send(null);
		}
		function ajaxPost(url,callback,data){
			//?user=admin&pass=123456
			data=data==undefined?{}:data;
			str="";
			for(var i in data){
				str=str+i+"="+data[i]+"&";
			}
			str=str.slice(0,str.length-1);
			//console.log(str);
			 var d=new Date();
		    url=url+"?"+"_lyt="+d.getTime();
			var ajax=new XMLHttpRequest();
			ajax.open("POST",url,true);
			ajax.onreadystatechange=function(){
				if(ajax.readyState==4&&ajax.status==200){
					callback(ajax.responseText);
				}
					
				
			}; 
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send(str);
		}
		function jsonp(url,callback,data){
			var str= "";
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
			}
			str = str.slice(0,str.length-1);
			url = url + "?" + str;
			
		//	通过顶层对象window,在局部环境中绑定一个全局函数
			window[data[data._name]] = function(res){
				callback(res)
			}
			
			var script = document.createElement("script");
			script.src = url;
			document.body.appendChild(script)
		}