	$(function(){
		$('.chooseCoupon-ctrl-btn>a').click(function(){
			var data_id =$('.coupon-select').attr('data-id');
			//tip(data_id);
			
			if(data_id == undefined || data_id==""){
				tip("请选择现金券！");return;
			}
			var timestamp1 = Date.parse( new Date()); 
			$.ajax({
			type: "GET",			
			url:  contextPath+"/keeper/cachcoupon/send",
			data: {personalIDs:personalIDs,cachCouponID:data_id,r:timestamp1},
			dataType:"json",
			success: function(data){
				tip(data.message);
			  	if(data.status==1){
			       //var arr=data.message;
			       $("#btnSend").hide();
			  	   setTimeout("location.href='"+contextPath+"/keeper/customer'",3000);
			    }
			}
		});		
		});
		var html_head=$("#template_head").html();	
		$("#listData").append(html_head);
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
		search();
	});
	function search(){
		var currentPage=$("#currentPage").val();
		var pageSize=$("#pageSize").val();
		//tip(1);
		$.ajax({
			type: "GET",			
			url: contextPath+"/keeper/cachcoupon/data",
			data: {currentPage:currentPage,pageSize:pageSize},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.cachCoupons;
			       //$("#currentPage").val(data.data.pageList.currentPage);
				   //$("#pageSize").val(data.data.pageList.pageSize);	  
				   $("#totalPage").val(data.data.pageList.totalPage);	
			       for(var index in arr){			      
				    	var html=$("#template_body").html();					    		
				    	html=html.replace(/{CachCouponID}/,arr[index].CachCouponID).replace(/{CouponName}/,arr[index].CouponName).replace(/{ParValue}/,arr[index].ParValue).replace(/{GoodsName}/,arr[index].GoodsName);				    					    	
				    	$("#listData").append(html);
				    }
			       
			       	/* 选择现金券 */
				   	$('.mycoupon-radio').click(function(){
				   		$('.mycoupon-radio').removeClass('coupon-select')
				   		$(this).addClass('coupon-select');
				   	});
			    }
			}
		});		
	}
