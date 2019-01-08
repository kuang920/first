//定义一个模块，这个模块依赖于jquery
define(["jquery"],()=>{
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
    }
    return new Header();
})
