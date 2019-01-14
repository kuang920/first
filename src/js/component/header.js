//定义一个模块，这个模块依赖于jquery
define(["jquery","cookie"],()=>{
    class Header{
        constructor(){
            this.init();
        }
        
        init(){
        	//加载html.header
        	new Promise((resolve,reject) => {
        		$("header").load("/html/component/header.html",()=>{
                    resolve();
        		})
        	}).then(()=>{
                 this.scroll(this);
                 this.loginSucc();
                 this.headerAdd();
                 
        	})
        }
        //屏幕滚动到613px时  header-scroll样式变为feixd
        scroll(){
            $(window).on("scroll",function(){
                var scrollTop = $(window).scrollTop();
                if(scrollTop > 613){
                    $("#header-scroll").css({"position": "fixed","top":"0"});    
                }
                if(scrollTop < 613){
                    $("#header-scroll").css({"position": "relative"});
                }
            })
        }
        
         
        //判断是否登录
        loginSucc(){
            // this.exit();
            if($.cookie("user")){
                var obj = JSON.parse($.cookie("user"));
                //  console.log(obj);
                //  console.log($("#log_reg"));
                $("#right_l").removeClass("yc");
                $("#log_reg").addClass("yc");
                // console.log(obj["name"]);
                $("#name").html(obj["name"]);
            }
           
        }

        // exit(){
        //    $("#exit").on("click",function(){
        //     $.cookie(
        //         "user",
        //         {expires:-1,path:"/"},
        //     )
        //    })
        // }
        
        //当加入购物车是其他页面购物车数量改变
        headerAdd(){
            
            if($.cookie("cart")){
            let arrCart = JSON.parse($.cookie("cart"));
            $("#headerNum").html(arrCart.length);
            }
        }
    }
    return new Header();
})
