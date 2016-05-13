	$(function(){
		search();
		//$("#order-select,#order-status").change(function() {
		$("#query").click(function() {
			$("#currentPage").val(1);
			$("#pageSize").val(10);
			$("#listData li").remove();
			search();	  
		});
		//var x = 0;
		$(document).scroll(function(){
			var winH = $(window).height();
			var docH = $(this).height();
			var hh = docH - winH - 10;
			var top = $(this).scrollTop();
			if(top>hh){
				//x++;
				var currentPage=parseInt($("#currentPage").val());
				var totalPage=parseInt($("#totalPage").val());
				if(currentPage<totalPage){
					$("#currentPage").val(currentPage+1);
					search();					
				}
			}
		});
	});
	function search(){		
		var currentPage=$("#currentPage").val();
		var pageSize=$("#pageSize").val();	
		$.ajax({
			type: "GET",			
			url: contextPath+"/shop/goods/data",
			data: {currentPage:currentPage,pageSize:pageSize,GoodsType1:GoodsType1},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.Goods;
			       //$("#currentPage").val(data.data.pageList.currentPage);
				   //$("#pageSize").val(data.data.pageList.pageSize);	
				   $("#totalPage").val(data.data.pageList.totalPage);	
			       for(var index in arr){
			    	    var MPicture=arr[index].MPicture.split(",");
				    	var html=$("#template").html();					    		
				    	html=html.replace(/{GoodsName}/,arr[index].GoodsName).replace(new RegExp(/{GoodsID}/g),arr[index].GoodsID).
				    	replace(/{OriginalPrice}/,arr[index].OriginalPrice).replace(/{CurrentPrice}/,arr[index].CurrentPrice)
				    	.replace(/{Subtitle}/,shopSubStr(arr[index].Subtitle)).replace(/{Picture}/,MPicture[0]);				    					    					    	
				    	$("#listData").append(html);
				    }
			    }else{
			    	tip(data.message);
			    }
			}
		});		
	}
