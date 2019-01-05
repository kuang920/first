define(["jquery"],()=>{
    class Footer{
        constructor(){
            this.init();
        }
        
        init(){
        	//加载footer.header
        	new Promise((resolve,reject) => {
        		$("footer").load("/html/component/footer.html",()=>{
                    resolve();
        		})
        	}).then(()=>{
        		
        	})
        }
    }
   return new Footer();
})