//首页业务逻辑
require(["./requirejs.config"],() =>{
	//引入index需要的模块
	require(["jquery","header","footer","cookie"],() =>{
		//轮播图
		$(function(){
			//找对象
			let ul = $("ul",$("#carousel")),
				img = $("li",ul),
				index = 0,
				btns = [],
				len = img.length,
				liWidth = img.eq(0).width();
			//拼接按钮
			for(let i = 1; i <= len; i++){
                btns.push($("<li>").html(i).addClass(i===1?"ac":"").appendTo($("#div1 ol")));
			}
		})
	})
	
})
