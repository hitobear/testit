
var http = require('http')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号再来')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var path = request.url 

  console.log('HTTP 路径为\n' + path)
  if(path == '/'){
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'  + 
    '<head><link rel="stylesheet" href="/style.css">' +
    '</head><body>'  +
    '<h1>你好,我是html</h1>' +
    '<script src="/main.js"></script>' +
    '</body></html>')
    response.end()
  }else if(path == '/style.css'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  }else if(path == '/main.js'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("加载js")')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

})

server.listen(port)
console.log('开始监听 ' + port + ' 端口...请输入http://localhost:'+port+'来访问')