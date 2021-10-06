
const factory = require("./factory js/factory-function");
module.exports = function makeChanges(){
    const useFactory = factory();
    function home(req,res){
        res.render("home");
    }
    async function type(req,res){
        try {
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
        } catch (error) {
            var type = req.params.type
            if(type == "mananger"){
            //var data = await useFactory.getWeekAndPickedDays();
            //var dynamic = await useFactory.getNames()
            res.render("mananger")
            } else if(type == "waitres"){
                res.render("waitres");
            } else{
                res.redirect("/")
            } 
        }
        
    }
    async function logIn(req,res){
        try {
            var name = req.body.name;
            req.session.name = name;
            var data = await  useFactory.getDataForWaiter(name);
            res.render("daypicker", {week : data});
        } catch (error) {
            res.render("daypicker");
        }

    }
    async function submit(req,res){
        try {
            var data = req.body;
            var name = req.session.name;
            await useFactory.setData(data,name);
            res.redirect("/");
        } catch (error) {
            res.redirect("/");
        }

        
    }
    return {
        home,
        type,
        logIn,
        submit
    }
}