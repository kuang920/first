//list业务逻辑
require(["./requirejs.config"],()=>{
    require(["jquery","item","url","footer","header","cookie"], ($,item,url)=>{
        item.init(url.baseUrlRap + "/list",$("#list-item"));
        
    })
})