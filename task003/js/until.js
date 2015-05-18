// 基类
// 获取id值
 function $( id ){
	return document.getElementById( id );
}

//从className来进行查询
function getElementsByClassName(parent,tagname,className)
{
	var arr = [];
	var aEvls = parent.getElementsByTagName(tagname);
	for(var i=0;i<aEvls.length;i++)
	{
		var aClassName = aEvls[i].className.split(' ');
		for(var j=0;j<aClassName.length;j++)
		{
			if(aClassName[j] == className)
			{
				arr.push(aEvls[i]);
			}
		}
	}
	return arr;
}


//为dom增加一个样式名为newClassName的新样式
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



// 添加(兼容)事件
function addEvent(element,type,handler)
{
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
 	}else if(element.attachEvent){
 		element.attachEvent("on" + type,handler);
 	}else{
 		element["on" + type] = handler;
 	}
}


//事件委托，可改变元素的指向
function onTarget(oParent,objClass,ev,fn){
	addEvent(oParent,ev,function(e){
		e = e || window.event ;
		var oTarget = e.target || e.sreElement;
		var iClass = oTarget.className; //通过className判断
		if(iClass == objClass){ //如果className为给定的className
			fn.call(oTarget)    //this指向为className的元素
		}
	})
	
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
 
//深度克隆
function cloneObject(obj)
{
	var o,i,j,k;
	if(typeof(obj)!="object" || obj===null)return obj;
	if(obj instanceof(Array))
	{
		o=[];
		i=0;j=obj.length;
		for(;i<j;i++)
		{
			if(typeof(obj[i])=="object" && obj[i]!=null)
			{
				o[i]=arguments.callee(obj[i]);
			}
			else
			{
				o[i]=obj[i];
			}
		}
	}
	else
	{
		o={};
		for(i in obj)
		{
			if(typeof(obj[i])=="object" && obj[i]!=null)
			{
				o[i]=arguments.callee(obj[i]);
			}
			else
			{
				o[i]=obj[i];
			}
		}
	}
 
	return o;
}


