var fs = require("fs");
var path = require("path");
var opt = process.argv[2] || "";
var fileName = process.argv[3] || "";
console.log(opt);
fs.mkdir(path.resolve(__dirname,"./release"),function(){
  console.log("成功创建目录");
})
var files = fs.readdirSync("./ware");
var i = 1;
var arr = [];
files.forEach(function(file) {

    // /^(?=.*views)/
    // var url = path.resolve(__dirname,"./ware/" + file);


    var reg = "(." + opt + ")$";
    var re =new RegExp(reg);
    if(re.test(file)){
      arr.push(file);
    }

    // var data = fs.readFileSync(url);
    // fs.rename(oldPath, newPath, callback)
});
// console.log(arr);

arr.forEach(function(file){

  var oldPath = path.resolve(__dirname,"./ware/" + file);
  var newPath = path.resolve(__dirname,"./ware/" + fileName + i + "." + opt);
  console.log("run this");
  fs.rename(oldPath, newPath, function(){
    console.log("新文件名为" +  fileName + (i-1) + "." + opt);
  })
  i++;


})
