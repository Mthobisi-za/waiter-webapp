
 var arg = [];
 var fullData = []
 function makeChart(){
     // === include 'setup' then 'config' above ===
  const labels = [ /*
    'January',
    'February',
    'March',
    'April',
    'May',
    'June', */
    ];
    const nums = [];
    arg.forEach(ele =>{
        labels.push(ele.day);
        nums.push(ele.num)
    })
    const data = {
    labels: labels,
    datasets: [{
        label: 'Availability of waiters',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: nums /*[0, 10, 5, 2, 20, 30, 45]*/,
    }]
    };
    const config = {
    type: 'line',
    data: data,
    options: {}
    };
  var myChart = new Chart(
    document.getElementById('myCanvas'),
    config
  );
 }
 function getData(){
     var div = document.querySelector(".form");
     var list = div.data;
     list.forEach(element => {
         var argg = element.value.split(",");
         arg.push({
            day: argg[1],
            num: argg[0]
         });
     });
     makeChart()
 }
 getData();

 //another logic
 function checkData(){
    var div = document.querySelector("#dynamic");
    var data = div.hide.value
    var changed = JSON.parse(data);
    changed.forEach(ele =>{
        var changes = JSON.parse(ele);
        fullData.push(changes);
    })
    
 }
 checkData()
 function showData(text){
     var ul = document.querySelector(".ul");
     ul.textContent = " "
     var h2 = document.querySelector(".h23");
     h2.style.display = "block";
    fullData.forEach(ele =>{
        if(ele.days.includes(text)){
            var li = document.createElement("li");
            li.textContent = ele.waiter_name;
            ul.appendChild(li)
        }
    })
 }
var div = document.querySelector(".centerr");
div.addEventListener("click", function(e){
    var target = e.target;
    var element = target.tagName
    if(element == "H2"){
        showData(target.innerText)
    }
})
