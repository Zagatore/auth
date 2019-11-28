module.exports = function(req,res,next){
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const secret = require("./secret");
    const fs = require("fs")
   
    
    let data = fs.readFileSync(__dirname+"/users.json")
    const users = JSON.parse(data.toString());
    let user = users.filter(function(u){
        if(req.body.email === u.email)
        {return true;}
    });
 
    if(user.length===1)
    {
         const password = req.body.password;
         const hash = user[0].password;  // hashat lösenord från db/fil/minnede
         // Kontrollera lösenord med bcrypt
         bcrypt.compare(password,hash,function(err,success){
          
             if(success){
 
                 const token = jwt.sign({email:user[0].email},secret,{expiresIn:180})
 
                    req.token = token
                 
                 next();
             }
             else{
                 res.redirect("/login?login error");
             }
 
         });
 
    }
    else{ // Här hamnar vi om det inte existerar användare med rätt email
        res.redirect("/login?login error");
    }
 
     /**
      * 1. hämta data som klienten skickat ( Repetition )
      * 2. Leta efter användare i databas/fil/minne
      * 3. Om användare ej finns skicka respons till klient med error
      * 4. Om användare finns gå vidare med att kolla lösenord
      * 5. Om löserord ej är korrekt skicka respons till klient med error
      * 6. Om lösenord är korrekt - Skicka respons/redirect 
      * 7. Nu när användaren är inloggad måste hen förbli så ett ta
      *    Detta löser vi med JWT.
      *    Skapa JWT och lagra i cookie innan din respons/redirect
      * 8. Skapa middleware för att skydda vissa routes.
      *    Här skall vi nu använda våra JWT för att hålla en användare inloggad. 
      * 9. Småfix för att förbättra säkerhet och fixa utloggning. 
      */



   
}// end export