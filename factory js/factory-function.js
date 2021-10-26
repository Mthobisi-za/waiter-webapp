const dbLogic = require("./db");
module.exports = function factory(pool) {
  var error = "";
  var sMsg = " ";
  var dynamicerr = "";
  const useDbLogic = dbLogic(pool);
  async function setData(data, name) {
    if(data !== undefined && name !== undefined){
      sMsg = "You have successfully added your shift's " + name;
    }else{
      error = " "
    }
    var actual = name.toUpperCase();
    await useDbLogic.setDataWaiter(data, actual);
  }

  async function getWeek() {
    var week = await useDbLogic.getWeek();
    return await week;
  }

  async function getDataForWaiter(name) {
    var checker = /^[A-Za-z]+$/;
    if (name && name.match(checker)) {
      error = " ";
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
    } else {
      error = "Please insert correct data with no numbers or space!";
    }
  }

  async function getWeekAndPickedDays() {
    var obj = {};
    var days = [];
    var returnedData = [];
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
    days.forEach((element) => {
      for (let key in obj) {
        if (key == element) {
          obj[key] += 1;
        }
      }
    });
    for (let key in obj) {
      if (obj[key] > 2) {
        returnedData.push({
          class: "green",
          day: key,
          number: obj[key],
        });
      } else if (obj[key] === 2) {
        returnedData.push({
          class: "orange",
          day: key,
          number: obj[key],
        });
      } else {
        returnedData.push({
          class: "white",
          day: key,
          number: obj[key],
        });
      }
    }
    return returnedData;
  }

  async function getNames() {
    var returned = [];
    var full = await useDbLogic.filterOut();
    await full.forEach((ele) => {
      var changed = JSON.stringify(ele);
      returned.push(changed);
    });
    return JSON.stringify(returned);
  }

  async function reset() {
    sMsg = "Successfully cleared the Database!"
    await useDbLogic.reset();
  }

  function getError() {
    function sMsgs(){
      var msg = sMsg;
      sMsg = " "
      return msg;
    }
    function err(){
       return error;
    }
   return {sMsgs, err}
  }
  function admin(name){
    var checker = /^[A-Za-z]+$/;
    var condition = name.match(checker);
    if(condition && name){
      var fullName = name.toLowerCase()
      if(fullName == "admin"){
         error = " "
      }else{
        error = name + " is not an admin, Please use correct login details"
      }
    } else{
      error = "Please insert correct data with no numbers or space!";
    }
  }

  async function disconnect(){
    await useDbLogic.disconnect();
  }

  function resetErr(){
    error = " ";
  }

  async function getAllData(){
    var data =  await useDbLogic.getAllNames();
    var argD = [];
    var names = []
    for (const dataa of data) {
      var name = dataa.waiter_name;
      names.push(name);
      var dataForWaiter = await getDataForWaiter(name);
      argD.push(dataForWaiter);
    }
    var fullData = {names: names, data: argD};
    return data
  }
  function setError(err){
    dynamicerr = err;
  }
  function getDynamicErr(){
    return dynamicerr;
  }
  function resetDynamic(){
    sMsg = " "
  }
  return {
    setData,
    getWeek,
    getDataForWaiter,
    getWeekAndPickedDays,
    getNames,
    reset,
    getError,
    admin,
    disconnect,
    resetErr,
    getAllData,
    setError,
    getDynamicErr,
    resetDynamic
  };
};
