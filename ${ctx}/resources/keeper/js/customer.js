$(function(){  	
  	/* 我的客户 */
	/*
	$(".main").on('click','.customer-radioall',function(){
		if(!$(this).hasClass('customer-selectAll')){
			$('.customer-radio').addClass('customer-select');
			$(this).addClass('customer-selectAll');
		}else{
			$('.customer-radio').removeClass('customer-select');
			$(this).removeClass('customer-selectAll');
		}
	});
	$(".main").on('click','.customer li',function(){
		$(this).find('.customer-radio').toggleClass('customer-select');
		var len = $('.customer-radio').length;
		var lens = $('.customer-select').length;
		if(len>lens){
			$('.customer-radioall').removeClass('customer-selectAll');
		}else{
			$('.customer-radioall').addClass('customer-selectAll');
		}
	});*/
	$('.customer-ctrl-choose').click(function(){
		if(!$('.customer-radioall').hasClass('customer-selectAll')){
			$('.customer-radio').addClass('customer-select');
			$('.customer-radioall').addClass('customer-selectAll');
		}else{
			$('.customer-radio').removeClass('customer-select');
			$('.customer-radioall').removeClass('customer-selectAll');
		}
	});
	/* 发送客户 */
	$('.customer-ctrl-btn>a').click(function(){
		var arr = [];
		$('.customer-select').each(function(){
			var data_id = $(this).attr('data-id');
			//tip(data_id.indexOf("{"));
			if(data_id.indexOf("{")<0)
				arr.push(data_id);
		});
		if(arr==""){
			tip("请至少选择一个客户！");return;
		}
		document.location.href=contextPath+"/keeper/chooseCoupon?personalIDs="+arr;
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
			url: contextPath+"/keeper/customer/data",
			data: {currentPage:currentPage,pageSize:pageSize},
			dataType:"json",
			success: function(data){
			  	if(data.status==1){
			       var arr=data.data.customer;
			       //$("#currentPage").val(data.data.pageList.currentPage);
				   //$("#pageSize").val(data.data.pageList.pageSize);	
				   $("#totalPage").val(data.data.pageList.totalPage);	
			       for(var index in arr){			      
				    	var html=$("#template_body").html();					    		
				    	html=html.replace(/{Mobile}/,arr[index].Mobile).replace(/{PersonalID}/,arr[index].PersonalID).replace(/{PersonalID}/,arr[index].PersonalID).replace(/{CreateTime}/,arr[index].CreateTime);				    					    	
				    	$("#listData").append(html);
				    }
			        $(".customer li").unbind();//
				   	$('.customer li').click(function(){
						$(this).find('.customer-radio').toggleClass('customer-select');
						var len = $('.customer-radio').length;
						var lens = $('.customer-select').length;
						if(len>lens){
							$('.customer-radioall').removeClass('customer-selectAll');
						}else{
							$('.customer-radioall').addClass('customer-selectAll');
						}
					});
			    }

			}
		});		
	}
