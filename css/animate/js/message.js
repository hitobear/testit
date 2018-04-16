!function(){
    let view=document.getElementById("message");
    let model={
        init:function(){
            var APP_ID = 'yrTfh0G8pmGF36bW95whixQX-gzGzoHsz';
            var APP_KEY = 'q8Mhufc7qhNYOIAjBDLL9a9n';
            AV.init({
            appId: APP_ID,
            appKey: APP_KEY,})
        },
        fetch:function(){
            let query = new AV.Query('Message');
            return query.find()
        },
        save:function(name,content){
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({  // Promise 对象
              'name': name,
              'content': content
            })
        },
    }
    let controller = {
        view:null,
        model:null,

        init:function(view,model) {
            console.log(view)
            this.view=view;
            this.model=model;
            this.model.init();
            this.form = view.querySelector('form');
            this.messageList=view.querySelector('#messageList');  
            this.bindEvents();
            this.loadMessage();
        },
        bindEvents:function(){
            this.form.addEventListener('submit', (e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        },
        loadMessage:function(){
            this.model.fetch().then((messages)=>{
                let array = messages.map((item)=> item.attributes )
                array.forEach((item)=>{
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                  })
            })
        },
        saveMessage:function(){
            let myForm=this.form
            console.log("save message..")
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            this.model.save(name,content).then((message)=>{
                let item=message.attributes;
                let li = document.createElement('li')
                li.innerText = `${item.name}: ${item.content}`
                this.messageList.appendChild(li);
                myForm.querySelector('input[name=content]').value = '';
            })
        },
        
    }
    controller.init(view,model);
}.call()