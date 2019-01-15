require(["./requirejs.config"],()=>{
			require(["jquery","template","url","footer","header","cookie"],($,template,url)=>{
				$(function(){
						//判断是否存有cart的cookie
						if($.cookie("cart")){
								//通过cookie拼接购物车
							let arrCart=[] ;
						let cartBox = $("#cart"),
						     tbody = $("tbody",cartBox),
							allCheck = $("#allCheck");
					    let allPricAll = 0;//商品总价
							//console.log(cartBox);
							function cart(){
								arrCart = JSON.parse($.cookie("cart"));
									// console.log("cookie",arrCart);
									let str = "";
									arrCart.forEach((element,index)=>{

										let intiNum = element.num;
										let initPrice = element.price;
										let allPric = (intiNum*element.price).toFixed(2);
										// console.log(allPric);
										// allPricAll += Number(allPric);//计算总价
										let	price = Number(allPric);
											str += `<tr data-id="${element.id}">
														<td>
															<input type="checkbox" class="check"/>
															<div class="cartImg"><img src="${element.img}"></div>
															<div class="cartType">
																<p class="cartTile">${element.title}</p>
																<p><span class="cartColor">颜色：${element.color}</span>&nbsp;&nbsp;<span class="cartSize">尺寸：${element.size}</span></p>
															</div>
														</td>
														<td>￥<span class="price">${element.price}</span></td>
														<td><span class="cartReduce cartNum">-</span><span class="carMany">${element.num}</span><span class="cartAdd cartNum">+</span></td>
														<td>￥<span class="manythis red">${allPric}</span></td>
														<td>
															<a href="javascript:;" class="delBtn">删除</a>
														</td>
													
													</tr>`;
										//商品件数和商品款数				

								})
								//把str赋给tbody
								tbody.html(str);
								//商品总价
								// $("#cartMoney").html(allPricAll);
								
							}	
							cart();

							var n = 0;//记录单选按钮被选中的数量
							// console.log(num);
							//点击减数量按钮绑定事件
							cartBox.on("click",".cartReduce",function(event){
								const $src = $(event.target);
								let thisTr = $(this).parents("tr");//找到当前行
								let num = parseInt(thisTr.find(".carMany").text());
								if(--num<1){
									alert("数量不能小于1");
									num = 1;
								}else{
									$(".carMany",thisTr).text(num);
								}
								
							cartNumChange(num,thisTr);
							calcPrice();
								
							})
							//点击加数量按钮
							cartBox.on("click",".cartAdd",function(event){
								const $src = $(event.target);
								let thisTr = $(this).parents("tr");//找到当前行
								let num = parseInt(thisTr.find(".carMany").text());
								// console.log(thisTr);
								$(".carMany",thisTr).text(++num);
								cartNumChange(num,thisTr);
								// cart();
								calcPrice();
							})

							//点击删除按钮
							cartBox.on("click",".delBtn",function(event){
								const $src = $(event.target);
								let thisTr = $(this).parents("tr");//找到当前行
								// console.log($(".delBtn").parents("tr"));
								//找到这一条的data-id属性值
								let data_id = thisTr.attr("data-id");
								// console.log(data_id);
                                 let cartTile = $(".cartTile").text();
								//在cookie中这条数据找到这条数据并删除，再给arrcart重新赋值
								arrCart.forEach(function(element,index){
									if(element.id === data_id){
										arrCart.splice(index,1);	
									}
									
								})
								//判断这行是否被选中  选中了就n--
								if(thisTr.find(".check")[0].checked)n--;
								//git push
								//把新数组存入cookie
								// $.cookie("cart",JSON.stringify(arrCart),{expires:-1,path:"/"});
								$.cookie("cart",JSON.stringify(arrCart),{expires:3,path:"/"})
								thisTr.remove();
								// cart();
								calcPrice();
								
							})

							//点击全选按钮
							cartBox.on("click","#allCheck",function(event){
								if($("#allCheck").get(0).checked){
									for(let i = 0;i < $(".check").length;i++){
										$(".check").get(i).checked = true;
										
									}
									n = $(".check").length;
								}else{
									for(let i = 0;i < $(".check").length;i++){
                                        $(".check").get(i).checked = false;
									}
									n = 0;
								}
								calcPrice();
							})
							//点击数量加减时cookie里的num值也要变化
                            function cartNumChange(num,thisTr){
								// console.log("obj",arrCart);
								// let thisTr = $(this).parents("tr");
								let data_id = thisTr.attr("data-id");
								let arrCart2 = [];
								arrCart.forEach(function(element,index){
									
									if(data_id === element.id){
										// console.log(data_id, element.id)
										element.num = num;	
									}
									arrCart2.push(element);
									// console.log(arrCart2);
								})
								$.cookie("cart",JSON.stringify(arrCart2),{expires:3,path:"/"})
								// cart();
							}
                            //计算总价格
							function calcPrice(){
								let sum = 0;
								//找到被选中的那些行，然后把这些行的总价，累加
								let aTr = $(".check").parents("tr");
								// console.log(1,price);

								for(let j =0; j < aTr.length; j++){
									let price = Number(aTr.eq(j).find(".price").text());
									let Ninput = Number(aTr.eq(j).find(".carMany").text());
									let	allPrics = price*Ninput
									console.log(aTr)
									if(aTr.eq(j).find(".check")[0].checked){
										aTr.eq(j).find(".manythis").text(allPrics.toFixed(2));
										sum+=allPrics;
									}

								}
								if(n === aTr.length){
                                   $("#allCheck").get(0).checked;
								}
								$("#cartMoney").html(sum.toFixed(2));
							}
							//点击复选框
							cartBox.on("click",".check",(event)=>{
								let sum=0;
								
								$(".check:checked").each((index,element)=>{
									sum += Number($(element).parents("tr").find(".manythis").text());
								})
								$("#cartMoney").text(sum.toFixed(2));
								n = $(".check:checked").length;
								$("#allCheck").get(0).checked = (n===$(".check").length);
							})
						}
				})
		})
})
