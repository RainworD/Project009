var origin_fn_init = $.fn.zTree.init
$.fn.zTree.init = function($el, options, data){
	var level = 1
	console.dir(data)
	var children = data[0].children
	while(children) {
		console.dir(children)
		children = children[0].children
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
function getUnits(){
	$.when(LandEntity()).done(function(data){
		var result=data.result;
		finalResults=result;
		judgeUnits(result);
	})
}
var objnew={};
var finalResults=objnew.finalResults;
function judgeUnits(result){
	var zNodes=result;
	$.fn.zTree.init($("#tree"), setting, zNodes);
	rootObj=$.fn.zTree.getZTreeObj("tree");
	rootObj.expandNode(rootObj.getNodes()[0], true)
	// $(".qingta-ztree-table").delegate("li.level0","click",function(){
	// 	$(this).parents(".ztree").find(".level2 a").css("background-color","#fff");
	// })
}
function loadContent() {
	$(document).unbind("mousedown.drag");
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
	$(selector).bind("mousedown.drag",function(e){
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
	$(document).bind("mousemove",function(e){
		if(ismousedown){
			_mytop=e.clientY-downY + mytop;
			_myleft=e.clientX-downX + myleft;
			$(selector).css("left",_myleft);
			$(selector).css("top",_mytop);
		}
	});
	$(document).bind("mouseup",function(){
		ismousedown=false;
		mytop=$(selector).position().top;
		myleft=$(selector).position().left;
	})
	$(selector).on("click",".forConsole",function(){
		$(".mask").hide();
		$(selector).hide();
	})
}
function dragBoxUnitsChoose(selector,projectUnits){
	var checkedArray=[];
	var _array=[];
	$(selector).on("click",".cancelBtn",function(){
		$(".mask").hide();
		$(selector).hide();
	})
	$(selector).on("click",".forSure",function(){
		$(".mask").hide();
		$(selector).hide();
		$(this).addClass("getUnitsInfo");
		getTreeNodes(checkedArray,_array);
		var checkedLen=checkedArray.length;
		console.log(checkedLen);
		// var mylen=$(".chooseAlreadyList").children('.chooseItems').length;
		showName=[];
		var timeOutId=setTimeout(function(){
			if(checkedLen){
				for (var i=0;i<checkedLen;i++) {
					var pushItem=checkedArray[i].name;
					var pushid=checkedArray[i].id;
					projectUnits.push(pushid);
					showName.push(pushItem);
					$(".unitsEnter").val(showName[0]+'...');
				}
			}
		},10);
	})
	$(selector).on("click",".forConsole",function(){
		$(".mask").hide();
		$(selector).hide();
	})
	$(selector).on("click",".search-box",function(){
		var search_str=$(this).siblings(".custom-input-box").find("input").val();
		console.log(search_str);
		var find = searchAndScrollToNode_(rootObj, search_str,"name");
		console.log(find);
		if (!find) {
			search_str = ""
		}
	})
}
function dragBoxSortsChoose(selector){
	$(selector).on("click",".cancelBtn",function(){
		$(".mask").hide();
		$(selector).hide();
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
function topBarControl(){
	$(".resetBtn").bind("click",function(){
		if(confirm("你确定重置所有查询条件？")){
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
function getTreeNodes(checkedArray,_array){
	// var rootObj=$.fn.zTree.getZTreeObj("tree");
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
		var checkedObj={};
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
				checkedObj.name=_array[i].name;
				checkedObj.id=_array[i].id;
				// checkedArray.push(_array[i].name);
				checkedArray.push(checkedObj);
				_array[i].chkDisabled=true;
				// rootObj.refresh();
			// }
		}
	}
	rootObj.refresh();
}
function cancelCheckedState(){
	// var rootObj=$.fn.zTree.getZTreeObj("tree");
	rootObj.refresh();
}
function madeNowrapText(text){
	return "<span class='nowrap'>"+text+"<span>";
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
function getPages(index){
	var tr=$(".infoTable1 tbody tr");
	tr.hide();
	for (var i=20*index;i<20*(index+1);i++) {
		tr.eq(i).show();
	}
}
$("body").on("click",".showMoreContent",function(event){
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
					paginationCallback(index,params,url);  
			    }
			});
		}
	})
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
			else{
				alert("没有符合查询条件的记录！");
				count=0;
				$(".M-box").empty();
				addCount.children('span').eq(0).text(count);
				addCount.children('span').eq(1).text(count);
				$(".beforeSearch").removeClass('tableShow').addClass("searchDo");
	    		$(".searchUndo").removeClass("searchDo");
	    		$(".tableContent").removeClass('tableShow');
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
    $(".beforeSearch").addClass("tableShow");
    $(".searchUndo").addClass("searchDo");
}
var searchAndScrollToNode_ = (function _searchAndScrollToNode_(){
	var pre_search, pre_results = null
	return function (zTreeObj, str) {
		var attrs = Array.prototype.slice.call(arguments, 2)

		var nodes, node
		if (pre_search !== undefined && str === pre_search) {
			nodes = pre_results
		} else {
			nodes = zTreeObj.getNodesByFilter(function(node){
				return attrs.some(function(attr){
					return node[attr].indexOf(str) !== -1
				})
			}, false)
		}
		node = nodes.shift()
		pre_results = nodes
		pre_search = str

		if (!node) {
			alert('未找到相关数据')
			pre_search = ""
			pre_results = []
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
}());

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