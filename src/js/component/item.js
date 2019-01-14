define(["jquery","template"], ($,template)=>{
    function Item(){
        
    }
    Item.prototype.init = function(url,param){
         //先loade到页面得到url，然后去请求数据，渲染结构
         //loade  resolve
         new Promise((resolve,reject)=>{
             //console.log(url);
             //list.html 里的id===list-item 的div加载item模板的html数据
             param.load("/html/component/item.html",()=>{
                 console.log(111);
                 resolve();                
             })
         }).then(()=>{
             $.ajax({
                 url : url,
                 type : "get",
                 success : function(res){
                    if(res.res_code === 1){
                        let list = res.res_body.data;
                        //通过模板引擎渲染结构
                        let html = template("list-template",{list:res.res_body.data});
                        $("ul",param).html(html);
                    }
                 }
             })
         })
    }
    return new Item();
})