
function makeChanges(arg){
    var name = arg[1]
    //var id = arg[0]
    var selector = name;
    var days = document.querySelector("."+selector);
    var textContent = (days.innerHTML).split(",");
    textContent.forEach(element =>{
        var input = document.getElementsByClassName("input");
        for(let i = 0; i < input.length; i++){
            var loopDays = (input[i].id.split(" ")[1])
            if(loopDays == element){
                //console.log("ticking "+ element)
                input[i].checked = true;
            }
        }
    })
}
function clearChecked(){
    var input = document.getElementsByClassName("input");
    for(let i = 0; i < input.length; i++){
        input[i].checked = false;
    }
}