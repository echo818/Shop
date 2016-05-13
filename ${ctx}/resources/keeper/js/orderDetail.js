$(function(){

		var html_head=$("#template_head").html();	
		$("#listData").append(html_head);
		search();
	});
	function search(){
		$.ajax({
			type: "GET",			
			url: contextPath+"/keeper/myOrder/goodslist",
			data: {orderID:$("#orderID").val()},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.orderGoods;
			       for(var index in arr){			      
				    	var html=$("#template_body").html();					    		
				    	html=html.replace(/{FirstPicture}/,arr[index].FirstPicture).replace(/{GoodsName}/,arr[index].GoodsName).replace(/{ClassName}/,arr[index].ClassName).replace(/{Num}/,arr[index].Num).replace(/{Subtotal}/,(arr[index].Subtotal-arr[index].DiscountAmount));				    					    	
				    	$("#listData").append(html);
				    }
			    }
			}
		});		
	}
