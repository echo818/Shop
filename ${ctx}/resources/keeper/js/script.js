function tip(msg){
	var html='<div class="form-tips">'+msg+'</div>';
	$(".main").prepend(html);
	window.setTimeout(function(){
		$(".form-tips").remove();
	}, 3000);	
}

function regexMobile(mobile){
	var reg=/^(13[0-9]|14[57]|15[012356789]|17[678]|18[0-9])[0-9]{8}$/;
	if(reg.test(mobile)){		
		return true;
	}else{
		tip("请输入正确的手机号码");
		return false;
	}
}
function regexCode(code){
	var reg=/\d{6}/;
	if(reg.test(code)){		
		return true;
	}else{
		tip("请输入验证码");
		return false;
	}
}

/* 倒计时 */
function countDown(that,ss){
	var s = ss;
	$(that).addClass('count-time').removeClass('sendCode').html('倒计时 <span>'+s+'</span> 秒');
	var time = setInterval(function(){
		s--;
		$(that).children().html(s);
		if(s < 0){
			clearInterval(time);
			$(that).removeClass('count-time').addClass('sendCode').html('获取验证码');
			s = ss;			
		}
	},1000);
}		
	