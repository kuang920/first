

注册：使用正则验证手机号 密码是否符合规范 
      点击邮箱注册目前只做了input框文字变化 手机号注册可正常使用  
      注册成功可跳转登录

登录：登录成功 存入cookie  3天后过期  header上账户显示用户已经登录状态
      登录成功可以跳转首页

首页：轮播图  商品用的假借口数据  前面几张图为了好看点没有用接口  
      页面滚动一定距离  header固定在顶部

列表页：调用接口

详情页：选择商品属性 如果没有登录状态点击加入购物车  可以直接跳转到登陆页面
        如果商品属性没按标准选择会弹提示框
        成功加入购物车  购物车 数量++  数量根据id计算id相同只加一次

购物车： 点击全选计算总价  目前单选框有些问题需要处理
         点击删除 cookie里的对应那条删除  点击加减  对应的cookie改变该行的数量以及对应行上面的总价格

