;(function($){
	"use strict";
	$.fn.extend({
		banner:function(options){
			//1.解析参数，设置默认，开始绑定事件
			this.LOCAL={
				delaytime:options.delaytime?options.delaytime:2000,
				movetime:options.movetime?options.movetime:200,
				islist:options.islist?options.islist:false,
				//index为当前图片，prev为上一张
				index:0,
				prev:options.aimgs.length
			}
			if(options.autopaly||options.autopaly===undefined){
				this.LOCAL.autopaly=true
			}else{
				this.LOCAL.autopaly=false
			}
			var that=this;
			that.LOCAL.Rightbtn=function(){
				//console.log("往左走")
				if(that.LOCAL.index==options.aimgs.length-1){
					that.LOCAL.index=0;
					that.LOCAL.prev=options.aimgs.length-1;
				}else{
					that.LOCAL.index++;
					that.LOCAL.prev=that.LOCAL.index-1;
				}
				//3-2执行改变后运动
				that.LOCAL.btnmove(-1)
			}
				that.LOCAL.btnmove=function(type){
				options.aimgs.eq(that.LOCAL.prev).css({left:0}).stop().animate({
					left:options.aimgs.eq(0).width()*type
				},that.LOCAL.movetime).end().eq(that.LOCAL.index).css({left:-options.aimgs.eq(0).width()*type}).stop().animate({
					left:0
				},that.LOCAL.movetime)
				//10判断点击左右按钮式是否有list,如有，也要改变对应的当前项
				if(that.LOCAL.islist){
					$(".list").children("li").eq(that.LOCAL.index).css({background:"red"}).siblings().css({background:""})
				}
			}
			if(options.leftbtn&&options.leftbtn.length>0&&options.rightbtn
			&&options.rightbtn.length>0){
				this.LOCAL.leftbtn=options.leftbtn;
				this.LOCAL.rightbtn=options.rightbtn;
				//2.绑定事件，改变索引
				this.LOCAL.leftbtn.on("click",function(){
					//console.log("往右走")
					if(that.LOCAL.index==0){
						that.LOCAL.index=options.aimgs.length-1;
						that.LOCAL.prev=0;
					}else{
						that.LOCAL.index--;
						that.LOCAL.prev=that.LOCAL.index+1;
					}
					//3-1执行改变后运动
					that.LOCAL.btnmove(1)
				})
					this.LOCAL.rightbtn.on("click",that.LOCAL.Rightbtn)
				//4.左右按钮运动事件
			
				
			}
			//5判断是否要生成list图标
			if(this.LOCAL.islist){
				var str="";
				for(var i=0;i<options.aimgs.length;i++){
					str+=`<li>${i+1}</li>`
				}
				this.append($("<ul>").html(str).addClass("list"))
				//6.设置ul.li的样式
				$(".list").css({
					display:"flex",
					height:"30px",
					lineHeight:"30px",
					background:"rgba(220,220,220,.6)",
					left:0,
					right:0,
					bottom:0,
					padding:0,
					margin:0,
					zIndex:1,
					position:"absolute",
					textAlign:"center",
					listStyle:"none"
				}).children("li").css({
					flex:1,
					borderLeft:"1px solid #000",
					borderRight:"1px solid #000",
				}).eq(0).css({background:"red"})
				//7.给图标绑定事件
				
				$(".list").children("li").on("click",function(){
					//console.log($(this).index())
					
					//8.执行小图标运动
					if($(this).index()>that.LOCAL.index){
						//console.log("向左")
						
						that.LOCAL.listmove(1,$(this).index() )
						//9.改变当前项
						that.LOCAL.index=$(this).index() 
						
					}
					if($(this).index()<that.LOCAL.index){
						
						that.LOCAL.listmove(-1,$(this).index() )
						that.LOCAL.index=$(this).index()
						 
						//console.log("向右")
					}
					//改变索引,改变list当前项
					
					$(".list").children("li").eq($(this).index()).css({background:"red"}).siblings().css({background:""})
					
				})
			 	that.LOCAL.listmove=function(type,inow){
					options.aimgs.eq(that.LOCAL.index).css({left:0}).stop().animate({
						left:-options.aimgs.eq(0).width()*type
					},that.LOCAL.movetime).end().eq(inow).css({left:options.aimgs.eq(0).width()*type}).stop().animate({
						left:0
					},that.LOCAL.movetime)
				} 
				
			}
			//11.判断是否要自动轮播
			if(this.LOCAL.autopaly){
				this.LOCAL.timer=setInterval(()=>{
					that.LOCAL.Rightbtn()
				},this.LOCAL.delaytime)
				this.hover(function(){
					clearInterval(that.LOCAL.timer)
				},function(){
					that.LOCAL.timer=setInterval(()=>{
						that.LOCAL.Rightbtn()
					},that.LOCAL.delaytime)
				})
			}
			
		}
		
		
		
	})
	
	/* aimgs:$(" .banner1 .imgbox a"),//必传项
	leftbtn:$(".banner1 .btns #left"),//左按钮,可有可无
	rightbtn:$(".banner1 .btns #right"),//左右按钮,可有可无,若无,便自动播放
	islist:true,//下面小图标,传就有,不传默认没有false
	delaytime:2000,//一张图片到下一张图片的间隔时间，可有可无,若没有便默认
	movetime:2000,//可有可无,每张图片播放的时间,若无设置默认值
	autopaly:true/ */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})(jQuery)