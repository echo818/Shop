$(function(){
	window.setTimeout(function(){
		var OpenID=$("input[name='OpenID']").val();						
		if(!OpenID){				
			WeixinJSBridge.call('closeWindow');	
			};	
	}, 2000);	
	$(".main").on('click','.sendCode',function(){		
		var mobile=$("#mobile").val();		
		if(!regexMobile(mobile)){
			return;
		}
		var that=this;
		$.get(contextPath+"/keeper/validatecode/send", {"mobile":mobile},
				   function(data){
				    if(data.status==1){
				    	tip("短信发送成功");
				    	countDown(that,60);
				    }else{
				    	tip(data.message);
				    }
				   },"json");
	})
	$("form").submit(function(){		
		var code=$("#code").val();			
		if(!regexCode(code)){
			return false;
		}
		$.ajax({
			type: "POST",			
			url: contextPath+"/keeper/bind",
			data: $("form").serialize(),
			dataType:"json",
			success: function(data){
			    if(data.status==1){
			    	window.location.href=contextPath+"/keeper/home";
			    }else{
			    	tip(data.message);
			    }
			}
		});		
		return false;
	});
})
