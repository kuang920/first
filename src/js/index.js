//首页业务逻辑
require(["./requirejs.config"],() =>{
	//引入index需要的模块
	require(["jquery","item","url","header","footer","cookie"],($,item,url) =>{
		//轮播图
		$(function(){
			//找对象
			let ul = $("ul",$("#carousel")),
				imgs = $("li",ul),
				index = 0,
				btns = [],
				len = imgs.length,
				liWidth = imgs.eq(0).width();
			//拼接按钮
			for(let i = 1; i <= len; i++){
				btns.push($("<li>").html(i).addClass(i === 1?"ac":"").appendTo($("#carousel ol")));
			}
            
			//在结尾追加第一张img,计算ul的宽度
			ul.append(imgs.eq(0).clone());
			ul.width(liWidth*(len+1));
			
			//遍历按钮 给每个按钮绑事件
		    $.each(btns,(i,btn)=>{
				btn.on("click",function(){
					btns[index].removeClass("ac");
					$(this).addClass("ac");
					index = $(this).index();
					//ul移动到当前位置
					ul.stop().animate({left:-index*liWidth},"slow");
				})
			})
			
			
			//自动播放
			var timer = null;
			$("#carousel").hover(function(){
				clearInterval(timer);
			},(function autoPlay(){
				timer = setInterval(() => {
					//当前图片及按钮样式切换
					btns[index].removeClass("ac");
					if(++index >= len){
						//可以移动到最后一张，但当动画结束之后瞬间移动到第一张
						ul.stop().animate({left:-index*liWidth},"slow",function(){
							ul.css({left:0});
						});
						index = 0;
					}else{
						ul.stop().animate({left:-index*liWidth},"slow");
					}
					btns[index].addClass("ac");
				}, 2500);
				return autoPlay;
			})())

        // 人气单品
		item.init(url.baseUrlRap+"/hot-banner",$("#hot-item"));
		item.init(url.baseUrlRap+"/fashionW-banner",$("#fashionW-item"));
		item.init(url.baseUrlRap+"/hot-banner",$("#man-item"));
		item.init(url.baseUrlRap+"/fashionW-banner",$("#surprise-item"));
	 }
	    
	 )


    
	
 })


 
})