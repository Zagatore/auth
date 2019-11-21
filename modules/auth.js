const jwt = require("jsonwebtoken");

function auth(req,res,next){

    if(req.cookies.token){
        try{
            let token = jwt.verify(req.cookies.token,secret);
            

            if(token){
            next(); 
            }
            else{
                res.redirect("/login?invalid-token")
            }
            
        }
        catch(err){
            res.redirect("/login?invalid-token")
        }
   
    }
    else
    {
        res.send(err.message);
    }
}// end function


module.exports = auth;