//login业务逻辑
require(["requirejs.config"],()=>{
    //引入login需要的配置文件
    require(["jquery","header","footer","cookie"],()=>{
        $("#logBtn").on("click",function(e){
            $.ajax({
                type : "post",
                url : "http://localhost/php/api/v1/login.php",
                data : {
                    username : $("#username").val(),
                    password : $("#password").val()
                },
                success: function(res){
                    console.log(res);
                    if(res.res_code === 1){
                        $.cookie(
                            "user",
                            JSON.stringify({
                                id : res.res_body.id,
                                name : res.res_body.username
                            }),
                            {expires:3,path:"/"},
                            
                        )
                        if(confirm("登录成功，去首页")){
                            
                            window.location.href = "/index.html";
                        }
                        
                    }else{alert("用户名或密码错误")}
                },
                dataType : "json"
            })
            //阻止默认事件
            return false;
            e.preventDefault();
        })

    })
})