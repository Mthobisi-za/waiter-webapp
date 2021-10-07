const express = require("express");
const exhbs = require("express-handlebars");
const body = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
//----config all the modules
app.use(express.static("public"));
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.engine(
  "handlebars",
  exhbs({ layoutsDir: "views/layouts", defaultLayout: "main" })
);
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
//-----config all the modules
//------own modules
const routes = require("./routes");
const useRoutes = routes();
//---routes
app.get("/", useRoutes.home);
app.get("/user/:type", useRoutes.type);
app.post("/login", useRoutes.logIn);
app.post("/submit", useRoutes.submit);
app.post("/loginadmin", useRoutes.admin);
app.get("/reset", useRoutes.reset);
app.get("/admin", useRoutes.admintemplate)
//--mananger logic

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
