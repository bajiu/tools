var options = process.argv[2];


var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+"/"+ options);
var excelObj = obj[0].data;
excelObj.splice(0, 1);
// excelObj.splice(excelObj.length-2, excelObj.length);
// var a = new Date(1900, 0,  excelObj[1][0]-1);


var startData = [];
var middleData1 = [];
var middleData2 = [];
var overData = [];
for(let i in excelObj){
    var temp = new Date(1900, 0, excelObj[i][0]-1);
    var timer = {
      date:temp.getDate(),
      hours:temp.getHours(),
      minutes:temp.getMinutes(),
      seconds:temp.getSeconds()
    }
    startData.push(timer)
}

//获取最大时间
function max(){
  var num = 0;
  middleData1[0] = startData[0];
  for(let i = 0 ; i < startData.length ; i++){
      if(startData[i].date == middleData1[0].date){
        // middleData.push(startData[i])
        // 把最大的时间放入数组
        //
        // 如果小时相等
        if(parseInt(startData[i].hours) == parseInt(middleData1[0].hours)){
          //如果分钟相等
          if(parseInt(startData[i].minutes) == parseInt(middleData1[0].minutes)){
            //如果秒相等
            if(parseInt(startData[i].hours) >= parseInt(middleData1[0].hours)){
              middleData1[0] = startData[i];
            }
          }else if(parseInt(startData[i].minutes) > parseInt(middleData1[0].minutes)){
            middleData1[0] = startData[i];
          }
        }else if (parseInt(startData[i].hours) > parseInt(middleData1[0].hours)) {
          middleData1[0] = startData[i];
        }
      }else{
        middleData1.unshift(startData[i])
      }
  };
}
//获取最小时间
function min(){
  var num = 0;
  middleData2[0] = startData[0];
  for(let i = 0 ; i < startData.length ; i++){
      if(startData[i].date == middleData2[0].date){
        // middleData.push(startData[i])
        // 把最大的时间放入数组
        //
        // 如果小时相等
        if(parseInt(startData[i].hours) == parseInt(middleData2[0].hours)){
          //如果分钟相等
          if(parseInt(startData[i].minutes) == parseInt(middleData2[0].minutes)){
            //如果秒相等
            if(parseInt(startData[i].hours) <= parseInt(middleData2[0].hours)){
              middleData2[0] = startData[i];
            }
          }else if(parseInt(startData[i].minutes) < parseInt(middleData2[0].minutes)){
            middleData2[0] = startData[i];
          }
        }else if (parseInt(startData[i].hours) < parseInt(middleData2[0].hours)) {
          middleData2[0] = startData[i];
        }
      }else{
        middleData2.unshift(startData[i])
      }
  };
}
max();
min();

//拆分数组
// function release(){

for(let i in middleData1){
  var temp = [];
  temp.push(middleData1[i].date + "日    " +  middleData1[i].hours  + "   点" + middleData1[i].minutes + "   分" + middleData1[i].seconds + "   秒");
  temp.unshift(middleData2[i].date + "日   " +  middleData2[i].hours  + "   点" + middleData2[i].minutes + "   分" + middleData2[i].seconds + "   秒");
  overData.push(temp)
}
console.log(overData);

  var data = overData;

  var buffer = xlsx.build([
      {
          name:'sheet1',
          data:data
      }
  ]);
  fs.writeFileSync('./release.xlsx',buffer,{'flag':'w'});
// }release()
