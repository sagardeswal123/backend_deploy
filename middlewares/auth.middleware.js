const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        try {
            const decode = jwt.verify(token,process.env.secret);
            if(decode){
                console.log(decode)
                req.body.user = decode.user;
                req.body.userID = decode.userID;
                next();
            }
            else{
                res.json({msg:"not authorized"})
            }
        } catch (error) {
            res.json({error: error.message})
        }
    }
    else{
        res.json({msg:"please login"})
    }
}

module.exports = {
    auth
}