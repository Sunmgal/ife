window.onload = function(){
	var oInp = document.getElementsByTagName("input")[0];
	var oText = document.getElementById("text");
	var oBox = document.getElementById("box");
	var oShow = document.getElementById("show");		
	var oLikes = document.getElementById("likes");
	oText.onfocus = function(){
		var Value = oText.value;
		arr = Value.split(/[，,、；\s\t\n]/);
		if(arr.length>=0 && arr.length<=11)
		{
			oText.readOnly = "";
		}
	}
	oText.onkeyup = function(){
		var Value = oText.value; 
		if(Value !==''){	
			arr = Value.split(/[，,、；\s\t\n]/);  //用split()方法与正则搭配，可实现多字符分割
			if(arr.length>10){
				oShow.style.display = "block";
				oText.readOnly = true;
			}else{
				oShow.style.display = "none";
				oText.readOnly = "";
			}
		}else{
			alert("不能为空");
		}
	}


	oInp.onclick = function(){

		var Value = oText.value; 
		if(Value ==''){			
			alert("请输入内容");			
		}else{
			arr = Value.split(/[，,、；\s\t\n]/);   
			for(var i=0;i<arr.length;i++){
				for(var j=i+1;j<arr.length;j++){
					if(arr[i] == arr[j]){
						arr.splice(j,1);
						j--;
					}
				}
			}

			oLikes.innerHTML = ""; //将上一次生成的checkbox置空

			for(var i=0;i<arr.length;i++){

				var oinput = document.createElement("input");
				var oLable = document.createElement("label");
				oinput.type = "checkbox";
				oLable.innerHTML = arr[i];
				oLikes.appendChild(oinput);
				oLikes.appendChild(oLable);					
			}
			}	
	};
};