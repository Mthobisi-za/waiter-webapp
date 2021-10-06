
const factory = require("./factory js/factory-function");
module.exports = function makeChanges(){
    const useFactory = factory();
    function home(req,res){
        res.render("home");
    }
    async function type(req,res){
        var type = req.params.type
        if(type == "mananger"){
        var data = await useFactory.getWeekAndPickedDays();
        var dynamic = await useFactory.getNames()
        res.render("mananger", {week: data, dynamic})
        } else if(type == "waitres"){
            res.render("waitres");
        } else{
            res.redirect("/")
        } 
    }
    async function logIn(req,res){
        var name = req.body.name;
        req.session.name = name;
        var data = await  useFactory.getDataForWaiter(name);
        res.render("daypicker", {week : data});
    }
    async function submit(req,res){
        var data = req.body;
        var name = req.session.name;
        await useFactory.setData(data,name);
        res.redirect("/")
    }
    return {
        home,
        type,
        logIn,
        submit
    }
}