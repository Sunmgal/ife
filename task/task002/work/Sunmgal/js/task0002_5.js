window.onload = function(){	
		var oUl1 = document.getElementById("ul1");
		var oUl2 = document.getElementById("ul2");
		var aLi1 = oUl1.getElementsByTagName("li")[0];
		var aLi2 = oUl2.getElementsByTagName("li")[0];
 
 		function move(obj,i){
			obj.onmousedown = function(ev){
				var ev = ev || event;
				var X = ev.clientX - obj.offsetLeft;
				var Y = ev.clientY - obj.offsetTop;

				//在非标准浏览器下设置全局捕获
				if(obj.setCapture){
					obj.setCapture();   
				}

				document.onmousemove = function(ev){ 
					var ev = ev || event;
					//设置obj移动的范围
					var L = ev.clientX - X;
					var T = ev.clientY - Y 
					if(L*i<0){
						L = 0;
					}else if(L*i > 60){
						L = i*(oUl2.clientLeft + oUl2.offsetWidth + 60);
					}

					if(T<0){
						T = 0;
					}else if(T>oUl2.offsetHeight){
						T = oUl2.offsetHeight - obj.offsetHeight;
					} 


					obj.style.left = L + 'px';
					obj.style.top = T + 'px';	
				};

				document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null;
					if(obj.releaseCapture){
						obj.releaseCapture();   
					}					
				};

				return false;	
			}
		}
		move(aLi1,1);
		move(aLi2,-1);		
	};