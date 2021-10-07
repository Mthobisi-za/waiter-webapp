
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
            var err = useFactory.getError();
            req.flash("error", err);
            res.render("waitres",{err});
        } else{
            res.redirect("/")
        }
    }
    async function logIn(req,res){
        var name = req.body.name;
        req.session.name = name;
        var data = await  useFactory.getDataForWaiter(name);
        var err = useFactory.getError();
        console.log(err)
        if(err.length > 1){
            res.redirect("/user/waitres");
        } else{
           res.render("daypicker", {week : data}); 
        }
    }
    async function submit(req,res){
        var data = req.body;
        var name = req.session.name;
        await useFactory.setData(data,name);
        res.redirect("/")
    }
    async function reset(req,res){
        await useFactory.reset();
        res.redirect("/user/mananger");
    }
    function admin(req,res){
        var name = req.body.name;
        useFactory.admin(name);
        var err = useFactory.getError();
        if(err.length > 1){
            res.redirect("/admin");
        } else{
            res.redirect("/user/mananger");
        }
    }
    function admintemplate(req,res){
        var err = useFactory.getError();
        res.render("loginadmin", {err});
    }
    return {
        home,
        type,
        logIn,
        submit,
        reset,
        admin,
        admintemplate
    }
}