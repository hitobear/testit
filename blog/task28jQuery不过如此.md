## 题目

补全以下代码中间的内容

```
window.jQuery = ???
window.$ = jQuery

var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi

```
## 步骤
&emsp;&emsp;根据代码中，`window.$=jQuery; var $div = $('div')`可以看出，jQuery是一个函数，并且这个函数可以接收一个字符串参数，再通过`$div.addClass('red') $div.setText('hi')`可以看出jQuery的返回值时一个对象，并且支持 `addClass,setText`两个方法

### 根据传入参数返回一个伪数组对象

&emsp;&esp;题中接收一个字符串，返回一个支持`addClass,setText`方法的对象，且通过这两个方法可以为传入字符串所选择的相关dom元素添加`class`和设置文本内容，所以可以推出返回内容为传入的字符串所选定的dom元素的相关信息，这里**不妨将返回值设计为以参数为选择器所选中的所有元素组成的伪数组对象**，相关代码如下：

```
window.jQuery = function(selector){
  let nodes={};//初始化伪数组对象，也即未来的返回值
  let temp=document.querySelectorAll(selector);//调用domapi得到该选择器选中的Nodelist

  //将NodeList类型的对象转换成一个普通的伪数组对象
  for(let i=0;i<temp.length;i++){
      nodes[i]=temp[i];
  }
  nodes.length=temp.length;
  return nodes;
}
``` 

### 实现`addClass`方法 

&emsp;&emsp;根据题目要求，`addClass`方法接收一个字符串参数，将该字符串作为类型添加到`jQuery()`返回值所包含的所有元素上,但是首先面对的一个问题是，比如调用`$div.addClass('red')`,那么`addClass`方法如何知道要为哪些元素添加类呢？

&emsp;&emsp;仔细想下，先不考虑未实现的内容，现在`addClass`方法所了解的信息有2个:第一个是它所接收的参数，即要添加的类的名称(但还是不知道要添加类的那些元素的任何信息)，那么寄希望于第二个信息吧~第二个就是`this`了，这时候想到对象的方法调用中`this`值，就是该对象本身，而在这里该对象本身不正是`jQuery()`的返回值，即选中的元素组成的伪数组对象吗？所以说通过`this`值就可以拿到这些元素信息啦。 

&emsp;&emsp; 还有一个问题，如何给jQuery()返回的对象添加方法呢？因为这里新建对象时并没有用到`new`操作符，所以只能抛弃为构造函数的`prototype`添加方法了，那么只能直接在返回对象前直接为该对象添加方法了，代码如下：

```
window.jQuery=function(selector){
    ...
    nodes.addClass=function(cls){
        for(let i=0;i<this.length;i++){
             this[i].classList.add(cls);
         }
    }
      
}

```

### 实现`setText`方法

&emsp;&emsp;分析`setText`方法的实现过程和`addClass`类似，只是内部利用了domapi的`contentText`方法，相关代码如下：

```
 nodes.setText=function(text){
     for(let i=0;i<this.length;i++){
             this[i].textContent=text;
    }
  }
``` 