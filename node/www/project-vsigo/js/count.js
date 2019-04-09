(function(){
	function Magnifier(){
			this.osbox=document.querySelector(".s-box");
			this.ospan=this.osbox.children[1];
			this.obbox=document.querySelector(".b-box");
			this.oimg=this.obbox.children[0];
			this.addevent();
		}
		Magnifier.prototype.addevent=function(){
			var that=this;
			this.osbox.onmouseover=function(){
				that.over()
			}
			this.osbox.onmouseout=function(){
				that.out()
			}
		}
		Magnifier.prototype.over=function(){
			this.ospan.style.display="block";
			this.obbox.style.display="block";
			this.moveevent()
		}
			Magnifier.prototype.out=function(){
			this.ospan.style.display="none";
			this.obbox.style.display="none";
		}
		Magnifier.prototype.moveevent=function(){
			var that=this;
			this.osbox.onmousemove=function(eve){
				var e=eve||window.event;
				that.ospanmove(e)
				
			}
		}
		Magnifier.prototype.ospanmove=function(e){
			this.l=e.offsetX-this.ospan.offsetWidth/2;
			this.t=e.offsetY-this.ospan.offsetHeight/2;
			if(this.l<0){this.l=0}
			if(this.t<0){this.t=0}
			if(this.l>this.osbox.offsetWidth-this.ospan.offsetWidth){
				this.l=this.osbox.offsetWidth-this.ospan.offsetWidth}
			if(this.t>this.osbox.offsetHeight-this.ospan.offsetHeight){
				this.t=this.osbox.offsetHeight-this.ospan.offsetHeight}
			this.ospan.style.left=this.l+"px";
			this.ospan.style.top=this.t+"px";
			this.x=this.l/(this.osbox.offsetWidth-this.ospan.offsetWidth);
			this.y=this.t/(this.osbox.offsetHeight-this.ospan.offsetHeight);
			this.move()
		}
		Magnifier.prototype.move=function(){
			this.oimg.style.left=-(this.oimg.offsetWidth-this.obbox.offsetWidth)* this.x +"px";
		    this.oimg.style.top=-(this.oimg.offsetHeight-this.obbox.offsetHeight)* this.y +"px";
		}
		new Magnifier()
	
})()