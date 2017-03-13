var fs = require("fs");
var path = require("path");


// fs.mkdirSync(path.resolve(__dirname,"./release"),function(){
//   console.log("成功创建目录");
// })
var files = fs.readdirSync("./ware");
var i = 1;
var arr = [];


files.forEach(function(file){
  var temp = file.split(".");
  var nowTime = new Date();
  // console.log(nowTime);
  var year = nowTime.getFullYear()
  var month = parseInt(nowTime.getMonth() + 1)<10 ? "0"+parseInt(nowTime.getMonth() + 1) : parseInt(nowTime.getMonth() + 1);
  var date = parseInt(nowTime.getDate())<10 ? "0"+parseInt(nowTime.getDate()) : parseInt(nowTime.getDate());
  i = parseInt(i)<10 ? "0"+parseInt(i) : parseInt(i)
  var timer = i  + "_" + date + "_" + month + "_" + year;
  i = parseInt(i) + 1;
  console.log(timer);
  // console.log(timer);
  var oldPath = path.resolve(__dirname,"./ware/" + file);
  var newPath = path.resolve(__dirname,"./release/" + timer + "." + temp[temp.length-1]);

  fs.renameSync(oldPath, newPath, function(){
    console.log("新文件名为" + newPath);
  })



})
