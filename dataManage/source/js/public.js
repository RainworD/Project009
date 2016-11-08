var origin_fn_init = $.fn.zTree.init
// var userid;
// var userName;
// var usertype;
var userlevel;
// var schoolCode;
var entity;
$.fn.zTree.init = function($el, options, data){
	var level = 1
	var children = data[0].children
	while(children) {
		children = children[0] && children[0].children
		level++
	}
	$el.addClass('ztree' + level)
	return origin_fn_init($el, options, data)
}

var ADMIN_CONFIG = {
	"homePage": "home.html",
	"contentSelector": "#rightContent"
};
$(document).bind("click",function(){
	$(".showElse").removeClass('showBtn');
	$(".lookMore").removeClass('showMore');
	// $(".showElse").prev("input").val("");
})
init();
var rootObj;
var codeObj;
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
		var	mysearch=search.split("#/");
		var search2=mysearch?mysearch[1]:"";
		var result=search2?search2.indexOf('Detail'):-1;
		// var result=search2?search2.indexOf('Detail'):1;
		var result_val;
		if(result!=-1){
			var result_new=search2.split("Detail");
			result_val=result_new[0]+'.html';
		}
		else{
			result_val=search2;
		}
		var itemLen=$(".comparea").length;
		for (var i=0;i<itemLen;i++) {
			var compareVal=$(".comparea").eq(i).attr("href");
			var compare_array=compareVal.split("/");
			var compare_val=compare_array[1];
			if(result_val==compare_val){
				var judgeFlag=$(".comparea").eq(i).parent(".downBtn").length;
				if(judgeFlag){
					$(".comparea").eq(i).parent(".downBtn").addClass("btnColor");
				}
				else{
					$(".comparea").eq(i).addClass("activeClass");
					$(".comparea").eq(i).parents('.downContent').siblings(".downBtn").addClass("btnColor");
					$(".comparea").eq(i).parents('.downContent').addClass('show');
					// $(".comparea").eq(i).parents('downContent').siblings("downBtn").next(".downContent").find(".linka").eq(i).addClass("activeClass");
					$(".comparea").eq(i).parents('.downContent').siblings(".downBtn").children(".downflag").addClass("fa-minus");
					$(".comparea").eq(i).parents('.sectionList').siblings(".leftImg").addClass("white");
				}
			}
		};
	}
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
			$(".leftBox").find(".rightBelong").show();
		}
		else{
			$(".leftBox").addClass("small");
			$(".leftBox").find(".rightBelong").hide();
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
var setting = {
		check:{
			chkStyle:"checkbox",
			enable:true,
			chkboxType:{ "Y": "ps", "N": "ps" }
		},
		data:{
			key:{
				children:"children",
				name:"name",
				id:"id"
			}
		},
	    view: {
	      showIcon: false,
	      showLine: false
	    }
	};
function getUnits(finalResults){
	$.when(ajaxUnit()).done(function(data){
		var result=data.result;
		finalResults=result;
		judgeUnits(result);
	})
}
var objnew={};
var finalResults=objnew.finalResults;
var objCode={};
var baseTree=objCode.baseTree;
function judgeUnits(result){
	var zNodes=result;
	$.fn.zTree.init($("#tree"), setting, zNodes);
	rootObj=$.fn.zTree.getZTreeObj("tree");
	if(rootObj){
		rootObj.expandNode(rootObj.getNodes()[0], true);
	}
}

function getCodes(baseTree){
	$.when(ajaxTree()).done(function(data){
		baseTree=data.data;
		judgeCodes(baseTree);
	})
}
function judgeCodes(result){
	codeObj=$.fn.zTree.init($("#fund-parent-tree"), {
		check:{
			chkStyle:"checkbox",
			enable:true
		},
		view: {
			showIcon: false,
			showLine: false,
			addDiyDom: addDiyDom
		}
	}, result);
}
function addDiyDom(treeId, treeNode){
	var code_span = $('<span class="node_name node_name-code"></span>')
	code_span.attr('id', 'treeDemo_'+ treeId + '_code')
	  .text(treeNode.code)
	  .insertBefore($('#' + treeNode.tId + "_span"))
}
function loadContent() {
	$(document).unbind("mousedown.drag");
	$(document).unbind("mouseover");
    var hash = window.location.hash;
    if (hash == "") {
        hash = "#/"+ADMIN_CONFIG.homePage;
    }
    $(ADMIN_CONFIG.contentSelector).load(hash.split("/")[1], function(){
		// $(".logOutBtn").one("click",function(){
		// 	$.ajax({
		//         url: "/Logout",
		//         type: "POST",
		//         data:{
		//         },
		//         success:function(data){
		//         	if(data.state==1){
		//         		alert("退出登录成功！");
		//         		window.location.href="login.html";
		//         	}
		//         	else{
		//         		alert("网络异常！");
		//         	}
		//         }
		//     });
		// })
		
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
	$(document).unbind(".drag");
	var myleft,mytop;
	var ismousedown=false;
	var downX,downY;
	myleft=$(selector).position().left;
	mytop=$(selector).position().top;
	$(document).bind("mousedown.drag",function(e){
		var targ = $(e.target);
		var flag=targ.closest('.unitsContent');
		if(flag.length){
			ismousedown=false;
		}
		else{
			ismousedown=true;
			var _dom = $(selector).get(0)
			var offset = _dom.getBoundingClientRect()
			myleft=offset.left;
			mytop=offset.top;
			downX=e.clientX;
			downY=e.clientY;
		}
	})
	$(document).bind("mousemove.drag",function(e){
		if(ismousedown){
			_mytop=e.clientY-downY + mytop;
			_myleft=e.clientX-downX + myleft;
			$(selector).css("left",_myleft);
			$(selector).css("top",_mytop);
		}
	});
	$(document).bind("mouseup.drag",function(){
		ismousedown=false;
		mytop=$(selector).position().top;
		myleft=$(selector).position().left;
	})
}
$(document).on("click",".unitsChoose .cancelBtn,.unitsChoose .forConsole,.unitsChoose .forSure,.forSure_",function(){
	$(this).closest('.unitsChoose').hide();
	var hasUnitsChooseVisible = false;
	$.each($(".unitsChoose"),function(){
		if($(this).is(':visible')){
			hasUnitsChooseVisible = true;
		}
	});
	if(!hasUnitsChooseVisible){
		$(".mask").hide();
	}
	$(document).unbind(".drag");
})
function dragBoxUnitsChoose(selector){
	var checkedArray=[];
	var _array=[];
	$(selector).on("click",".forSure",function(){
		$(".mask").hide();
		$(selector).hide();
		$(this).addClass("getUnitsInfo");
		$(document).unbind(".drag");
		getTreeNodes_(rootObj,checkedArray,_array);
		var checkedLen=checkedArray.length;
		showName=[];
		projectUnits=[];
		if(checkedLen){
			for (var i=0;i<checkedLen;i++) {
				var pushItem=checkedArray[i].name;
				var pushid=checkedArray[i].id;
				projectUnits.push(pushid);
				showName.push(pushItem);
				$(".unitsEnter").val(showName[0]+'...');
			}
		}
		else{
			$(".unitsEnter").val("")
		}
	})
	$(selector).on("click",".forSure_",function(){
		$(this).addClass("getUnitsInfo");
		$(document).unbind(".drag");
		getTreeNodes_(rootObj,checkedArray,_array);
		var checkedLen=checkedArray.length;
		showName=[];
		projectUnits=[];
		if(checkedLen){
			for (var i=0;i<checkedLen;i++) {
				var pushItem=checkedArray[i].name;
				var pushid=checkedArray[i].id;
				projectUnits.push(pushid);
				showName.push(pushItem);
				$(".unitsEnter").val(showName[0]+'...');
			}
		}
		else{
			$(".unitsEnter").val("")
		}
	})
	$(selector).on("click",".search-box",function(){
		var search_str=$(this).siblings(".custom-input-box").find("input").val();
		var find = searchAndScrollToNode_(rootObj, search_str,"name");
		if (!find) {
			search_str = ""
		}
	})
}
function dragBoxCodesChoose(selector){
	var checkedArray_=[];
	var _array_=[];
	$(selector).on("click",".forSure",function(){
		$(".mask").hide();
		$(selector).hide();
		$(this).addClass("getUnitsInfo");
		getTreeNodes(codeObj,checkedArray_,_array_);
		var checkedLen_=checkedArray_.length;
		showName=[];
		projectCodes=[];
		if(checkedLen_){
			for (var i=0;i<checkedLen_;i++) {
				var pushItem=checkedArray_[i].name;
				var pushcode=checkedArray_[i].code;
				projectCodes.push(pushcode);
				showName.push(pushItem);
				$(".applyCode").val(showName[0]+'...');
			}
		}
		else{
			$(".applyCode").val("");
		}
	})
	$(selector).on("click",".search-box",function(){
		var search_str=$(this).siblings(".custom-input-box").find("input").val();
		var find = searchAndScrollToNode_(codeObj, search_str,"name");
		if (!find) {
			search_str = ""
		}
	})
}
function dragBoxSortsChoose(selector){
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
					var nullopt=$('<option selected="selected"></option>');
					$(".projectClass").append(nullopt);
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
						var nullopt=$('<option selected="selected"></option>');
						$(".projectClass").append(nullopt);
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
function resetAlertBox(treeObj){
	var nodes_=treeObj.getCheckedNodes();
	if(nodes_){
		for(var i=0;i<nodes_.length;i++){
			treeObj.checkNode(nodes_[i],false);
			treeObj.expandNode(nodes_[i],false);
		}
		treeObj.expandNode(treeObj.getNodes()[0], true)
	}
	treeObj.refresh();
}
function topBarControl(){
	$(".resetBtn").bind("click",function(){
		if(confirm("你确定重置所有查询条件？")){
			if(rootObj){
				resetAlertBox(rootObj);
			}
			if(codeObj){
				resetAlertBox(codeObj);
			}
			$(this).parents(".topTable").find("input").val("");
			var val_=$(this).parents(".topTable").find("select").children("option").first().val();
			$(this).parents(".topTable").find("select").val(val_);
			if(projectUnits){
				projectUnits.length=0;
			}
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
function getTreeNodes(treeObj,checkedArray,_array){
	var hasSame=false;
	checkedArray.length=0;
	if(_array.length){
		var _array1=treeObj.getCheckedNodes();
		var _len1=_array1.length;
		for (var k=1;k<_len1;k++) {
			_array.push(_array1[k]);
		}
	}
	else{
		_array=treeObj.getCheckedNodes();
	}
	for (var i=0;i<_array.length;i++) {
		var checkedObj={};
		// if(_array[i].isParent){
		// }
		// else{
			checkedObj.name=_array[i].name;
			checkedObj.id=_array[i].id;
			if(_array[i].code){
				checkedObj.code=_array[i].code;
			}
			checkedArray.push(checkedObj);
		// }
	}
	treeObj.refresh();
}
function getTreeNodes_(treeObj,checkedArray,_array){
	var hasSame=false;
	checkedArray.length=0;
	if(_array.length){
		var _array1=treeObj.getCheckedNodes();
		var _len1=_array1.length;
		for (var k=1;k<_len1;k++) {
			_array.push(_array1[k]);
		}
	}
	else{
		_array=treeObj.getCheckedNodes();
	}
	for (var i=0;i<_array.length;i++) {
		var checkedObj={};
		if(_array[i].isParent){
		}
		else{
			checkedObj.name=_array[i].name;
			checkedObj.id=_array[i].id;
			if(_array[i].code){
				checkedObj.code=_array[i].code;
			}
			checkedArray.push(checkedObj);
		}
	}
	treeObj.refresh();
}
function cancelCheckedState(){
	// var rootObj=$.fn.zTree.getZTreeObj("tree");
	rootObj.refresh();
}
function madeNowrapText(text){
	return "<span class='nowrap'>"+text+"</span>";
}
function madeOneLineText(text){
	return '<div class="showMoreContent">'+
						'<span class="oneLine">'+text+'</span>'+
						'<div class="lookMore">'+
							'<span></span>'+
							'<i class="rectangle"></i>'+
						'</div>'+
					'</div>';
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
function madeInputBox(text){
	var inputBox=$('<input class="editData">');
	inputBox.val(text);
	return inputBox;
}
function madeSchoolInputBox(text){
	var inputBox=$('<input class="editData schoolChoose"><ul class="showElse">'+						
	'</ul>');
	inputBox.val(text);
	return inputBox;
}
function madeSchool_InputBox(text){
	var inputBox=$('<input class="editData schoolChoose_"><ul class="showElse">'+						
	'</ul>');
	inputBox.val(text);
	return inputBox;
}
function madeAlertInputBox(text,array){
	// var array_=text.split(",");
	var inputBox=$('<input class="editData changeData" data-array='+text+'>');
	inputBox.val(text);
	return inputBox;
}
function madeAlertInputBox_(text,array){
	// var array_=text.split(",");
	var inputBox=$('<input class="editData changeData_" data-array='+text+'>');
	inputBox.val(text);
	return inputBox;
}
function madeNoInputBox(text){
	var jqy=$(text);
	var val=jqy.find("input").val();
	return val;
}
function getPages(index){
	var tr=$(".infoTable1 tbody tr");
	tr.hide();
	for (var i=20*index;i<20*(index+1);i++) {
		tr.eq(i).show();
	}
}
$("body").on("click",".showMoreContent",function(event){
	$(document).unbind(".drag");
	event.stopPropagation();
	$(this).find('.lookMore').children("span").text("");
	var className=$(this).find('.lookMore').attr("class");
	var txt1=$(this).find(".twoLine").text();
	var txt2=$(this).find(".oneLine").text();
	var array=className.split(" ");
	if(array.length>1){
		$(this).find('.lookMore').removeClass("showMore");
	}
	else{
		$(".lookMore").removeClass("showMore");
		$(this).find('.lookMore').addClass("showMore");
		if(txt1){
			$(this).find('.lookMore').children("span").text(txt1);
		}
		else{
			$(this).find('.lookMore').children("span").text(txt2);
		}
	}
})
function doForSearch(selector,url){
	$(selector).bind('input propertychange', function(event) {
		// $(selector).parents("td").find("input").val("");
		var sub=$(selector).val();
		getWholeList(sub,url,selector);
		$(selector).siblings('.showElse').addClass('showBtn'); 
		event.stopPropagation();
	})
	$(selector).siblings('.showElse').delegate('li', 'click', function() {
		$(selector).siblings('.showElse').removeClass("showBtn");
		var txt=$(this).text();
		$(selector).val(txt);
		getMatchCode(txt,selector);
	});
}
function getWholeList(sub,url,selector){
	$.post(url, {"sub": sub}, function(data, textStatus, xhr) {
		$(selector).siblings('.showElse').empty();
		var state=data.state;
		var result=data.result;
		if(result){
			if (state==1) {
				var len=result.length;
				for (var i=0;i<len;i++) {
					var mytd=$('<li></li>');
					mytd.text(result[i]);
					$(selector).siblings('.showElse').append(mytd);
				}

			}
			else{
				$(selector).siblings('.showElse').removeClass('showBtn');
			}
		}
		else{
			var data=data.data;
			if(state==0){				
				if(data){
					var len=data.length;
					for (var i=0;i<len;i++) {
						var mytd=$('<li></li>');
						mytd.text(data[i]);
						$(selector).siblings('.showElse').append(mytd);
					}
				}
			}
			else{
				$(selector).siblings('.showElse').removeClass('showBtn');
			}
		}
	});
}
function getMatchCode(txt,selector){
	var name;
	$.ajax({
		url:"/getEntityID",
		type:"POST",
		data:{
			"name":txt
		},
		success:function(data){
			if(data.state==1){
				name=data.result;
				var unEnter=$(selector).parents("td").siblings("td").find("input").attr("disabled");
				if(unEnter=="disabled"){
					$(selector).parents("td").siblings("td").find("input").val(name);
				}
			}
		}
	})
}
var dataBox;
var count;
function getDataBox(params,url){
	var newindex=1;
	dataBox={};
	$.when(ajaxMorePages(1,1,params,url)).done(function(data){
		if(count){
			$('.M-box').pagination({
				totalData:count,
			    showData:20,
			    current:1,
			    // count:2,
			    jump:true,
				coping:true,
				prevContent:'<i class="fa fa-angle-left"></i>',		//上一页内容
				nextContent:'<i class="fa fa-angle-right"></i>',		//下一页内容
			    callback:function(api){
			    	var index=api.getCurrent();
			    	if(userlevel=="4"){
			    		if(index>1){
			    			clearPages(index);
			    		}
			    		else{
			    			paginationCallback(index,params,url);  
			    		}
			    	}
			    	else{
						paginationCallback(index,params,url);  
			    	}
			    }
			});
		}
	})
}
function clearPages(index){
	alert("试用用户无法查询更多数据！");
	$(".infoTable1").children('tbody').empty();
}
function ajaxMorePages(pageindex,newindex,params,url){
	params.pageindex=pageindex;
	var ajax=$.ajax({
		url:url,
		type:'POST',
		data:params,
		traditional:true,
		beforeSend:beforeHandle,
		success:function(data){
			var result=data.result;
			dataBox[pageindex]=result;
			count=data.count;
			var addCount=$('<span class="topRight">共查询出<span></span>条数据记录，本页显示<span></span>条</span>');
			addCount.children('span').eq(0).text(count);
			if(count<20){
				addCount.children('span').eq(1).text(count);
			}
			else{

				addCount.children('span').eq(1).text("20");
			}
			var lee=$(".tableContent .infoTablePara").children('.topRight');
			if(lee){
				lee.empty();
				$(".tableContent .infoTablePara").append(addCount);
			}
			else{
				$(".tableContent .infoTablePara").append(addCount);
			}
			if(data.state==1){
				// getMoreResults(result,pageindex,newindex);
				selfResult(pageindex,result,newindex);
				$(".beforeSearch").removeClass('tableShow').addClass("searchDo");
				$(".tableContent").addClass('tableShow');
				$(".searchUndo").addClass("searchDo");
			}
			else if(data.state==0){
				alert("没有符合查询条件的记录！");
				count=0;
				$(".M-box").empty();
				addCount.children('span').eq(0).text(count);
				addCount.children('span').eq(1).text(count);
				$(".beforeSearch").removeClass('tableShow').addClass("searchDo");
	    		$(".searchUndo").removeClass("searchDo");
	    		$(".tableContent").removeClass('tableShow');
			}
			else{
				alert(data.error);
				window.location.href="login.html";
			}
		}
	})
	return ajax;
}	
function paginationCallback(index,params,url){
	newindex=index;
    if(index>50){
    	var _index=Math.ceil(index/50);
		pageindex=_index;
		if(dataBox[pageindex]){
			var result1=dataBox[pageindex];
			// getMoreResults(result1,pageindex,newindex);
			selfResult(pageindex,result1,newindex);
		}
		else{
			ajaxMorePages(pageindex,newindex,params,url);
		}
    }
    else{
    	// getMoreResults(dataBox[1],1,newindex);
    	selfResult(1,dataBox[1],newindex);
    }
}
function beforeHandle(){
	$(".tableContent").removeClass("tableShow");
    $(".beforeSearch").addClass("tableShow").removeClass("searchDo");
    $(".searchUndo").addClass("searchDo");
}
var searchAndScrollToNode_ = function (zTreeObj, str) {
	var attrs = Array.prototype.slice.call(arguments, 2)

	var nodes = zTreeObj.getNodesByFilter(function(node){
		return attrs.some(function(attr){
			return node[attr].indexOf(str) !== -1
		})
	}, false)
	console.dir(nodes)
	var node = nodes.slice(0,10).sort(function(item1, item2){
		return item1.name.length - item2.name.length
	})[0]

	if (!node) {
		alert('未找到相关数据')
		return false 
	}
	
	var stack = [node], parentNode = node.getParentNode()
	
	while(parentNode) { 
		stack.push(parentNode)
		parentNode = parentNode.getParentNode()
	}

	stack.reverse().forEach(function(item){
		zTreeObj.expandNode(item, true,false,false)
	})
	var $node = $('#'+ node.tId)
	var $ztree = $node.parents('.ztree')
	var $container = $node.parents('.ztree').parent()
	
	var offset = $ztree.children(":first-child").get(0).getBoundingClientRect()

	$container.animate({
		scrollTop: $node.get(0).getBoundingClientRect().top - (offset && offset.top)
	}, 1000)
	return true
}

$(document).on('mousemove.modal', '[data-drag-modal]', function(e){
	var $modal = $(this)
	var dragging = $modal.attr('data-drag-modal')

	if (dragging === 'true') {
		var top = Number.parseFloat($modal.attr('data-drag-top'))
		var left = Number.parseFloat($modal.attr('data-drag-left'))
		var mouseStartY = Number.parseFloat($modal.attr('data-drag-mousey'))
		var mouseStartX = Number.parseFloat($modal.attr('data-drag-mousex'))
		var $content = $modal.children('.custom-modal-content')
		$content.css({
			top: top + e.screenY - mouseStartY,
			left: left  + e.screenX - mouseStartX
		})
	}
})

$(document).on('mouseup.modal', '[data-drag-modal]', function(){
	var $modal = $(this)
	$modal.attr('data-drag-modal', false)
})

$(document).on('mousedown.modal', '[data-drag-enter]', function(e){
	var $modal = $(this).parents('[data-drag-modal]')
	$modal.attr('data-drag-modal', true)
	var $content = $modal.children('.custom-modal-content')
	var offset = $content.get(0).getBoundingClientRect()
	$modal.attr('data-drag-top', offset.top)
	$modal.attr('data-drag-left', offset.left)
	$modal.attr('data-drag-mousex', e.screenX)
	$modal.attr('data-drag-mousey', e.screenY)
	$content.css({
		top: offset.top,
		left: offset.left,
		transform: "translate(0,0)"
	})
})

function openModal($modal){
	$modal.find('[drag-modal-content]').css({
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)'
	})
	/*$(document.body).css({
		overflow: 'hidden'
	})*/
	$modal.show()
}

function hideModal($modal){
	/*$(document.body).css({
		overflow: 'auto'
	})*/
	$modal.hide()
}
$(".logOutBtn").one("click",function(){
	$.ajax({
        url: "/Logout",
        type: "POST",
        data:{
        },
        success:function(data){
        	if(data.state==1){
        		alert("退出登录成功！");
        		window.location.href="login.html";
        	}
        	else{
        		alert("网络异常！");
        	}
        }
    });
})
$.when(getUserInfo()).done(function(data){
	if(data.state==1){
		var result=data.all;
		if(result){
			// userid=result.id;//用户id
			userlevel=result.powerlevel;//用户等级权限
			// usertype=result.type;//用户类型
			// userName=result.name;//用户名
			entity=result.entity;//用户学校
			// entity=data.Entity;
			$(".leftInfo").text("您好,"+result.name);
			if(result.powerlevel==0){
				$(".mainUserSection").removeClass("showMenu");
				$(".userSection").removeClass("showMenu");
				$("#esi").removeClass("showMenu");
				$("#schoolManager").addClass("showMenu");
			}
			else if(result.powerlevel==1){
				$(".mainUserSection").addClass("showMenu");
				$(".userSection").removeClass("showMenu");
				$("#esi").removeClass("showMenu");
				$("#schoolManager").removeClass("showMenu");
			}
			else if(result.powerlevel==2){
				$(".mainUserSection").addClass("showMenu");
				$("#schoolManager").addClass("showMenu");
				$("#esi").removeClass("showMenu");
			}
			else if(result.powerlevel==3){
				$(".mainUserSection").addClass("showMenu");
				$(".userSection").addClass("showMenu");
			}
			else{
				$(".mainUserSection").addClass("showMenu");
				$(".userSection").addClass("showMenu");
				$("#esi").addClass("showMenu");
			}
		}
	}
	else{
		alert(data.error);
		window.location.href="login.html";
	}
})