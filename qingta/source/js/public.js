
var ADMIN_CONFIG = {
	"homePage": "commonDataAnalysis.html",
	"contentSelector": "#rightContent",
};
var projectUnits=[];
init();
function init(){
	eventBind();
	matchLeft();
	function changeHeight(){
		var myheight=$(window).height();
		$(".leftBox").css("min-height",myheight);
		// var myheight1=$(".leftList").height();
		// var myheight2=$(".enterBox").css("height");
		// var decHeight=myheight1-parseInt(myheight2)-80;
		// $(".tableContent").css("min-height",decHeight);
	}
	window.onload=function(){  
	  	window.onresize = changeHeight;  
	  	changeHeight();  
	}
	function matchLeft(){
		var search=window.location.href;
		var	mysearch=search.split("?");
		var search2=mysearch[1].split("=");
		var myid=search2[1];
		var topid,secondid;
		if(myid>=100){
			topid=Math.floor(myid/10);
			secondid=myid%100%10;
		}
		else{
			topid=Math.floor(myid/10);
			secondid=myid%10;
		}
		for (var i = 0,len=$(".downBtn").length;i<len;i++) {
			var matchid=$(".downBtn").eq(i).attr("data-id");
			if(matchid==topid){
				$(".downBtn").eq(i).addClass("btnColor");
				$(".downBtn").eq(i).next(".downContent").addClass('show');
				$(".downBtn").eq(i).next(".downContent").find(".linka").eq(secondid-1).addClass("activeClass");
			}
		}
	}

	// $(".linka").bind("click",function(){
	// 	var myhash=$(this).attr("href");
	// 	var id=$(this).attr("data-id");
	// 	window.location.hash=myhash+"?id="+id;
	// 	window.location.hash=myhash;
	// })
}
function eventBind(){
	$(window).bind('load hashchange', loadContent);
	$(".downBtn").bind("click",function(){
		var showflag=$(this).next(".downContent").attr("class");
		var array=showflag.split(" ");
		if(array.length>1){
			$(this).parent().prev().removeClass("white");
			$(this).next(".downContent").removeClass("show");
			$(this).removeClass("btnColor");
			$(this).children(".downflag").removeClass("fa-minus");
		}
		else{
			$(this).parent().prev().addClass("white");
			$(this).next(".downContent").addClass("show");
			$(this).parents(".section").siblings('.section').find(".downContent").removeClass("show");
			$(this).parents(".section").siblings('.section').find(".downBtn").removeClass("btnColor");
			$(this).parents(".section").siblings('.section').find(".downflag").removeClass("fa-minus");
			$(this).parents(".section").siblings('.section').find(".linka").removeClass("activeClass");
			$(this).parents(".section").siblings('.section').find(".leftImg").removeClass("white");
			$(this).addClass("btnColor");
			$(this).children(".downflag").addClass("fa-minus");
		}
	})
	$(".section").on("click",".linka",function(){
		$(this).addClass("activeClass").siblings().removeClass("activeClass");
	})
	$(".leftBox").on("click",".leftImg",function(){
		$(this).addClass("white");
		$(this).parent(".section").siblings('.section').find(".downContent").removeClass("show");
		$(this).parent(".section").siblings('.section').find(".leftImg").removeClass("white");
		$(this).next().children('.downBtn').addClass('btnColor');
		$(this).next().children('.downContent').addClass('show');
		$(this).parent(".section").siblings('.section').find(".downBtn").removeClass("btnColor");
		$(this).parent(".section").siblings('.section').find(".linka").removeClass("activeClass");
	})
	$(".rightBox").on("click",".leftImg",function(){
		var showflag1=$(this).parents(".rightBox").attr("class");
		var array=showflag1.split(" ");
		if(array.length>1){
			$(".leftBox").removeClass("small");
			$(".rightBox").removeClass("rightnew");
		}
		else{
			$(".leftBox").addClass("small");
			$(".rightBox").addClass("rightnew");
		}		
	})
	$(".changeBarBox").on("click",".changeButton",function(){
		$(this).addClass("green").siblings().removeClass("green");
	})
	$(".arrowDown").bind("click",function(){
		var className=$(this).siblings('.lookMore').attr("class");
		var txt=$(this).parent("td").children(".txt").text();
		var array=className.split(" ");
		if(array.length>1){
			$(this).siblings('.lookMore').removeClass("showMore");
		}
		else{
			$(this).siblings('.lookMore').addClass("showMore");
			$(this).siblings('.lookMore').children("span").text(txt);
		}
	})
}
function loadContent() {
	$(document).unbind("mousedown");
	$(document).unbind("mouseover");
    var hash = window.location.hash;
    if (hash == "") {
        hash = "#/"+ADMIN_CONFIG.homePage;
    }
    $(ADMIN_CONFIG.contentSelector).load(hash.split("/")[1], function(){
    });
}
function popAlertBox(selector){//弹出窗口，居中function。以前在弹窗上绑定的一些事件
	var height = $(window).height() - $(selector).height();
	var width = $(window).width() - $(selector).width();
	$(selector).css({
		"top": height/2+"px",
		"left":width/2+"px"
	});
	$(selector).show();

}
function dragBox(selector){//弹窗窗口的拖拽方法
	$(document).unbind("mousemove,mouseup");
	var myleft,mytop;
	var ismousedown=false;
	var downX,downY;
	myleft=$(selector).position().left;
	mytop=$(selector).position().top;
	$(selector).bind("mousedown",function(e){
		ismousedown=true;
		myleft=$(selector).position().left;
		mytop=$(selector).position().top;
		downX=e.pageX;
		downY=e.pageY;
	})
	$(document).bind("mousemove",function(e){
			if(ismousedown){
				_mytop=e.pageY-downY + mytop;
				_myleft=e.pageX-downX + myleft;
				$(selector).css("left",_myleft);
				$(selector).css("top",_mytop);
			}
	});
	$(document).bind("mouseup",function(){
		ismousedown=false;
		mytop=$(selector).position().top;
		myleft=$(selector).position().left;
	})
}
function dragBoxUnitsChoose(selector){
	// var array=[];
	$(selector).on("click",".cancelBtn",function(){
		$(".mask").hide();
		$(selector).hide();
	})
	$(".leftColumnProvinces").on("click",".provinceItems",function(){
		var flag=$(this).find(".provinces").prop("checked");
		if(flag){
			$(this).children().find(".commonCollege").prop("checked",true);
		}
		else{
			$(this).children().find(".commonCollege").prop("checked",false);
		}
	})
	$(".leftColumnProvinces").on("click",".commonCollege",function(e){
		e.stopPropagation();
		var myinput=$(this).parents(".provinceItems").find(".commonCollege");
		var len=myinput.length;
		var trueArray=[];
		for(i=0;i<len;i++){
			var getTrue=myinput.eq(i).prop("checked");
			if(getTrue){
				trueArray.length++;
			}
		}
		if(trueArray.length==len){
			$(this).parents().prev().prop("checked",true);
		}
		else{
			$(this).parents().prev().prop("checked",false);
		}
	})
	$(".moveRight").bind("click",function(){
		getTreeNodes();
		for (var i =0;i<checkedArray.length;i++ ) {
			var hasSame=false;
			var findLi=$(".rightColumn").find(".chooseAlreadyList").children("li");
			for (var k=0;k<findLi.length;k++) {
				var txt=findLi.eq(k).text();
				if(txt==checkedArray[i]){
					hasSame = true;
                	break;
				}
			}
			if(!hasSame){
	           	var liItems=$('<li class="chooseItems"></li>');
				liItems.append(checkedArray[i]);
				$(".rightColumn").find(".chooseAlreadyList").append(liItems);
	        }
		}
	})
	$(".rightColumn .chooseAlreadyList").delegate('.chooseItems', 'click', function(event) {
		var txt=$(this).text();
		var className=$(this).attr("class");
		var array=className.split(" ");
		if(array.length>1){
			$(this).removeClass("addSomeColor");
		}
		else{
			$(this).addClass("addSomeColor");
		}
	})
	$(".moveLeft").bind("click",function(){
		var toLeftUnits=[];
		toLeftUnits.length=0;
		var rightChoosen=$(".rightColumn").find(".chooseAlreadyList").children('.chooseItems');
		for (var i=0,len=rightChoosen.length;i<len;i++) {
			var className=rightChoosen.eq(i).attr("class");
			var myarray=className.split(" ");
			if(myarray.length>1){
				var txt1=rightChoosen.eq(i).text();
				toLeftUnits.push(txt1);
				rightChoosen.eq(i).remove();
			}
		}
		for (var m=0;m<_array.length;m++) {
			for (var j =0; j<toLeftUnits.length;j++) {
				if(_array[m].name==toLeftUnits[j]){
					_array[m].chkDisabled=false;
					_array[m].checked=false;
					_array.splice(m,1);
					cancelCheckedState();
				}
			}
		}
		checkedArray.length=0;
		for (var n=0;n<_array.length;n++) {
			if(_array[n].isParent){
			}
			else{
				checkedArray.push(_array[n].name);
			}
		}
		// var mylen=$(".commonCollege:checked").length;
		// // var mylen=array.length;
		// for (var k=0;k<mylen;k++) {
		// 	var matchtxt=$(".commonCollege:checked").eq(k).prev().text();
		// 	for (var j =0; j<toLeftUnits.length;j++) {
		// 		if(matchtxt==toLeftUnits[j]){
		// 			$(".commonCollege:checked").eq(k).prop("checked",false).removeAttr('disabled');
		// 			$(".commonCollege:checked").eq(k).parents().prev().removeAttr("disabled");
		// 		}
		// 	}
		// }
	})
	$(selector).on("click",".forSure",function(){
		$(".mask").hide();
		$(selector).hide();
		var chooseAlready=$(".unitsEnter").val().split(",");
		var mylen=$(".chooseAlreadyList").children('.chooseItems').length;
		var _len=chooseAlready.length;
		var hasSame=false;
		for (var i=0;i<mylen;i++) {
			var pushItem=$(".chooseAlreadyList").children('.chooseItems').eq(i).text();
			for (var j=0;j<_len;j++) {
				var txt=chooseAlready[j];
				if(txt==pushItem){
					hasSame = true;
                 	break;
				}
			}
			if(!hasSame){
				projectUnits.push(pushItem);
			}
		}
		$(".unitsEnter").val(projectUnits);
	})
}
function dragBoxSortsChoose(selector){
	$(selector).on("click",".cancelBtn",function(){
		$(".mask").hide();
		$(selector).hide();
	})
	$(selector).on("click",".forConsole",function(){
		$(this).parents('.bottomBtn').siblings().children('.infoTable2').children("tbody").children("tr").removeClass('beChoosen');
	})
	$(".unitsChoose .infoTable2 tbody").on("click","tr",function(){
		$(this).addClass("beChoosen").siblings("tr").removeClass("beChoosen");
	})
	$(".unitsChoose .infoTable2 tbody").on("dblclick","tr",function(){
		// $(this).addClass("beChoosen").siblings("tr").removeClass("beChoosen");
		$(this).parents(".unitsChoose").hide();
		$(".mask").hide();
		var txt=$(this).children("td").last().text();
		$(".projectType").val(txt);
		if($(".projectClass").length){
			$.post('/LandHSStypetoclass', {"sub": txt}, function(data, textStatus, xhr) {
				$(".projectClass").empty();
				var state=data.state;
				var result=data.result;
				if(state==1){
					for (var i=0;i<result.length;i++) {
						var newopt=$('<option></option>');
						if (result[i]) {
							newopt.text(result[i]);
							$(".projectClass").append(newopt);
						}
					}
				} 
			});
		}
	})
	$(selector).on("click",".forSure",function(){
		$(selector).hide();
		$(".mask").hide();
		var txt;
		var mytr=$(this).parents('.bottomBtn').siblings().children('.infoTable2').children("tbody").children("tr");
		for(i=0;i<mytr.length;i++){
			var className=mytr.eq(i).attr("class");
			if(className=="beChoosen"){
				txt=mytr.eq(i).children("td").last().text();
				// mytr.eq(i).removeClass("beChoosen");
			}
		}
		if(txt!=""){
			$(".projectType").val(txt);
			if($(".projectClass").length){
				$.post('/LandHSStypetoclass', {"sub": txt}, function(data, textStatus, xhr) {
					$(".projectClass").empty();
					var state=data.state;
					var result=data.result;
					if(state==1){
						for (var i=0;i<result.length;i++) {
							var newopt=$('<option></option>');
							if (result[i]) {
								newopt.text(result[i]);
								$(".projectClass").append(newopt);
							}
						}
					} 
				});
			}
		}
	})

}
function topBarControl(){
	$(".resetBtn").bind("click",function(){
		if(confirm("你确定重置所有查询条件？")){
			$(this).parents(".topTable").find("input").val("");
		}	
	})
	$(".changeBarContainer").on("click",".hideBtn",function(){
		var className=$(this).parent(".changeBarContainer").next().attr("class");
		var array=className.split(" ");
		if(array.length>1){
			$(this).parent(".changeBarContainer").next().removeClass('hideBox');
			$(this).text("隐藏查询条件");
		}
		else{
			$(this).parent(".changeBarContainer").next().addClass('hideBox');
			$(this).text("显示查询条件");
		}	
	})
	var myheight1=$(window).height();
	var myheight2=$(".enterBox").css("height");
	var decHeight=parseInt(myheight1)-parseInt(myheight2)-80;
	$(".tableContent").css("min-height",decHeight);
}
var setting = {
		check:{
			chkStyle:"checkbox",
			enable:true,
			chkboxType:{ "Y": "ps", "N": "ps" }
		},
		data:{
			key:{
				children:"children",
				name:"name"
			}
		},
	};
var zNodes=[];
var checkedArray=[];
var _array=[];
function getUnits(){
    var ajax =$.get('/LandEntity', function(data) {
		var result=data.result;
		for (var i=0,len=result.length;i<len;i++ ) {
			var obj={};
			var array=[];
			for (var j=0,mylen=result[i].length;j<mylen;j++) {
				if(j==0){
					obj.name=result[i][0];
				}
				else{
					var obj2=new Object();
					obj2.name=result[i][j];
					array.push(obj2);
					obj.children=array;
				}
			}
			zNodes.push(obj);
		}
	// for (var i=0;i<zNodes.length;i++) {
	// 	zNodes[i].icon="../source/zTree/css/zTreeStyle/img/diy/1_open.png";
	// 	$.fn.zTree.init($("#tree"), setting, zNodes);
	// }
	// var rootObj=$.fn.zTree.getZTreeObj("tree");
	// var rootNodes=$.fn.zTree.getZTreeObj("tree").getNodes();
	// var array1=rootObj.transformToArray(rootNodes);
	// for (var i=0;i<array1.length;i++) {
	// 	array1[i].icon="../source/zTree/css/zTreeStyle/img/diy/1_open.png";
	// }
	// rootObj.refresh();
	// getSelect();
	// function getSelect(){
	// }
	// for (var i=0;i<result.length;i++ ) {
		// 	var insertProvince=$('<li class="provinceItems">'+
		// 						// '<label for="province2">'+
		// 							'<span></span>'+
		// 							'<input type="checkbox" class="provinces">'+
		// 						// '</label>'+
		// 						'<ul class="collegeItems">'+
		// 						'</ul>'+
		// 					'</li>');
			
		// 	for (var j=0;j<result[i].length;j++) {
		// 		if(j==0){
		// 			insertProvince.children('span').text(result[i][0]);
		// 		}
		// 		else{
		// 			var insertItem=$('<li>'+
		// 						// '<label for="college3">'+
		// 							'<span></span>'+
		// 							'<input type="checkbox" class="commonCollege">'+
		// 						// '</label>'+
		// 					'</li>');
		// 			insertItem.children('span').text(result[i][j]);
		// 			insertProvince.children('.collegeItems').append(insertItem);
		// 		}
		// 	}
		// 	$("#tree").append(insertProvince);
	// }//最初版本
	});
    return ajax;
}
function getTreeNodes(){
	var rootObj=$.fn.zTree.getZTreeObj("tree");
	var hasSame=false;
	checkedArray.length=0;
	if(_array.length){
		var _array1=rootObj.getCheckedNodes();
		var _len1=_array1.length;
		for (var k=1;k<_len1;k++) {
			_array.push(_array1[k]);
		}
	}
	else{
		_array=rootObj.getCheckedNodes();
	}
	for (var i=0;i<_array.length;i++) {
		if(_array[i].isParent){
		}
		else{
			// for (var j=0;j<checkedArray.length;j++) {
			// 	if(_array[i].name==checkedArray[j]){
			// 		hasSame=true;
			// 		break;
			// 	}
			// }
			// if(!hasSame){
				checkedArray.push(_array[i].name);
				_array[i].chkDisabled=true;
				rootObj.refresh();
			// }
		}
	}
}
function cancelCheckedState(){
	var rootObj=$.fn.zTree.getZTreeObj("tree");
	rootObj.refresh();
}
function madeNowrapText(text){
	return "<span class='nowrap'>"+text+"<span>";
}
function madeTwoLineText(text){
	return '<div class="showMoreContent">'+
						'<span class="twoLine">'+text+'</span>'+
						'<div class="lookMore">'+
							'<span></span>'+
							'<i class="rectangle"></i>'+
						'</div>'+
					'</div>';
	// return "<span class='twoLine'>"+text+"<span>";
}
function getPages(index){
	var tr=$(".infoTable1 tbody tr");
	tr.hide();
	for (var i=20*index;i<20*(index+1);i++) {
		tr.eq(i).show();
	}
}
$("body").on("click",".showMoreContent",function(){
	$(this).find('.lookMore').children("span").text("");
	var className=$(this).find('.lookMore').attr("class");
	var txt=$(this).find(".twoLine").text();
	var array=className.split(" ");
	if(array.length>1){
		$(this).find('.lookMore').removeClass("showMore");
	}
	else{
		$(".lookMore").removeClass("showMore");
		$(this).find('.lookMore').addClass("showMore");

		$(this).find('.lookMore').children("span").text(txt);
	}
})