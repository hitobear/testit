
var css1=`/* 
* 面试官你好，我是lily
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

*{
transition: all 1s;
}
html{
background: #eee;
}
#code{
border: 1px solid #aaa;
padding: 16px;
}
/* 太单调了，添加背景色~ */

html {
    
    background: rgb(0,43,54);
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }




/* 现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
width: 50%; left: 0; position: fixed; 
height: 100%;
}

#paper > .content {
display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */`

var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
let css2 = `/* 接下来用一个优秀的库 marked.js
* 把 Markdown 变成 HTML
*/`

let css3 = `
/*
* 这就是我的会动的简历
* 谢谢观看
*/
`
let timeInterval=20 //间隔时间

function writeCss(prev,content,fn){
let n=0;
let length=content.length;
let domCode=document.getElementById("code");
let timeId=setInterval(()=>{
n+=1;
styleTag.innerHTML=prev+content.substring(0,n);
domCode.innerHTML=Prism.highlight(prev+content.substring(0,n),Prism.languages.css);
domCode.scrollTop = domCode.scrollHeight;
if(n>=length){
    window.clearInterval(timeId);
    console.log("call fn()")
    if(fn){
        fn&fn.call()
    }
}
},timeInterval)

}

function createPaper(fn){
var paper = document.createElement('div') 
paper.id = 'paper'
var content = document.createElement('pre')
content.className = 'content'
paper.appendChild(content)
document.body.appendChild(paper)
if(fn){
console.log("call mdtext()")
fn && fn.call()
}
}
function writeMdText(md,fn){
console.log("begin..write md")
let n=0;
let length=md.length;
let domCode=document.querySelector("#paper > .content")
let timeId=setInterval(()=>{
n+=1;
domCode.innerHTML=Prism.highlight(md.substring(0,n),Prism.languages.css);
domCode.scrollTop = domCode.scrollHeight;
if(n>=length){
    window.clearInterval(timeId);
    if(fn){
        fn&fn.call()
    }
}
},timeInterval)
}
function writeMd(md,fn){
console.log("begin..write md")
let n=0;
let length=md.length;
let domCode=document.querySelector("#paper > .content")
let timeId=setInterval(()=>{
n+=1;
domCode.innerHTML=md.substring(0,n),Prism.languages.css;
domCode.scrollTop = domCode.scrollHeight;
if(n>=length){
    window.clearInterval(timeId);
    if(fn){
        fn&fn.call()
    }
}
},timeInterval)
}
var rendererMD = new marked.Renderer();
marked.setOptions({
renderer: rendererMD,
gfm: true,
tables: true,
breaks: false,
pedantic: false,
sanitize: false,
smartLists: true,
smartypants: false
});//基本设置
console.log(marked(md))
writeCss('',css1,()=>{
createPaper(()=>{
writeMdText(md,()=>{writeCss(css1,css2,()=>{
    writeMd(marked(md),()=>{
        writeCss(css1+css2,css3)
    })  
})})
});
});
