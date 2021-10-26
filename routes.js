const factory = require("./factory js/factory-function");
module.exports = function makeChanges(pool){
    const useFactory = factory(pool);

    async function home(req,res){
        var error = useFactory.getError().sMsgs();
        res.render("home", {error});
    }

    async function type(req,res){
        var type = req.params.type
        if(type == "mananger"){
        var data = await useFactory.getWeekAndPickedDays();
        //var waitersNames = await useFactory.getAllData();
        var dynamic = await useFactory.getNames();
        var err = useFactory.getError().sMsgs();
        var weeky = await useFactory.getWeek();
        var waiters = await useFactory.getAllData();
        var obj = {waiters: waiters, weeky: weeky};
        res.render("mananger", {week: data, dynamic, err,obj})
        } else if(type == "waitres"){
            err = useFactory.getError().err();
            if(req.session.name){
                var name = req.session.name
                var dataa = await  useFactory.getDataForWaiter(name);
                var alertErrorr = useFactory.getDynamicErr();
                var sError = useFactory.getError().sMsgs();
                res.render("daypicker", {week : dataa, name, alertErrorr, error: sError}); 
            }else{
                req.flash("error", err);
                res.render("waitres",{err});
            }
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
        var compare = typeof data.day;
        if(compare == "string"){
            var err = 'Please select two or more working days'
            useFactory.setError(err);
            useFactory.resetDynamic();
        }else{
            var errr = " "
            useFactory.setError(err); 
        }
        //if()
        try {
            await useFactory.setData(data,name);
            res.redirect("/user/waitres");
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
        console.log("home");
        res.redirect("/");
    }

    async function setDataForWaiter(req,res){
        var data = req.body;
        var name = req.params.name;
        await useFactory.setData(data,name);
        res.redirect("/user/mananger");
    }

    return {
        home,
        type,
        logIn,
        submit,
        reset,
        admin,
        admintemplate,
        goToHome,
        setDataForWaiter
    }
}