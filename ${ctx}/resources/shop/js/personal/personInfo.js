$(function(){
	$("select[name='ProvinceID']").change(function(){
				var categoryID=$("select[name='ProvinceID']").val();
				if(categoryID==-1){
					$("select[name='CityID']").empty();				 	
				    var option = $("<option>").val(-1).text("请选择");
				    $("select[name='CityID']").append(option);	
				    
				    //$("select[name='CityID']>option:first").siblings().remove();
				}
			  	$.get(contextPath+"/shop/personal/region", {categoryID:categoryID},
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
	        });	
})