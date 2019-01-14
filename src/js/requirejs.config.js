//配置
require.config({
    baseUrl:"/",// webserver根目录
    paths:{
        "jquery" : "libs/jquery/jquery-1.11.3.min",
        "cookie" : "libs/jquery/jquery-plugins/jquery.cookie",
        "header" : "js/component/header",
        "footer" : "js/component/footer",
        "url" : "js/component/url",
        "template" : "libs/template-web",
        "item" : "js/component/item",
        "bootstrap" : "libs/bootstrap/js/bootstrap",
        
    },
    //不符合AMD规范的模块，垫片
    shim:{
    	"cookie" : {
    		deps : ["jquery"]
        },
        bootstrap: {
			deps: ['jquery']
		}
    }
})