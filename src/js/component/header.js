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
        		
        	})
        }
    }
    return new Header();
})
