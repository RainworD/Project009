
var ADMIN_CONFIG = {
	"homePage": "commonDataAnalysis.html",
	"contentSelector": "#rightContent",
};
init();
function init(){
	eventBind();
	function changeHeight(){
		var myheight=$(window).height();
		$(".leftBox").css("min-height",myheight);
	}
	window.onload=function(){  
	  	window.onresize = changeHeight;  
	  	changeHeight();  
	}
	$(".alink").bind("click",function(){
		var myhash=$(this).attr("href");
		window.location.hash=myhash;
	})
	function loadContent() {
	    var hash = window.location.hash;
	    if (hash == "") {
	        hash = "#/"+ADMIN_CONFIG.homePage;
	    }
	    $(ADMIN_CONFIG.contentSelector).load(hash.split("/")[1], function(){
	    });
	}
}
function eventBind(){
	$(".downflag").bind("click",function(){
		var showflag=$(this).parent().next(".downContent").attr("class");
		var array=showflag.split(" ");
		if(array.length>1){
			$(this).parent().next(".downContent").removeClass("show");
		}
		else{
			$(this).parent().next(".downContent").addClass("show");
		}
	})
	$(window).bind('load hashchange', loadContent);
}