$(function(){
	$("select[name='Province']").change(function(){
				var categoryID=$("select[name='Province']").val();
			  	$.get(contextPath+"/shop/personal/region", {categoryID:categoryID},
				  function(data){
			  		if(data.status==1){
					 	 $("select[name='City']").empty();
					 	 var Region=data.data.Region;
					     for(var index in Region){
					    	var option = $("<option>").val(Region[index].categoryID).text(Region[index].categoryName);
					    	$("select[name='City']").append(option);				    	
					    };
					    $("select[name='District']").empty();
					    var District=data.data.District;
					    for(var index in District){
					    	var option = $("<option>").val(District[index].categoryID).text(District[index].categoryName);
					    	 $("select[name='District']").append(option);
					    }
			  		}else{
			  			tip(data.message);
			  		}				   
				},"json"); 
	        });	
	$("select[name='City']").change(function(){
	  	$.get(contextPath+"/shop/personal/region", {categoryID:$("select[name='City'").val()},
		  function(data){
	  		if(data.status==1){
			 	 $("select[name='District']").empty();	
			 	 var Region=data.data.Region;
			     for(var index in Region){
			    	var option = $("<option>").val(Region[index].categoryID).text(Region[index].categoryName);
			    	 $("select[name='District']").append(option);
			    }
			 }else{
			    tip(data.message);
			  }
		},"json"); 
    });	
})