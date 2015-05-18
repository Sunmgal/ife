
(function(){
	// ----------   所有任务 -------------
	//给所有任务加展开
	var onOff = true;	
	$('alltitle').onclick = function(){	
		if(onOff){
			$('all-list').style.display = "block";
			onOff = false;
		}else{
			$('all-list').style.display = "none";
			onOff = true;				
		}
	};
 

	// 所有任务删除功能及hover
	onTarget($('all-list'),"alltask","mouseover",function(){
		this.style.background = "#fff";
		this.onmouseout = function(){
			this.children[1].style.opacity = 0;				
		}						
	})
	


	// ----------   分类列表 -------------
	// 给分类列表标题加展开
	$('sorttitle').onclick = function(){
		if(onOff){
			$('sidebarList').style.display = "block";
			onOff = false;
		}else{
			$('sidebarList').style.display = "none";
			onOff = true;				
		} 
	}

	//分类列表移入移出效果
	onTarget($('sidebarList'),"title","mouseover",function(){
		//this为span
			this.children[1].style.opacity = 1;
		this.onmouseout = function(){
			this.children[1].style.opacity = 0; 				
		}					
	})


	//分类列表删除
	onTarget($('sidebarList'),"xclose","mouseover",function(){
		var This = this;
		// this.parentNode.style.background = "#fff";
		this.style.opacity = 1;
		this.onmouseout = function(){
			this.style.opacity = 0;
			// this.parentNode.style.background = "";
		}; 
		this.onclick = function(){
			if(confirm("您确定要删除该分类吗?")){
				$('sidebarList').removeChild(This.parentNode.parentNode);
			}else{
				return false;
			}
		};
	})		 	



	//给左侧列表增加子项
	onTarget($('sidebarList'),"title","click",function(){
		var This = this;
		// title的样式变化
		for(var i=0;i<$('sidebarList').children.length;i++){
			$('sidebarList').children[i].children[0].style.background = "";
		}
		this.style.background = "#fff";

		//在第二列表中的显示
		for(var i=0;i<$('alltasklist').children.length;i++){
			$('alltasklist').children[i].style.display = "none";
			if($('alltasklist').children[i].className == this.id){
				$('alltasklist').children[i].style.display = "block";
			}
			
			if($('alltasklist').children[i].getAttribute('status') == "0"){
  				 var arr =  $('alltasklist').children[i];
				 $('undotask').appendChild($('alltasklist').children[i]);
			}
		}


		$('addbtn').onclick = function(){
			$('addTask').style.display = "block";
			$('taskconfirm').onclick = function(){
				var titlename = $('tasktitle').value;
				var date = $('taskdate').value;
				var detailValue = $('taskdetail').value;
				var arr = detailValue.split("");				
				var list = document.createElement("li");		
				
				//将子项加到第一个列表的标题下 
				list.innerHTML = "<li class='listli' status='0'><img src='img/pic6.png' />" + titlename +"<img src='img/pic2.png' class='xxclose' /></li>";
				This.nextElementSibling.appendChild(list);

				var alltaskli = document.createElement('li');
				alltaskli.className = This.id;
				alltaskli.setAttribute("status","0");
				alltaskli.innerHTML = "<span>"+ date + "</span><ul><li>"+ titlename +"</li></ul>";

				$('alltasklist').appendChild(alltaskli);				

				//表单判断	
				if(detailValue == ""){
					$('detailnote').innerHTML = "您并没有输入内容";
					$('detailnote').style.display = "block";			
				}else if(arr.length>100){
					$('detailnote').innerHTML = "您输入字数已经超过100";
					$('detailnote').style.display = "block";
				}else if($('titlenote').style.display == "block"){
					alert("您的标题输入有问题");
				}else if($('datenote').style.display == "block"){
					alert("您的日期输入有问题");
				}else{
					alert("添加成功！");
					clearInfo();
				}
					};
				}

	})
	
	

	//分类列表展开
	onTarget($('sidebarList'),"title","click",function(){
		//var onOff = true (x)
		//bug nextElement兼容问题
		if(this.nextElementSibling){
			if(onOff){
				this.nextElementSibling.style.display = "block";		
				onOff = false;				
			}else{			
				this.nextElementSibling.style.display = "none";	
				onOff = true;			
			}
		}				
	})	
 

	//分类列表子项移入移出效果
	var listLi = $('sidebarList').children;
	for(var i=0;i<listLi.length;i++){
	onTarget(listLi[i],"listli","mouseover",function(){
		this.style.background = "#fff";
		this.children[1].style.opacity = 1;
		this.onmouseout = function(){
			this.style.background = ""; 
			this.children[1].style.opacity = 0;	 						
		}					
	}) 			

	onTarget(listLi[i],"xxclose","mouseover",function(){
		this.style.opacity = 1;
		this.parentNode.style.background = "#fff";
			this.onmouseout = function(){
			this.style.opacity = 0;	
			this.parentNode.style.background = "";							
			}					
		}) 	 
	}

	//分类列表子项删除 
	for(var i=0;i<listLi.length;i++){		
		if(listLi[i].children[1]){
			onTarget(listLi[i],"xxclose","click",function(){
				if(confirm("您确定要删除该任务吗？")){
				 	this.parentNode.parentNode.removeChild(this.parentNode);
				}	
			}) 		
		}			 
	}	 	

	// 增加分类
	$('addclass').onclick = function(){		
		$('addbox').style.display = "block";
		//确认	  		
		$('confirm').onclick = function(){
			var value = $('addtext').value;
			if(value ==""){
				alert("请输入类名");
			}else{
				$('addbox').style.display = "none";
				var aLi = document.createElement('li');
				aLi.className = "lilili";
				aLi.innerHTML = "<span class='title' id='title" + $('sidebarList').children.length + "'><img src='img/pic1.png'/>" + trim(value) +"(" + this.children.length + ")" + "<img src='img/pic2.png' class='xclose' /></span><ul></ul>"
				$('sidebarList').appendChild(aLi);
			}
		};

		$('reset').onclick = function(){
			$('addbox').style.display = "none";
		};
		//bug
		//text框无法清空
	};


	// ----------   middle -------------
	// middle选项卡 
	var tabs = $('tabs').getElementsByTagName("li");
	var doList = getElementsByClassName($('list'),'li',"do-list");
	for(var i=0;i<tabs.length;i++){
		tabs[i].index = i;	
		tabs[i].onclick = function(){
		// console.log(tabs[this.index].index);
			for(var i=0;i<tabs.length;i++){
				tabs[i].className = "";
				doList[i].style.display = "none";
			}
			this.className = "showTab";
			doList[tabs[this.index].index].style.display = "block";
		};
	}


	// ----------  right  -------------
	//addtask-box  


 
	function clearInfo(){
		$('addTask').style.display = "none";		
		$('tasktitle').value = "";	
		$('taskdate').value = "";	
		$('taskdetail').value = "";			
		$('titlenote').style.display = "none"; 	
		$('datenote').style.display = "none"; 	 				
		$('detailnote').style.display = "none;";
	}

	$('taskcancle').onclick = function(){
		clearInfo();
	};


	//表单验证 	
 	$('tasktitle').onblur = function(){
 		var titleValue = $('tasktitle').value;	 		
  		var arr=titleValue.split("");		 
		if(titleValue ==""){
 			$('titlenote').innerHTML = "标题为空";
 			$('titlenote').style.display = "block";
 		}else if(arr.length > 10){
 			$('titlenote').innerHTML = "您输入的标题字数超过10";
 			$('titlenote').style.display = "block";
 		}else{
 			$('titlenote').style.display = "none"; 	
 		} 
 	};

	$('taskdate').onblur = function(){
		var dateValue = $('taskdate').value;
		var re = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
		if(dateValue == ""){
			$('datenote').innerHTML = "您输入的日期为空";
 			$('datenote').style.display = "block";
		}else if(re.test(dateValue)){
 			$('datenote').style.display = "none"; 	
		}else{
 			$('datenote').innerHTML = "您输入的月份格式不正确";
 			$('datenote').style.display = "block";
		}
	}
 
})();
