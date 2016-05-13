$(function(){
	calcPrice();
	$("select[name='CachCouponCode']").change(function(){
		calcPrice();
    });	
	$("form").submit(function(){
		var recAddressID=$("input[name='recAddressID']").val();		
		if(recAddressID)
			return true;
		tip("请选择收货地址");
		return false;
		});
})
function calcPrice(){
	var TotolPrice=0;
	var DiscountPrice=0;
	var FinalPrice=0;
	$(".order-getgoods-detail li").each(function(){			
		var price=parseFloat($(this).find(".price").text());
     	TotolPrice+=price;
     	DiscountPrice+=parseFloat($(this).find("select[name='CachCouponCode'] option:selected").attr("data-price"));
	});	
	DiscountPrice+=parseFloat($(".order-getgoods-commen").find("select[name='CachCouponCode'] option:selected").attr("data-price"));
	FinalPrice=TotolPrice-DiscountPrice+10;
	$("#TotalPrice").text(TotolPrice);
	$("#DiscountPrice").text(DiscountPrice);
	$("#FinalPrice").text(FinalPrice);
}