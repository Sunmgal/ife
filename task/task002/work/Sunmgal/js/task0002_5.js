window.onload = function(){	
		var oUl1 = document.getElementById("ul1");
		var oUl2 = document.getElementById("ul2");
		var aLi1 = oUl1.getElementsByTagName("li");
		var aLi2 = oUl2.getElementsByTagName("li");
 
		//设置间距
		function setStyle(obj){
			var iHeight = 50;
			for(var i=0;i<obj.length;i++){
				obj[i].style.top = i*iHeight + 'px';
			}
		}
		setStyle(aLi1);
		setStyle(aLi2);

 		function move(obj,i){
			obj.onmousedown = function(ev){
				var ev = ev || event;
				var target = ev.srcElement || ev.target;
				var X = ev.clientX - target.offsetLeft;
				var Y = ev.clientY - target.offsetTop;

				//在非标准浏览器下设置全局捕获
				if(target.setCapture){
					target.setCapture();   
				}

				if(target.nodeName.toLowerCase() === 'li'){  //用nodeName排除ul
					document.onmousemove = function(ev){ 
						var ev = ev || event;
						//设置obj移动的范围
						var L = ev.clientX - X;
						var T = ev.clientY - Y 
						if(L*i<0){
							L = 0;
						}else if(L*i > 59){
							L = i*(obj.clientLeft + obj.offsetWidth + 59);
						}

						if(T<0){
							T = 0;
						}else if(T>obj.offsetHeight - target.offsetHeight){
							T = obj.offsetHeight - target.offsetHeight ;
						} 

						target.style.left = L + 'px';
						target.style.top = T + 'px';	
					};

					document.onmouseup = function(){
						document.onmousemove = document.onmouseup = null;
						if(target.releaseCapture){
							target.releaseCapture();   
						}					
					};
				}	
				return false;	
			}
		}
		move(oUl1,1);
		move(oUl2,-1);		
	};