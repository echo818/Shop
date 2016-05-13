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
		var status=$("#order-status").val();
		var day=$("#order-select").val();
		var currentPage=$("#currentPage").val();
		var pageSize=$("#pageSize").val();
		var personalID=$("#personalID").val();
		$.ajax({
			type: "GET",			
			url: contextPath+"/keeper/myOrder/data",
			data: {currentPage:currentPage,pageSize:pageSize,status:status,day:day,personalID:personalID},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.myOrder;
			       //$("#currentPage").val(data.data.pageList.currentPage);
				   //$("#pageSize").val(data.data.pageList.pageSize);	
				   $("#totalPage").val(data.data.pageList.totalPage);	
				   var statusArr=new Array("未支付","<a href='"+contextPath+"/keeper/sendGoods?orderID={OrderID}'>待发货</a>","已发货");	
				   var payArr=new Array("待支付","已支付","支付失败");	       
			       for(var index in arr){			      
				    	var html=$("#template").html();	
				    	//var send="<a href='/axshop_main_web/keeper/sendGoods?orderID="+arr[index].OrderID+"'>待发货</a>";
				    	html=html.replace(/{OrderID}/,arr[index].OrderID).replace(/{OrderID}/,arr[index].OrderID).replace(/{CreateTime}/,arr[index].CreateTime).
				    		replace(/{RecMobile}/,arr[index].RecMobile).replace(/{Status}/,statusArr[arr[index].Status]).replace(/{PayStatus}/,payArr[arr[index].PayStatus]).
				    		replace(/{OrderID}/,arr[index].OrderID).replace(/{Amount}/,arr[index].Amount);
				    	var html_detail_template=$("#template_detail").html();
				    	var html_detail="";
				    	var arrDetail=arr[index].orderGoods;				    	
				    	for(var indexDetail in arrDetail){
				    		html_detail+=html_detail_template.replace(/{dFirstPicture}/,arrDetail[indexDetail].FirstPicture).replace(/{dGoodsName}/,arrDetail[indexDetail].GoodsName).replace(/{dGoodsCnfClassName}/,arrDetail[indexDetail].ClassName).replace(/{dAmount}/,arrDetail[indexDetail].Subtotal).
				    		replace(/{drAmount}/,arrDetail[indexDetail].Subtotal-arrDetail[indexDetail].DiscountAmount).replace(/{dNum}/,arrDetail[indexDetail].Num).replace(/{dBasePercentage}/,arrDetail[indexDetail].Subtotal-arrDetail[indexDetail].DiscountAmount-arrDetail[indexDetail].BasePercentage);				    		
				    	}
				    	html=html.replace(/{Detail}/,html_detail);
				    	$("#listData").append(html);
				    }
			    }
			}
		});		
	}
