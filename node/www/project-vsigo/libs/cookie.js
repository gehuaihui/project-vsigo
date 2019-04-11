
function setCookie(key,value,options){
	options = options || {};
	
	var d = new Date();
	d.setDate(d.getDate() + options.expires);
	
	var path = options.path==undefined ? "" : ";path="+options.path;
	var time = options.expires == undefined ? "" : ";expires="+ d;
	
	document.cookie = key + "=" + value + time + path;
}
		
function removeCookie(key,options){
	options = options || {};
	var str = options.path==undefined ? "" : options.path;
	setCookie(key,123,{
		expires:-1,
		path:str
	})
}

function getCookie(key){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].split("=")[0] == key){
			return arr[i].split("=")[1];
		}
	}
	return "";
}
