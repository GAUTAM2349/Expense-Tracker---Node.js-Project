const {Signup} = require('../models/Signup');
const bcrypt = require('bcrypt');


const signup = async (req,res) => {
    
    console.log("a request came for signup");
    console.log( req.body );
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }


    try{

        const existingUser = await Signup.findOne({
            where : { email }
        });

        if(existingUser){
            return res.status(500).json({
                success : false,
                message : "User already Exists",
            })
        }
        
        const saltRounds = 10;  
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await Signup.create({ name, email, password : hashedPassword});
        console.log("\nuser created : "+ JSON.stringify(newUser));
        return res.status(200).json({
            success : true,
            message : "User created successfully"
        })
        
    }catch(error){

        return res.status(500).json({
            error : error.message
        })
        
    }
    
}


module.exports = {signup};