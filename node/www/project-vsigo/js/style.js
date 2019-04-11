(function(){
	$(".banner1").banner({
		aimgs:$(" .banner1 .imgbox a"),//必传项
		 leftbtn:$(".banner1 .btns #left"),//左按钮,可有可无
		rightbtn:$(".banner1 .btns #right"),//左右按钮,可有可无,若无,便自动播放 */
		islist:false,//下面小图标,传就有,不传默认没有false
		autopaly:true//是否自动播放,若没有左右按钮,默认自动播放,若有左右按钮,可有可无,默认不自动播放
		 
		
		
	});
	$("#allshortlist").children(".navlist").hover(function(){
		$(".navlist").removeClass("hover").next(".navmore").css({"display":"none"});
		$(this).addClass("hover").next(".navmore").css({"display":"block"});
	},function(){
		$(this).removeClass("hover").next(".navmore").css({"display":"none"});
		
	})
	$("#news .in_pro ul li").hover(function(){
		$("#news .in_pro ul li").removeClass("active");
		$(this).addClass("active");
		$(".in_pro_content").css({"display":"none"}).eq($(this).index()).css({"display":"block"})
		
	})
		
	var str="";
	for(var i=0;i<json.length;i++){
		str=str+` <li>
				<div class="hot_pro">
					<a href="#" target="_blank">
						<img abc=${json[i].src} alt=${json[i].aval}>
					</a>
					<p class="pro_title">
					<a href="#" target="_blank" title="${json[i].aval}">hahaha</a>
					</p>
					<p class="pro_cx">
						<span class="sprice">${json[i].span1}</span>
						<span class="cxtag">${json[i].span2}</span>
					</p>
					<p class="pro_comm">
						<span class="comm_num">${json[i].span3}</span>
						评论
						<span class="sep">|</span>
						<span class="comm_num">${json[i].span4}</span>
						好评
					</p>
					</div>
			</li>`
		
	}
$(".hot").find("ul").html(str);
$(".lmenu_fixed ul li").on("click",function(){
	$(".lmenu_fixed ul li").find("b").css({backgroundPositionX:"0"})
	$(this).find("b").css({backgroundPositionX:"53px"})
	var t=$(".hot").eq($(this).index()).offset().top;
	$("html").animate({
		scrollTop:t
	})
	
	
})
//1.创造对象
			function search(){
				//2.选择元素
				this.txt=document.getElementById("txt");
				this.list=document.getElementById("list");
				this.url="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
				//3.绑定事件
				this.addevent();
			}
			search.prototype.addevent=function(){
				var that=this;
				this.txt.onkeyup=function(){
				//4.保存输入框的内容
				that.v=that.txt.value;
				//5.准备请求数据
				that.load();
					
				}
			}
			search.prototype.load=function(){
				var that=this;
				jsonp(this.url,function(res){
					that.res=res;
					that.display();
				},{
					_name:"cb",
					cb:"abc",
					wd:this.v
				});
			}
			search.prototype.display=function(){
				console.log(this.res.s)
				var str="";
			    this.res.s.forEach(
				function(v){
					str+=`<li>${v}</li>`
				}
				)
					
				
				this.list.innerHTML=str;
			}
			new search();

//		延迟加载
		var clientH = document.documentElement.clientHeight;
		var aimg = document.querySelectorAll(".hot ul li a img");
	
	
			
			window.onscroll = function(){
				var t = document.documentElement.scrollTop;
				
					for(var i=0;i<aimg.length;i++){	
						var imgT = aimg[i].offsetTop;
							if(clientH + t > imgT + 1200){
							aimg[i].src = aimg[i].getAttribute("abc");
						}
					}
				
			}
		
			
	
	
})()