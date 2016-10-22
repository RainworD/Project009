
	$.when(LandNNSFtype()).done(function(data){
		var state=data.state;
		var result=data.result;
		if(state==1){
			for (var i=0;i<result.length;i++) {
				var newopt=$('<option></option>');
				if (result[i]) {
					newopt.text(result[i]);
					$(".projectType").append(newopt);
				}
			}
		}
	})
	// var dataBox=[];
	var newindex=1;
	function getDataBox(){
		var pageindex;
		var manager=$(".projectManager").val();
		var name=$(".nameput").val();
		var year1=$(".yearName1").val();
		var year2=$(".yearName2").val();
		var money1=$(".nationFee1").val();
		var money2=$(".nationFee2").val();
		var applicationcode	=$(".applyCode").val();	
		var entity=$(".unitsEnter").val();
		var type=$(".projectType").val();
		ajaxMorePages(1);
		function ajaxMorePages(index){
			pageindex=index;
			$.when(askNNSF(entity,type,year1,year2,money1,money2,name,manager,pageindex,applicationcode)).done(function(data){
				var result=data.result;
				// var obj={};
        		// obj.index=pageindex;
        		// obj.result=result;
        		// if(dataBox.length){
        		// 	for (var k=0;k<dataBox.length;k++) {
	        	// 		if(dataBox[k]==pageindex){
	        	// 		}
	        	// 		else{
	        	// 			dataBox.push(obj);
	        	// 		}
	        	// 	}
        		// }
        		// else{
        		// 	dataBox.push(obj);	
        		// }
				$(".infoTable1").children('tbody').empty();
				var count=data.count;
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
					// for (var i=0,len=result.length;i<len;i++) {
					// 	var searchInfo=$('<tr>'+
					// 		'<td></td>'+
					// 	'</tr>');
					// 	searchInfo.children('td').eq(0).text((i+1)+20*(pageindex-1)*50);
					// 	// console.log((i+1)+20*(pageindex-1)*50);
					// 	for (var j=0;j<result[i].length;j++) {
					// 		var mytd=$('<td></td>');
					// 		if(result[i][j]==null){
					// 			result[i][j]="";
					// 		}
					// 		else if(j==6){
					// 			result[i][j]=year1+'-'+year2;
					// 		}
					// 		else if(j==7){
					// 			if(money1==""&&money2!=""){
					// 				result[i][j]='0-'+money2;
					// 			}
					// 			else if(money2==""&&money1!=""){
					// 				result[i][j]=money1+'-不限';
					// 			}
					// 			else if(money1!=""&&money2!=""){
					// 				result[i][j]=year1+'-'+year2;
					// 			}
					// 			else{
					// 				result[i][j]="汇总统计";
					// 			}		
					// 		}
					// 		mytd.text(result[i][j]);
					// 		searchInfo.append(mytd);
					// 	}
					// 	$(".infoTable1").children('tbody').append(searchInfo);
					// }
					// getPages(0);
					// $('.M-box').pagination({
					// 	totalData:count,
					//     showData:20,
					//     current:1,
					//     count:2,
					//     jump:true,
					// 	coping:true,
					// 	prevContent:'<i class="fa fa-angle-left"></i>',		//上一页内容
					// 	nextContent:'<i class="fa fa-angle-right"></i>',		//下一页内容
					//     callback:function(index){
					//         getPages(index-1);
					//         if(index>50){
					//         	var _index=Math.ceil(index/50);
					// 			pageindex=_index;
					// 			index=index%50;
					// 			for (var i=0,len=dataBox.length;i<len;i++) {
					// 				var index1=dataBox[i].index;
					// 				if(index1=_index){

					// 				}
					// 			}
					// 			ajaxMorePages(pageindex);
					//         	// $.when(askNNSF(entity,type,year1,year2,money1,money2,name,manager,pageindex,applicationcode)).done(function(data){
					//         	// 	var result=data.result;
					//         	// 	var obj={};
					//         	// 	obj.index=pageindex;
					//         	// 	obj.result=result;
					//         	// 	dataBox.push(obj);
					//         	// })
					//         	getPages(index-1);
					//         }
					//     }
					// });
					getMoreResults(result,pageindex,year1,year2,money1,money2,count)
				}
				else{
					alert("没有符合查询条件的记录！");
					count=0;
					addCount.children('span').eq(0).text(count);
					addCount.children('span').eq(1).text(count);
				}
			})
		}	
		function getMoreResults(result,pageindex,year1,year2,money1,money2,count){
			for (var i=0,len=result.length;i<len;i++) {
				var searchInfo=$('<tr>'+
					'<td></td>'+
				'</tr>');
				searchInfo.children('td').eq(0).text((i+1)+20*(pageindex-1)*50);
				// console.log((i+1)+20*(pageindex-1)*50);
				for (var j=0;j<result[i].length;j++) {
					var mytd=$('<td></td>');
					if(result[i][j]==null){
						result[i][j]="";
					}
					else if(j==6){
						result[i][j]=year1+'-'+year2;
					}
					else if(j==7){
						if(money1==""&&money2!=""){
							result[i][j]='0-'+money2;
						}
						else if(money2==""&&money1!=""){
							result[i][j]=money1+'-不限';
						}
						else if(money1!=""&&money2!=""){
							result[i][j]=year1+'-'+year2;
						}
						else{
							result[i][j]="汇总统计";
						}		
					}
					mytd.text(result[i][j]);
					searchInfo.append(mytd);
				}
				$(".infoTable1").children('tbody').append(searchInfo);
			}
			// getPages((pageindex-1)*50);
			getPages(newindex-1);
			console.log(newindex-1);
			// console.log((pageindex-1)*50);
			if($("#Pagination").html().length == ''){  
				$('.M-box').pagination({
					totalData:count,
				    showData:20,
				    current:newindex,
				    count:2,
				    jump:true,
					coping:true,
					prevContent:'<i class="fa fa-angle-left"></i>',		//上一页内容
					nextContent:'<i class="fa fa-angle-right"></i>',		//下一页内容
				    callback:function(index){
				        if(index>50){
				        	newindex=index;
				        	var _index=Math.ceil(index/50);
							pageindex=_index;
							ajaxMorePages(pageindex);
							// console.log(dataBox);
							// index=index%50;
							// for (var i=0,len=dataBox.length;i<len;i++) {
							// 	var index1=dataBox[i].index;
							// 	console.log(index1);
							// 	console.log(index1);
							// 	if(index1==_index){
							// 		var result1=dataBox[i].result;
							// 		getMoreResults(result1,pageindex,year1,year2,money1,money2,count)
							// 		getPages(index-1);
							// 	}
							// 	else{
							// 		ajaxMorePages(pageindex);
							// 	}
							// }
				        	// $.when(askNNSF(entity,type,year1,year2,money1,money2,name,manager,pageindex,applicationcode)).done(function(data){
				        	// 	var result=data.result;
				        	// 	var obj={};
				        	// 	obj.index=pageindex;
				        	// 	obj.result=result;
				        	// 	dataBox.push(obj);
				        	// })
				        		getPages(index-1);
				        }
				       
				    }
				});
			}
		}	
	}
	$(".searchBtn").bind("click",function(){
		getDataBox();
	})
	// function getPages(index){
	// var tr=$(".infoTable1 tbody tr");
	// 	tr.hide();
	// 	for (var i=20*index;i<20*(index+1);i++) {
	// 		tr.eq(i).show();
	// 	}
	// }
	function OnInput2 (event) {
        var sub=$(".nameput").val();
    	getWholeList2(sub);
    	$(".showElse2").addClass('showBtn'); 
    }
    function OnPropChanged2 (event) {
       	var sub=$(".nameput").val();
    	getWholeList2(sub);
    	$(".showElse2").addClass('showBtn');
    }
    $(".showElse2").delegate('li', 'click', function() {
    	$(".showElse2").removeClass("showBtn");
    	var txt=$(this).text();
    	$(".nameput").val(txt);
    });
    function OnInput (event) {
        var sub=$(".unitsEnter").val();
    	getWholeList(sub);
    	$(".showElse").addClass('showBtn');     
    }
    function OnPropChanged (event) {
       	var sub=$(".unitsEnter").val();
    	getWholeList(sub);
    	$(".showElse").addClass('showBtn');     
    }
     $(".showElse").delegate('li', 'click', function() {
    	$(".showElse").removeClass("showBtn");
    	var txt=$(this).text();
    	$(".unitsEnter").val(txt);
    });
    function getWholeList(sub){
		$.when(Landentity0(sub)).done(function(data){
			$(".showElse").empty();
			var state=data.state;
			var result=data.result;
			if (state==1) {
				var len=result.length;
				for (var i=0;i<len;i++) {
					var mytd=$('<li></li>');
					mytd.text(result[i]);
					$(".showElse").append(mytd);
				}	    			
			}
			else{
				$(".showElse").removeClass('showBtn');
			}
		})
	}
	function getWholeList2(sub){
		$.when(LandNKRPname(sub)).done(function(data){
			$(".showElse2").empty();
			var state=data.state;
    		var result=data.result;
    		if (state==1) {
    			var len=result.length;
    			for (var i=0;i<len;i++) {
    				var mytd=$('<li></li>');
    				mytd.text(result[i]);
    				$(".showElse2").append(mytd);
    			}	    			
    		}
    		else{
    			$(".showElse2").removeClass('showBtn');
    		}
		})
	}