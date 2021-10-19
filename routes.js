
const factory = require("./factory js/factory-function");
module.exports = function makeChanges(){
    const useFactory = factory();
    async function home(req,res){
        var error = useFactory.getError().sMsgs();
        res.render("home", {error});
    }
    async function type(req,res){
        var type = req.params.type
        if(type == "mananger"){
        var data = await useFactory.getWeekAndPickedDays();
        var dynamic = await useFactory.getNames();
        var err = useFactory.getError().sMsgs();
        res.render("mananger", {week: data, dynamic, err})
        } else if(type == "waitres"){
            var err = useFactory.getError().err();
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
        var err = useFactory.getError().err();
        if(err.length > 1){
            res.redirect("/user/waitres");
        } else{
           res.render("daypicker", {week : data, name}); 
        }
    }
    async function submit(req,res){
        var data = req.body;
        var name = req.session.name;
        try {
            await useFactory.setData(data,name);
            res.redirect("/");
        } catch (error) {
            res.redirect("/");
        } 
    }
    async function reset(req,res){
        await useFactory.reset();
        res.redirect("/user/mananger");
    }
    function admin(req,res){
        var name = req.body.name;
        useFactory.admin(name);
        var err = useFactory.getError().err();
        if(err.length > 1){
            res.redirect("/admin");
        } else{
            res.redirect("/user/mananger");
        }
    }
    function admintemplate(req,res){
        var err = useFactory.getError().err();
        res.render("loginadmin", {err});
    }
    function goToHome(req,res){
        res.redirect("/")
    }
    return {
        home,
        type,
        logIn,
        submit,
        reset,
        admin,
        admintemplate,
        goToHome
    }
}