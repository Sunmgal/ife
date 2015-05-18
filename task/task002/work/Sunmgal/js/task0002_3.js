	window.onload = function(){
		var oDiv = document.getElementById("div");
		var oUl = document.getElementById("oul");	
		var aLi = oUl.getElementsByTagName("li");
		var oP = oDiv.getElementsByTagName("p")[0];
		var aSpan = oP.getElementsByTagName("span");		
		var iLen = aLi.length;		
		var iWidth = aLi[0].offsetWidth;

		var timer = null;
 		var i=0;

		oUl.style.width = iLen * iWidth + 'px';  //ul的宽度等于所有li长度之和
 
 		for(var i=0;i<aSpan.length;i++){ 	
 			aSpan[i].index = i;		
 			aSpan[i].onclick = function(){		//小按钮点击事件	
 				for(var i=0;i<aSpan.length;i++){
 					aSpan[i].className = "";
 				}
 				this.className = "current";

 				startMove(oUl,{					//开启运动函数
 					left: -this.index * iWidth
 				});

 			}
 		}

 		clearInterval(timer);   //清除上一个定时器

 		timer = setInterval(function(){
 			i++;
			startMove(oUl,{
				left: -(i%5)* iWidth
			}); 
 			for(var j=0;j<aSpan.length;j++){
 				aSpan[j].className = "";
 			}	
			aSpan[i%5].className = "current";
 		},2000)


		function startMove(obj, json, fn) {
			clearInterval(obj.iTimer);
			var iCur = 0;
			var iSpeed = 0;			
			obj.iTimer = setInterval(function() {	
				var iBtn = true;
				for ( var attr in json ) {
									
					var iTarget = json[attr];
					
					if (attr == 'opacity') {
						iCur = Math.round(css( obj, 'opacity' ) * 100);
					} else {
						iCur = parseInt(css(obj, attr));
					}
					
					iSpeed = ( iTarget - iCur ) / 8;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					
					if (iCur != iTarget) {
						iBtn = false;
						if (attr == 'opacity') {
							obj.style.opacity = (iCur + iSpeed) / 100;
							obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
						} else {
							obj.style[attr] = iCur + iSpeed + 'px';
						}
					}
					
				}
				
				if (iBtn) {
					clearInterval(obj.iTimer);
					fn && fn.call(obj);
				}
				
			}, 30);
		}

		function css(obj, attr) {
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj, false)[attr];
			}
		}


	};