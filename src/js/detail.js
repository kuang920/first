
require(["./requirejs.config"],()=>{
    require(["header","jquery","template","url","footer","cookie"],(header,$,template,url)=>{
         $(function(){
             //获取id
             let arrSearch = location.search.slice(1).split("=");
             //console.log(arrSearch);
             let searchObj = {};
             searchObj[arrSearch[0]] = arrSearch[1];
             console.log(searchObj);
             
             //发送获取详情页该商品具体信息
             $.ajax({
                 url : url.baseUrlRap + "/detail",
                 type : "get",
                 dataType : "json",
                 data : searchObj,
                 success : function(res){
                   // console.log(res);
                    if(res.res_code===1){
                        let detail = res.res_body.data;
                        //通过模板渲染结构
                        let html = template("detail-template",{detail});
                        $("#detail-box").html(html);
                        
                    }
                 }

                 
                 
             })

             //发送获取详情页推荐信息
             $.ajax({
                url : url.baseUrlRap + "/recommend",
                type : "get",
                dataType : "json",
                data : searchObj,
                success : function(res){
                   console.log(res);
                   if(res.res_code===1){
                       let recommend = res.res_body.data;
                       //通过模板渲染结构
                       let html = template("detail_recommend",{recommend});
                       $("#del_recommend").html(html);

                       // 购物操作
                       let imgSrc = $("#detailIag").attr("src");
                       let price = $("#detailPrice").text();
                       let title = $(".stitle").text();
                       //添加监听事件
                       var cartObj = {
                           id : arrSearch[1],//把id存入obj
                           color : null,
                           size : null,
                           num : 0,
                           img : imgSrc,
                           price : price,
                           title : title
                       };
                       var box = $("#inner_right");
                       //选择颜色
                       box.on("click",".color",function(event){
                        const $src = $(event.target);
                        $src.css("border","2px red solid").siblings().css("border","2px solid #cccccc");
                        cartObj["color"] = $src.text();
                      });

                      //选择尺寸
                      box.on("click",".size",function(event){
                        const $src = $(event.target);
                        $src.css("border","2px red solid").siblings().css("border","2px solid #cccccc");
                        cartObj["size"] = $src.text();
                      }); 
                      //选择数量
                      var num = $("span",$(".detailMany")).eq(1).text();
                          cartObj["num"] = num;
                    box.on("click",".add",function(event){
                        
                        $("span",$(".detailMany")).eq(1).text(++num);
                        cartObj["num"] = num;
                      }); 
                      box.on("click",".reduce",function(event){
                        let num = $("span",$(".detailMany")).eq(1).text();
                        if(num<=1){
                            alert("数量不能小于1")
                        }else{
                            $("span",$(".detailMany")).eq(1).text(--num);
                        }
                        cartObj["num"] = num;
                      }); 

                      
                    //判断cookie是否已经有值
                    var arrCart = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
                    box.on("click","#detailAddCart",function(event){
                        //判断用户是否已经登录
                        if($.cookie("user")){
                             //判断商品属性是否都选择好了  遍历cartObj是否有属性值为空的
                            for(let key in cartObj){
                                if(cartObj[key] === null){ alert("请选择商品属性");}
                            }
                                let index;
                                let isExist = arrCart.some(function(item, i){
                                    //some只要遇到满足条件的，返回true，查找就结束
                                    index = i;
                                    return item.id === cartObj.id;
                                })
                                if(isExist){
                                    //arr[index]跟obj一样
                                    arrCart[index].num++;
                                }else{
                                    arrCart.push(cartObj);
                                }
                                
                                //存在根目录里 3天后过期
                                $.cookie("cart", JSON.stringify(arrCart),{expires:3,path:"/"});
                    
                                console.log($.cookie("cart"));
                                header.headerAdd();
                        }else{
                            if(confirm("还没登录？去登录")){
                                window.location.href = "http://localhost:2000/html/login.html";
                            }
                        }
                        
                     });
                    
                   }
                }    
            })
            
            

         })
         
         
    })
})