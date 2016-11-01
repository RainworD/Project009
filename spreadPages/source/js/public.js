(function(){
	var DEFAULT_VERSION = "8.0";
	var ua = navigator.userAgent.toLowerCase();
	var isIE = ua.indexOf("msie")>-1;
	var safariVersion;
	if(isIE){
	    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
	    if(safariVersion <= DEFAULT_VERSION ){
	        window.location.href="error.html"
	    }
    }
	var pageData = {
		"pageIndex":0,
		"window_height":$(window).height(),
		"header_height":$(".header").height(),
		"footer_height":$(".footer").height(),
		"window_width":$(window).width()
	};
	var cHeight = pageData.window_height-pageData.header_height-pageData.footer_height;
	window.cHeight = cHeight;
	function init(_pageData){
		$.extend(pageData,_pageData);
		initNav();
		initAdditionHtml();
		singlePageHandle();
		eventBind();
		
	}
	var addtionHTML = 	'<div class="mask"></div>'+
						'<div class="pushableView"></div>';
	function initAdditionHtml(){
		$("body").append(addtionHTML);
		$("#yearnum").text(getYear());
	}
	function initNav(){
		if (pageData["pageIndex"]>-1) {
			$(".header .navbox .nav li").eq(pageData["pageIndex"]).addClass("set");
		}
		// var mobileNav = $(".header .navbox").clone().addClass("mobile").attr("id","mobileNav");
		// var searchHTML = $("<li class='searchboxTrigger'>搜索</li>");
		// mobileNav.find("ul").append(searchHTML);
		var mobileNav = $(".header .navbox").clone().addClass("mobile2");
		$(".header").after(mobileNav);
	}
	function eventBind(_scope){
		var scope = $("body");
		if (_scope) {
			scope = _scope;
		};
		$(".navicon.mobile",scope).bind('touchend click',function(e){
			e.preventDefault();
			$(".searchbox.searchboxshow").toggle();
			// if ($("#mobileNav").hasClass("navshow")) {
			// 	$("body").removeClass("maskshow");
			// 	$("#mobileNav").removeClass("navshow");
			// }
			// else{
			// 	$("body").addClass("maskshow");
			// 	$("#mobileNav").addClass("navshow");
			// }
			// $(".searchbox").removeClass("searchboxshow");
		});
		// ul.nav>li>搜索
		// $(".searchboxTrigger",scope).bind('touchend click',function(e){
		// 	e.preventDefault();
		// 	$(".searchbox").addClass("searchboxshow");
		// 	$("#mobileNav").removeClass("navshow");
		// });
		$(".mask",scope).bind('touchend click',function(e){
			e.preventDefault();
			$("body").removeClass("maskshow");
			$("#mobileNav").removeClass("navshow");
			// $(".searchbox").removeClass("searchboxshow");
		});
		$(document).on('touchend click',".actionButton",function(e){
			e.preventDefault();
			var type = $(this).attr("data-type");
			switch(type){
				case "pushviewButton":
					var href = $(this).attr("data-href");
					var pageId = href.split("_")[1];
					$(".pushableView").attr("data-pageid",pageId).load(href,function(){
						$(this).addClass("show");
					});
				break;
				case "popviewButton":
					$(".pushableView").removeClass("show");
				break;
				default:break;
			}
		});
	}
	function singlePageHandle(){
		
		$(".content").css("min-height",cHeight+"px");
		switch(pageData.pageIndex){
			case 0:break;
			case 1:break;
			case 2:break;
			case 3:break;
			case 4:break;
		}
		if (pageData.pageId) {
			switch(pageData.pageId){
				case "login":
					
				break;
				case "data":
					var selector = $('<select class="selector mobile"></select>');
					$(".data_content .provinces li").each(function(){
						selector.append("<option"+($(this).hasClass("set")?" selected":"")+">"+$(this).find("a").text()+"</option>");
					});
					$(".data_content .provinces").append(selector);
				break;
				case "data_axis":
					$(".footer").after($(".actionButtonBox").clone().addClass("mobile fixedBottom").find(".que").text("我要提问").end().find(".add").text("我要补充").end()).addClass("pc");
				break;
				case "ask":
					// console.log(cHeight-40-40-45-45-20+"px");
					// $(".editbox").css("":cHeight-40-40-45-45-20+"px");
				break;
			}
		}
	}
	function initBanner(){
		// 轮播图相关
		if($(".bannerbox .banner").length>1){
			for(var i = 0; i < $(".bannerbox .banner").length; i++){
				var touchslider_nav_item = i==0?$('<div class="touchslider-nav-item touchslider-nav-item-current"></div>'):$('<div class="touchslider-nav-item"></div>');
				$(".bannerbox .ctrlbox").append(touchslider_nav_item);
			}
		}
		$(".touchslider").touchSlider({
		    container: this,
		    duration: 350,
		    delay: 8000, 
		    margin: 0, 
		    mouseTouch: true,
		    namespace: "touchslider",
		    next: ".touchslider-next", //下一张按钮的样式
		    pagination: ".touchslider-nav-item",
		    currentClass: "touchslider-nav-item-current", 
		    prev: ".touchslider-prev", // 上一张按钮样式
		    autoplay: true, 
		    viewport: ".touchslider-viewport"
		});
	}
	
	function getYear(){
		var d = new Date();
		return d.getFullYear();
	}
	function createNewArticle(order){
		var photo_state = order.photo_state;
		var value = order.value[0]["value"];
		var id = order.id;
		var title = order.title;
		var summary = order.summary;
		var name = order.name;
		var in_time = order.in_time;
		var html = '<article';
		if(photo_state==0){
			html += '><div class="picbox"><img src="'+order.photo+'"></div>';
		}
		else{
			html += ' class="nopic">';
		}
		if(value){
			value = '<a class="tag">'+value+'</a>';
		}
		else{
			value='';
		}
		html += ('<div class="textbox">'+
								'<header class="texthead">'+
									value+			
									'<h2><a href="/index.html?p='+id+'" target="_blank">'+title+'</a></h2>'+
								'</header>'+
								'<p class="note" style="line-height:24px;margin: 17px 0;">'+summary+'</p>'+
								'<p class="meta" style="font-size: 14px;">'+
								'<span class="display">'+
								value+
								' '+
								'/'+
								' '+	
								'</span>'+
									'<span class="author span" style="margin-right: 0;">'+name+'</span> / '+
									'<time class="time span">'+in_time+'</time>'+
								'</p>'+
							'</div>'+
						'</article>');
		return html;
	}
	function createNewAxisUnit(order){
		var photo_state = order.photo_state;
		var value = order.value;
		var id = order.id;
		var title = order.title;
		var summary = order.summary;
		var name = order.name;
		var in_time = order.in_time;
		var timeArr = in_time.split("-");
		var html = '<article class="axisList">'+
								'<time class="time">'+
									'<span class="date">'+timeArr[1]+'-'+timeArr[2]+
									'</span>'+
									'<span class="year">'+timeArr[0]+
									'</span>'+
								'</time>'+
								'<h2><a href="/index.html?p='+id+'" target="_blank">'+title+'</a></h2>'+
								'<p>'+summary+'</p>'+
							'</article>';
		return html;
	}
	window.init = init;
	window.initBanner = initBanner;
	window.createNewArticle = createNewArticle;
	window.createNewAxisUnit = createNewAxisUnit;
})();









