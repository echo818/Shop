$(function(){
	/* productDetail */
	/* shopCar */
	$('.shopcar-add').click(function(){
		var num = parseInt($(this).prev().html());
		num++;
		$(this).prev().html(num);
		calcPrice();
		if(num > 1){
			$(this).prev().prev().removeClass('shopcar-gray');
		}
	});
	$('.shopcar-cut').click(function(){
		var num = parseInt($(this).next().html());
		if(num > 2){
			num--;
			$(this).next().html(num);
			calcPrice();
		}else if(num == 2){
			num--;
			$(this).next().html(num);
			$(this).addClass('shopcar-gray');
			calcPrice();
		}else{
			return false;
		}
	});
	//收藏
	$('.prod-detail-ctrl').click(function(){
		if(!$(this).hasClass('prod-ctrl-active')){
			//$.ajax() 发送ajax数据交互
			$(this).addClass('prod-ctrl-active');
		}else{
			//$.ajax() 发送ajax数据交互
			$(this).removeClass('prod-ctrl-active');
		}
	});
	$('.prod-detail-cate a').click(function(){
		$('.prod-detail-cate a').removeClass('prod-cate-active');
		$(this).addClass('prod-cate-active');
		calcPrice();		
	});
	$('.prod-detail-cate>a:first').click();
	//加入购物车
	$(".prod-detail-car").click(function(){
		var goodsID=$(".prod-detail-content").attr("data-id");
		var goodsCnfClassID=$(".prod-cate-active").attr("data-id");
		var number=$(".shopcar-num").text();
		$.ajax({
			type: "POST",			
			url: contextPath+"/shop/shoppingCart/add",
			data: {goodsID:goodsID,goodsCnfClassID:goodsCnfClassID,number:number},
			dataType:"json",
			success: function(data){
			    if(data.status==1){
			    	tip("添加成功");
			    }else{
			    	tip(data.message);
			    }
			}
		});		
	});
	//购买
	$(".prod-detail-buy").click(function(){
		var goodsID=$(".prod-detail-content").attr("data-id");
		var goodsCnfClassID=$(".prod-cate-active").attr("data-id");
		var number=$(".shopcar-num").text();
		$.ajax({
			type: "POST",			
			url: contextPath+"/shop/shoppingCart/add",
			data: {goodsID:goodsID,goodsCnfClassID:goodsCnfClassID,number:number},
			dataType:"json",
			success: function(data){
			    if(data.status==1){
			    	window.location.href=contextPath+"/shop/order/orderConfirm";
			    }else{
			    	tip(data.message);
			    }
			}
		});		
	});
});
function calcPrice(){
	var price=parseFloat($(".prod-cate-active").attr("data-price"));
	$(".currentPrice").html(price);
	var number=parseFloat($(".shopcar-num").text());
	$(".prod-detail-price").html("合计：￥"+price*number);
}