//2.1 判断数据类型 
function isArray(arr){
	return arr instanceof Array;
 }

 function isFunction(fn){
	return typeof arr == 'function'?true:false;
 }

// ?  使用递归来实现一个深度克隆
function cloneObject(src) {   
    var buf;   
    if (src instanceof Array) {   
        buf = [];  //创建一个空的数组 
        var i = src.length;   
        while (i--) {   
            buf[i] = cloneObject(src[i]);   
        }   
        return buf; 
    }        
    else if(src instanceof Object){   
        buf = {};  //创建一个空对象 
        for (var k in src) {  //为这个对象添加新的属性 
            buf[k] = cloneObject(src[k]);   
        }   
        return buf;   
    }else{   
        return src;   
    }   
} 


//数组去重
function uniqArray(arr) {
  for(var i=0;i<arr.length;i++){
  	for(var j=i+1;j<arr.length;j++)
  		if(arr[i] === arr[j])
  		{
  			arr.splice(j,1); //第二个参数为1，表示删除当前
  			j--;	
  		}
  }
  return arr;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str){
	arr = str.split('');
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i] == ' '||arr[i] == '　'||arr[i] == '	')
		{
			arr.splice(i,1);
			i--;
		}
	}
	b = arr.join('');
	return b;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
	var i;
	for(i in arr) fn(arr[i]);
}



//获取一个对象里面第一层元素的数量，返回一个整数
//?对象
function getObjectLength(obj) {
	var arr = [];
	for(var attr in obj){
		arr.push(attr); 
	}
	return arr.length;
}	


// 判断是否为邮箱地址
function isEmail(emailStr){
	var re = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
	if(re.test(emailStr)){
		return true;
	}else{
		return false;
	}
}	 

// 判断是否为手机号
function isMobilePhone(phone){
	var re = /^1[3|5|8]\d{9}$/;
	if(re.test(phone)){
		return true;
	}else{
		return false;
	}
}	





// 3.1 DOM
// 为dom增加一个样式名为newClassName的新样式
function addClass(element,newClassName){
	if(element.className == '')
	{
		element.className = newClassName;
	}else{
		var arr = element.className.split(' ');
		for(var i=0;i<arr.length;i++){
			if(arr[i] == newClassName){
				break;
			}else{
				arr[i]+= ' '+ newClassName;
			}
		}
		element.className = arr;
	}
}


// 移除dom中的样式oldClassName

function removeClass(element,oldClassName) {
	if(element.className != ' '){
		var arr = element.className.split(' ');
		for(var i=0;i<arr.length;i++){
				if(arr[i] == oldClassName){
					arr.splice(i,1);
				}	
		}	
		arr = arr.join(' ');
		element.className = arr;
	}
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	if(element.parentNode == siblingNode.parentNode){
		return true;
	}else{
		return false;
	}
}


// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element)
{
	var pos = {   //定义一个json来存放left和top
		left:0,
		top:0
	};
	while(element)
	{
		element.left += element.offsetLeft;
		element.top += element.offsetTop;
		element = element.offsetParent;
	}
	return pos;
}

// 实现一个简单的Query
function $(selector) {

}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象




//4.事件

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	if(element.addEventListener){
		element.addEventListener(event,listener,false);	//冒泡
	}else{
		element.attachEvent('on'+ event,function(){
			listener.call(element);
		})
	}
}	

// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
	if(element.removeEventListener){
		element.removeEventListener(event,listener,false);	
	}else if(element.detachEvent){
		element.detachEvent('on'+ event,function(){
			listener.call(element);
		})
	}else{
		element["on" + event] = null;
	}
}	

// 实现对click事件的绑定
function addClickEvent(element, listener) {
	addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,"keydown",function (e) {
        if(e.keyCode===13){
            listener.call(element,e);
        }
    });
}



//5.BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	if(window.navigator.userAgent.indexOf('MSIE') != -1)
	{
		return window.navigator.userAgent;
	}else{
		return -1;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+expiredays);
	document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate.toGMTString();
}


// 获取cookie值
function getCookie(cookieName){
	var arr1 = document.cookie.split(';');
	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=');
		if(arr2[0] == cookieName){
			return decodeURI(arr2[1]);
		}
	}
}

//6.AJAX
// function createXHR(){
// 	if(typeof XMLHttpRequest!="undefined"){
// 		return new XMLHttpRequest();//标准浏览器下
// 	}else if(typeof ActiveXObject!="undefined"){
// 		var version = [
// 			'MSXML2.XMLHttp.6.0',
// 			'MSXML2.XMLHttp.3.0',
// 			'MSXML2.XMLHttp'
// 		];
// 		for(var i=0;version.length;i++){
// 			try{
// 				return new ActiveXObject(version[i]);
// 			}catch(e){
// 				//跳过
// 			}
// 		}
// 	}else{
// 		throw new Error("您的浏览器版本不支持XHR");
// 	}
// }
// //名值对转换为字符串
// function params(data){
// 	var arr=[];
// 	for(var i in data){
// 		arr.push( encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));//用encodeURIComponent来解决传入数据的&符号
// 	}
// 	return arr.join('&');
// }
// //封装AJAX
// function ajax(obj,url){
// 	var xhr = createXHR();
// 	url = url + '?rand='+ Math.random();
// 	obj.data = params(obj.data);
// 	if(obj.method === 'get') url=url.indexOf('?')==-1?url+'?'+obj.data:url+'&'+obj.data;
// 	if(obj.async === true){
// 	xhr.onreadystatechange = function(){
// 			if(xhr.readyState == 4){
//  				callback();
// 			}
// 		};	
// 	}	
// 	xhr.open(obj.method,url,obj.async);		
// 	if(obj.method === "post"){	
// 		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); 
// 		xhr.send(obj.data);		
// 	}else{
// 		xhr.send(null);
// 	}

// 	if(obj.async === false){	
// 		callback();
// 	}

// 	function callback(){
// 		if(xhr.status == 200){
// 			obj.success(xhr.responseText); //回调传递参数
// 		}else{
// 			alert("获取数据错误代号："+ xhr.status +"信息:" + xhr.statusText);
// 		}	
// 	}

// }
// //调用AJAX
// document.onclick = function(){
// 	ajax({
// 		method:'get',
// 		data:{
// 			'name':'skq',
// 			'age':21
// 		},
// 		success:function(text){     //回调
// 			alert(text)
// 		},
// 		async:true
// 	},'demo.php'
// 	);

// };











