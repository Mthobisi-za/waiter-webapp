const { json } = require("body-parser");
const { Pool } = require("pg");
var pool;
var connectionstr = process.env.DATABASE_URL;
if (connectionstr) {
  pool = new Pool({
    connectionstr: connectionstr,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "mthobisi",
    database: "users",
    ssl: false,
  });
}
const dbLogic = require("./db");
module.exports = function factory() {
  const useDbLogic = dbLogic(pool);
  async function setData(data, name) {
    var actual = name.toUpperCase();
    await useDbLogic.setDataWaiter(data, actual);
  }
  async function getWeek() {
    var week = await useDbLogic.getWeek();
    return await week;
  }
  async function getDataForWaiter(name) {
    var arrg = [];
    var week = await useDbLogic.getWeek();
    await week.forEach((element) => {
      arrg.push(element.the_day);
    });
    var actual = name.toUpperCase();
    var data = await useDbLogic.getDataForWaiter(actual);
    if (data.length > 0) {
      var days = await data[0].days.split(",");
      days.forEach((ele) => {
        var check = arrg.indexOf(ele);
        if (check != -1) {
          arrg.splice(check, 1);
          arrg.push({ day: ele, checked: "checked", condition: true });
        } else {
        }
      });

      return arrg;
    } else {
      return arrg;
    }
  }
  async function getWeekAndPickedDays() {
    var obj = {};
    var days = [];
    var returnedData =[]
    var week = await useDbLogic.getWeek();
    await week.forEach((ele) => {
      obj[ele.the_day] = 0;
    });
    var data = await useDbLogic.filterOut();
    data.forEach((ele) => {
      var daysStr = ele.days.split(",");
      daysStr.forEach((day) => {
        days.push(day);
      });
    });
    days.forEach(element =>{
        for(let key in obj){
            if(key == element){
                obj[key] += 1
            }
        }
    })
    for(let key in obj){
        if(obj[key] > 2){
            returnedData.push({
                "class": "green",
                "day": key,
                "number": obj[key]
            })
        } else if(obj[key] === 2){
            returnedData.push({
                "class": "orange",
                "day": key,
                "number": obj[key]
            })
        } else{
            returnedData.push({
                "class": "white",
                "day": key,
                "number": obj[key]
            })
        }
    }
    return returnedData
  }
  async function getNames(){
    var returned =[]
    var full = await useDbLogic.filterOut();
    await full.forEach(ele =>{
      var changed = JSON.stringify(ele);
      returned.push(changed);
    })
    return (JSON.stringify(returned));
  }
  return {
    setData,
    getWeek,
    getDataForWaiter,
    getWeekAndPickedDays,
    getNames
  };
};
