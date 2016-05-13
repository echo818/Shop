	$(function(){
		/* shopCar */
		$('.shopcar-add').click(function(){
			var num = parseInt($(this).prev().html());
			num++;
			$(this).prev().html(num);
			calcTotalPrice();
			updateShoppingCart($(this).prev().attr("data-id"),num);
			if(num > 1){
				$(this).prev().prev().removeClass('shopcar-gray');
			}
		});
		$('.shopcar-cut').click(function(){
			var num = parseInt($(this).next().html());
			if(num > 2){
				num--;
				$(this).next().html(num);
				calcTotalPrice();
				updateShoppingCart($(this).next().attr("data-id"),num);
			}else if(num == 2){
				num--;
				$(this).next().html(num);
				calcTotalPrice();
				updateShoppingCart($(this).next().attr("data-id"),num);
				$(this).addClass('shopcar-gray');
			}else{
				return false;
			}
		});
		$('.shopcar-del').click(function(){
			$(this).parent().remove();
			calcTotalPrice();			
			$.post(contextPath+"/shop/shoppingCart/delete", {shoppingCartID:$(this).attr("data-id")},
				  function(data){
				 	 				    	
				    				  			   
				},"json"); 
		});
		calcTotalPrice();		
	});
	function calcTotalPrice(){
		var amount=0;
		$(".shopcar li").each(function(){			
			var price=$(this).find(".price").text();
         	var num=$(this).find(".shopcar-num").text();
         	subtotal=price*num;
         	$(this).find(".subtotal").text(subtotal);
         	amount+=subtotal;
		});
		$(".amount").text(amount);
	};
	function updateShoppingCart(shoppingCartID,number){
		$.post(contextPath+"/shop/shoppingCart/update", {shoppingCartID:shoppingCartID,number:number},
				  function(data){
				 	 				    	
				    				  			   
				},"json"); 
	}