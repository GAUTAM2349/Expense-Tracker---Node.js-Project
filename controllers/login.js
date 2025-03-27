const { Signup } = require('../models/Signup');

const login = async (req, res) => {

 console.log(" request came for login ");
    
 const { email, password } = req.body;

   try{
    const user = await Signup.findOne({
        where : { email }
    });

    if( !user ){
        return res.status(404).json({
            message : "User not found"
        })
    }

    if( user.password != password ){
        return res.status(401).json({
            message : "Invalid user or password"
        })
    }

    return res.status(200).json({
        message : "Loggedin Successfully"
    })
   }catch(error){
    res.status(500).json({
        message : error.message
    })
   }
    
}

module.exports = { login };