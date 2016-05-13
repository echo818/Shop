$(function(){
		search();
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
			url: contextPath+"/shop/order/orderListData",
			data: {currentPage:currentPage,pageSize:pageSize},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.orderList;
			       //$("#currentPage").val(data.data.pageList.currentPage);
				   //$("#pageSize").val(data.data.pageList.pageSize);	
				   $("#totalPage").val(data.data.pageList.totalPage);	
				   var statusArr=new Array("未支付","待发货","已发货");					       
			       for(var index in arr){			      
				    	var html=$("#template").html();					    		
				    	html=html.replace(/{CreateTime}/,arr[index].CreateTime).replace(/{RecMobile}/,arr[index].RecMobile).ereplace(new RegExp(/{OrderID}/g),arr[index].OrderID).			    		
				    		replace(/{Amount}/,arr[index].Amount).replace(/{Status}/,statusArr[arr[index].Status]);	
				    	
				    	var html_detail_template=$("#template_detail").html();
				    	var html_detail="";
				    	var arrDetail=arr[index].orderGoods;				    	
				    	for(var indexDetail in arrDetail){
				    		html_detail+=html_detail_template.replace(/{Picture}/,arrDetail[indexDetail].FirstPicture).replace(/{dGoodsName}/,arrDetail[indexDetail].GoodsName).replace(/{dGoodsCnfClassName}/,arrDetail[indexDetail].ClassName).replace(/{dAmount}/,arrDetail[indexDetail].Subtotal).
				    		replace(/{drAmount}/,arrDetail[indexDetail].Subtotal-arrDetail[indexDetail].DiscountAmount).replace(/{dNum}/,arrDetail[indexDetail].Num);				    		
				    	}
				    	//html=html.replace(/{Detail}/,html_detail);
				    	$("#orderList").append(html);
				    }				  
			    }else{
			    	tip(data.message);
			    }
			}
		});		
	}
