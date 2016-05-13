$(function(){
	$("select[name='ProvinceID']").change(function(){
		var categoryID=$("select[name='ProvinceID']").val();
		if(categoryID==-1){
			$("select[name='CityID']").empty();				 	
		    var option = $("<option>").val(-1).text("市");
		    $("select[name='CityID']").append(option);	
		    
		    //$("select[name='CityID']>option:first").siblings().remove();
		}
		else{
		  	$.get(contextPath+"/keeper/region", {categoryID:categoryID},
			  function(data){
		  		if(data.status==1){
				 	 $("select[name='CityID']").empty();
				 	 var Region=data.data.Region;
				     for(var index in Region){
				    	var option = $("<option>").val(Region[index].categoryID).text(Region[index].categoryName);
				    	$("select[name='CityID']").append(option);				    	
				    };	
		  		}else{
			    	tip(data.message);
			    }
			},"json"); 
		}
    });	
	
	$("form").submit(function(){
		//return false;
		//alert($("input[name='Name']").val());
		if($("input[name='Name']").val()==""){tip("姓名不能为空！");return false;}	
		if($("select[name='ProvinceID']").val()==-1){tip("请选择省级！");return false;}
		if($("select[name='CityID']").val()==-1){tip("请选择市级！");return false;}		
		var mobile=$("#Mobile").val();	
		
		if(!regexMobile(mobile)){
			return false;
		}
		
		$.ajax({
			type: "POST",			
			url: contextPath+"/keeper/apply/add",
			data: $("form").serialize(),
			dataType:"json",
			success: function(data){
			    if(data.status==1){
			    	tip("店主申请提交成功，我们会尽快联系您，审核成功后就可以成为店主。");
			    }else{
			    	tip(data.message);
			    }
			}
		});		
		return false;
	});
	
	$(".main").on('click','.sendCode',function(){		
		var mobile=$("#Mobile").val();	
		//alert(mobile);	
		if(!regexMobile(mobile)){
			return;
		}
		var that=this;
		var timestamp1 = Date.parse( new Date()); 
		$.get(contextPath+"/keeper/apply/validatecode/send", {"mobile":mobile,"r":Date.parse( new Date())},
				   function(data){
				    if(data.status==1){
				    	tip("短信发送成功");
				    	countDown(that,60);
				    }else{
				    	tip(data.message);
				    }
				   },"json");
	})
})
