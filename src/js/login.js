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
                },
                dataType : "json"
            })
            //阻止默认事件
            return false;
            e.preventDefault();
        })

    })
})