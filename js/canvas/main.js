        var canvas=document.getElementById("canvas")
        var context=canvas.getContext("2d")
        var eraser=document.getElementById("eraser")
        var brush=document.getElementById("brush")
        var actions=document.getElementById("actions")
        var lastpoint={x:undefined,y:undefined}
        var using=false;
        var usingEraser=false;
        var strokecolor="black";
        setCanvasSize()
        listenToUser()
        addToolEvent()
        save.onclick=function(){
            var base64 = canvas.toDataURL("image/png")
            var link=document.createElement("a")
            link.href=base64
            link.download="mypic"
            link.click()
        }
        clear.onclick=function(){
            var x=document.documentElement.clientWidth
            var y=document.documentElement.clientHeight
            console.log("clear:x:"+x+";y:"+y)
            context.clearRect(0,0,x,y)
        }
        black.onclick=function(){
          black.classList.add("active")
          strokecolor="black";
          red.classList.remove("active")
          green.classList.remove("active")
          blue.classList.remove("active")
        }
        red.onclick=function(){
          red.classList.add("active")
          strokecolor="red";
          black.classList.remove("active")
          green.classList.remove("active")
          blue.classList.remove("active")
        }
        green.onclick=function(){
          green.classList.add("active")
          strokecolor="green";
          red.classList.remove("active")
          black.classList.remove("active")
          blue.classList.remove("active")
        }
        blue.onclick=function(){
          blue.classList.add("active")
          strokecolor="blue";
          red.classList.remove("active")
          green.classList.remove("active")
          black.classList.remove("active")
        }
        function addToolEvent(){
            eraser.onclick=function(){//小写
                usingEraser=true;
                eraser.classList.add("active")
                pen.classList.remove("active")
                // actions.className="eraseon"
            }
            pen.onclick=function(){
                usingEraser=false;
                pen.classList.add("active")
                eraser.classList.remove("active")
                //actions.className="brushon"

            }
        }
        
        function listenToUser(){
            if("ontouchstart" in document){
                document.ontouchstart=function(event){
                    console.log("down")
                    using=true;
                    var x=event.touches[0].clientX
                    var y=event.touches[0].clientY
                    if(usingEraser){
                        context.clearRect(x-5,y-5,10,10)
                    }else{
                        lastpoint.x=x
                        lastpoint.y=y
                    }
                 }
                document.ontouchmove=function(event){
                    console.log("move")
                    if(using){
                        var x=event.touches[0].clientX
                        var y=event.touches[0].clientY
                        if(usingEraser){
                            context.clearRect(x-5,y-5,10,10)
                        }else{
                            drawLine(lastpoint.x,lastpoint.y,x,y)
                            lastpoint.x=x
                            lastpoint.y=y
                        }
                    }
            
                 }
                 document.ontouchend=function(event){
                         console.log("touched")
                         using=false;
                }
            }else{
                document.onmousedown=function(event){
                    console.log("down")
                    using=true;
                    var x=event.clientX
                    var y=event.clientY
                    if(usingEraser){
                        context.clearRect(x-5,y-5,10,10)
                    }else{
                        lastpoint.x=x
                        lastpoint.y=y
                    }
                }
                document.onmousemove=function(event){
                    console.log("move")
                    if(using){
                        var x=event.clientX
                        var y=event.clientY
                        if(usingEraser){
                            context.clearRect(x-5,y-5,10,10)
                        }else{
                            drawLine(lastpoint.x,lastpoint.y,x,y)
                            lastpoint.x=x
                            lastpoint.y=y
                        }
                    }
                
                }
                document.onmouseup=function(event){
                         using=false;
                    }
                }
            
        }
        function drawCircle(x,y,radius){
            context.beginPath()
            context.arc(x,y,radius,0,Math.PI*2)
            context.fill()
        }
        function drawLine(x1,y1,x2,y2){
            context.beginPath()
            context.strokeStyle=strokecolor
            context.lineWidth=5
            context.moveTo(x1,y1)
            context.lineTo(x2,y2)
            context.stroke()
            context.closePath()
        }
        function setCanvasSize(){
            onresize()
            window.onresize=onresize()
            function onresize(){//widow.不是docuemnt.
                canvas.width=document.documentElement.clientWidth;//clientwidth
                canvas.height=document.documentElement.clientHeight//clientHeight
            }
        }