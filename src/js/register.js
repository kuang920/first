//注册业务逻辑
require(["./requirejs.config"],()=>{
    //引入register需要的模块
    require(["jquery","header","footer","cookie"],()=>{
        //切换注册方式
        //切换到手机注册
        $("#reg-phone").on("click",()=>{
            $(".phn-input",$(".reg-main")).get(0).value = "请输入手机号";
            $(".phn-input",$(".reg-main")).get(1).value = "请输入短信验证码";
        })
        //切换到邮箱注册
        $("#reg-eamail").on("click",()=>{
            $(".phn-input",$(".reg-main")).get(0).value = "请输入电子邮箱";
            $(".phn-input",$(".reg-main")).get(1).value = "请输入邮箱验证码";
        })
        

        //input框聚焦时value清空
        $(".reg_input",$(".reg-main")).focus(function(){
            this.value = "";
        })


        $("#regBtn").on("click",function(e){
            // console.log(111);
            //使用正则验证用户输入内容是否符合规则
            //找对象
            var reg_phone = $(".phn-input",$(".reg-main")).get(0).value,
                reg_psd1 = $("#reg_psd1",$(".reg-main")).get(0).value,
                reg_psd2 = $("#reg_psd2",$(".reg-main")).get(0).value;
            //正则表达式
            var reg_Phone = /^[1][3,4,5,7,8][0-9]{9}$/,
                reg_Psd1 = /^\w{8,}$/,  //密码只能为8位以上的数字字母下划线
                reg_Psd2 = /^\w{8,}$/; 
            if(!reg_Phone.test(reg_phone)){
                alert("请输入正确的手机号码");
            }else if(!reg_Psd1.test(reg_psd1)){
                alert("请输入8位以上为数字字母下划线的密码");
            }else if(reg_psd1 !== reg_psd2){
                alert("两次密码输入不一致");
            }else{
               $.ajax({
                   type : "post",
                   url : "http://localhost/php/api/v1/register.php",
                   data : {
                       username : $("#reg_phone").val(),
                       password : $("#reg_psd1").val()
                   },
                   success: function(res){
                    //    console.log(res);
                       if(res.res_code === 1){
                           alert("注册成功，马上去登录");
                           location.href = "/html/login.html";
                       }
                   },
                   dataType : "json"
               })
               //阻止默认事件
                e.preventDefault();
                return false;
                }
        
        })
    })
})