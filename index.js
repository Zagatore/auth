const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./modules/auth")
const login = require("./modules/login")



const app = express();
//Kommer på provet!!!! vad gör följande rad?
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.get("/",function(req,res){
    res.send(req.cookies);
});

app.get("/secret",auth,function(req,res){
    res.send("still-logged-in...");
});



app.get("/login",function(req,res){
    res.send(require("./modules/form"));
});

app.post("/login",login,function(req,res){


    
    let token  = req.token;
    res.cookie("token",token,{httpOnly:true,sameSite:"Strict"});
    res.redirect("/secret")


});

// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)});