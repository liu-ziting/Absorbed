$('.tabbar li a').on('click', function(e) {
    e.preventDefault();
    var that = $(this),
        li = that.parent(),
        ul = li.parent();
        setTimeout(() => {
           if(li.index() == '0'){
	        	$(".one").css("left","0vw");
	        	$(".two").css("left","100vw");
	        	$(".three").css("left","200vw");
	        }else if(li.index() == '1'){
	        	$(".one").css("left","-100vw");
	        	$(".two").css("left","0vw");
	        	$(".three").css("left","100vw");
	        }else if(li.index() == '2'){
	        	$(".one").css("left","-200vw");
	        	$(".two").css("left","-100vw");
	        	$(".three").css("left","0vw");
	        };
        }, 800);
    if(!ul.hasClass('move') && !li.hasClass('active')) {
        ul.children('li').removeClass('active');
        ul.css('--x-n', li.position().left + li.outerWidth() / 2 + 'px');
        li.addClass('move');
        ul.addClass('move');
        setTimeout(() => {
            ul.removeClass('move');
            li.removeClass('move').addClass('active');
            ul.css('--x', li.position().left + li.outerWidth() / 2 + 'px');
        }, 1200);
    }

});
//时间选择切换
$(".topList li").click(function(){
	timestop();
	var _index = $(this).index();
	$(this).not(".topList li:last-child").addClass('active').siblings().removeClass('active')
	$(".buttonBg em").removeClass("End").addClass("Start");
	$('#minute_show').html($(".topList .active input").val()/60);
	$('#second_show').html('00');
	$(".buttonBg").addClass("buttonColorMr").removeClass("buttonColorZt");
});

$(".Start").click(function(){
	var intDiff = $(".topList .active input").val();
	if($(this).hasClass("Start")){
		timer(intDiff);
		bf();
		$(".yicon").addClass("dd");
		$(this).removeClass("Start").addClass("End");
		$(".buttonBg").addClass("buttonColorZt").removeClass("buttonColorMr");
	}else{
		timestop();
		rbf();
		$(".yicon").removeClass("dd");
		$(this).removeClass("End").addClass("Start");
		$(".buttonBg").addClass("buttonColorMr").removeClass("buttonColorZt");
		$('#minute_show').html($(".topList .active input").val()/60);
		$('#second_show').html('00');
	}
	
})

//倒计时
var timecount;
function timer(intDiff) {
	timecount = setInterval(function() {
		var hour = 0,
			minute = 0,
			second = 0; 
		if(intDiff > 0) {
			hour = Math.floor(intDiff / (60 * 60));
			minute = Math.floor(intDiff / 60) - (hour * 60);
			second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
		}
		if(minute <= 9) minute = '0' + minute;
		if(second <= 9) second = '0' + second;
		//打印到dom
		$('#minute_show').html(minute);
		$('#second_show').html(second);
		
		console.log(intDiff);
		if(intDiff == 0){
			timestop();
			
		};
		intDiff--;
	}, 1000);
	
}

//停止计时器
function timestop() {
	var minute = $("#minute_show").text();
	var second = $("#second_show").text();
	var time = parseInt($("#minute_show").text()) * 60 + parseInt($("#second_show").text())
	timecount = window.clearInterval(timecount); 
	$(".buttonBg em").removeClass("End").addClass("Start");
	$(".buttonBg").addClass("buttonColorMr").removeClass("buttonColorZt");
};

//播放音乐
$(".yicon").click(function(){
	if($(this).hasClass("dd")){
		$(this).removeClass("dd");
		rbf();
	}else{
		$(this).addClass("dd");
		bf();
	}
	
})

//暂停
function rbf(){
 var audio = document.getElementById('music'); 
 audio.pause();
};
//播放  
function bf(){
 var audio = document.getElementById('music'); 
 audio.play();
};