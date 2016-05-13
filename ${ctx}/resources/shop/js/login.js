$(function(){
	/*window.setTimeout(function(){
		var OpenID=$("input[name='OpenID']").val();						
		if(!OpenID){				
			WeixinJSBridge.call('closeWindow');	
			};	
	}, 2000);	*/
	
	var OpenID=$("input[name='OpenID']").val();						
	if(!OpenID)
		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri=http://shop.egocar.com.cn/weixin/shopEntry&response_type=code&scope=snsapi_base&state=index#wechat_redirect";
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
			    	if(data.message=="未关注"){
			    		window.location.href=contextPath+"/shop/focusCode";
			    	}else{
			    		window.location.href=contextPath+"/shop/index";
			    	}
			    }else{
			    	tip(data.message);
			    }
			}
		});		
		return false;
	});
})
