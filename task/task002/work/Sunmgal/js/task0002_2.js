window.onload = function(){
	var oInp = document.getElementsByTagName("input");
	var oDiv = document.getElementById("content");
	var re = /^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\-)([0][1-9]|[1][0-2])(\-)([0-2][1-9]|[3][0-1])$/;		
	oInp[1].onclick = function(){	
		var Value = oInp[0].value; 
		var iNew = null;	
		var t = 0;	
		var str = '';
		var timer = null;
		//判断输入的日期格式XXXX-YY-ZZ
		if(Value.match(re)){
			var date = Value.split('-');
			NewYear = date[0];
			NewMonth = date[1];
			NewDate = date[2];
		}else{
			alert("您的输入格式不正确");
		}
 
		//将value里的年月日赋给新日期对象
		iNew = new Date(NewYear,NewMonth-1,NewDate,0,0,0);

		//清除上一次开的定时器	
		clearInterval(timer);
		
		//开启定时器
		timer = setInterval(function(){
			var iNow = new Date();
			var t = Math.floor((iNew - iNow)/1000);
			if(t>0){
				str = '距离' + NewYear + '年' + NewMonth + '月' + NewDate + '日还有' +  Math.floor(t/86400/30/12) + '年' + Math.floor(t/86400/30)  + '月'+ Math.floor(t/86400)+ '天' + Math.floor(t%86400/3600)+'时'+toTwo(Math.floor(t%86400%3600/60))+'分'+toTwo(t%60)+'秒';
				oDiv.innerHTML = str;
			}else{
				clearInterval(timer);
			}				
		},1000)

	};

	//判断分秒为个位数时，给分秒前加一个零
	function toTwo(n){
		return n < 10 ?  '0' + n : '' + n;
	}

};