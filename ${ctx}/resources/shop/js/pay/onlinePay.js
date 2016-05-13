$(function(){	
	/* onlinePay */
	$('.pay-select-btn').click(function(){
		$('.pay-select-btn').removeClass('pay-select-active');
		$(this).addClass('pay-select-active');
	});	
	$(".common-ctrl").click(function(){
		var myOrderID=$("#orderId").val();
		$.ajax({
			type: "POST",			
			url: contextPath+"/shop/pay/WeiXinUnifiedorder",
			data: {myOrderID:myOrderID},
			dataType:"json",
			success: function(data){
			    if(data.status==1){
			    	 var PayJsRequest = $.parseJSON(data.data.PayJsRequest); 
			    	onBridgeReady(PayJsRequest);
			    }else{
			    	tip(data.message);
			    }
			}
		});
	});

});

function onBridgeReady(payJsRequest){	
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
           "appId" : payJsRequest.appId,     //公众号名称，由商户传入     
           "timeStamp":payJsRequest.timeStamp,         //时间戳，自1970年以来的秒数     
           "nonceStr" : payJsRequest.nonceStr, //随机串     
           "package" : payJsRequest.package,     
           "signType" : payJsRequest.signType,   //微信签名方式:     
           "paySign" : payJsRequest.paySign //微信签名 
       },
       function(res){   
    	   //alert(res.err_msg);
         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    	   var orderId=$("#orderId").val();
           if(res.err_msg == "get_brand_wcpay_request:ok" ) { 
           		window.location.href=contextPath+"/shop/pay/paySuccess?orderId="+orderId;      	  
           }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
        	   window.location.href=contextPath+"/shop/pay/payWrong?orderId="+orderId; 
           }else if(res.err_msg == "get_brand_wcpay_request:fail" ) { 
           	 	window.location.href=contextPath+"/shop/pay/payWrong?orderId="+orderId;   
           }else{
        	   window.location.href=contextPath+"/shop/pay/payWrong?orderId="+orderId;       	  
           }          
       }); 
}