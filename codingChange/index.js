var fs = require("fs");
var iconv = require("iconv-lite");
var path = require("path");
var opt = process.argv[2];
fs.mkdir(path.resolve(__dirname,"./release"),function(){
  console.log("成功创建目录");
})
var files = fs.readdirSync("./ware");
files.forEach(function(file) {
    var url = path.resolve(__dirname,"./ware/" + file)
    var data = fs.readFileSync(url);
    var buffer;
    if(opt == "GBK"){
      buffer = iconv.decode(data, 'GBK');
      //返回从GBK编码字节的Unicode字符串
    }else{
      buffer = iconv.encode(data, 'GBK');
      //返回字节Unicode字符串从GBK编码
    }
    fs.writeFile(path.resolve(__dirname,"./release/" + file), buffer, function(){
      console.log("成功写入文件" + file);
    })
});
