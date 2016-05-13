$(function(){	
	$(".main").on('click','.sendCode',function(){	
		var mobile=$("input[name='mobile']").val();		  
		if(!regexMobile(mobile)){
			return;
		}
		var that=this;
		$.get(contextPath+"/shop/validatecode/send", {"mobile":mobile},
				   function(data){
				    if(data.status==1){
				    	tip("短信发送成功");
				    	countDown(that,60);
				    }else{
				    	tip(data.message);
				    }
				   },"json");
	});
	$("form").submit(function(){
		var code=$("input[name='code']").val();			
		if(!regexCode(code)){
			return false;
		}
		$.ajax({
			type: "POST",			
			url: contextPath+"/shop/bind",
			data: $("form").serialize(),
			dataType:"json",
			success: function(data){
			    if(data.status==1){			    	
			    	var ShopkeeperID=$("input[name='ShopkeeperID']").val();
			    	var CachCouponID=$("input[name='CachCouponID']").val();
			    	window.location.href=contextPath+"/shop/coupon/getCoupon?ShopkeeperID="+ShopkeeperID+"&CachCouponID="+CachCouponID;	
			    }else{
			    	tip(data.message);
			    }
			}
		});		
		return false;
	});	
})