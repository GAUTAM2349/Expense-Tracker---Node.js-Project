const nodemailer = require('nodemailer');
const { v4 : uuidv4 } = require('uuid');
const { ForgotPasswordRequest } = require('../models');
const { validatePasswordResetToken } = require('../middlewares/validdatePasswordResetToken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,  // Use 'secure: true' for SSL connection
    port: 465,     // Use port 465 for SSL or port 587 for TLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});



const forgotPasswordRequest = async (req,res) => {

    console.log("came for password reset")

    const user = req.user;

    if(!user){

        return res.status(400).json({
            success: false,
            message: "no user found"
        })
    }

    console.log(JSON.stringify(user));
    console.log("came for password mail");

    const generatedId = uuidv4();
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset Request',
        html: `<a href="${process.env.BASE_URL}/reset-password/${generatedId}">Click here to reset your password</a>`
        // password/forgot-password/${generatedId}
      };
      

    try {

        //storing request in db

        
        const passwordResetRequest = await ForgotPasswordRequest.create({
            id : generatedId,
            userId : user.id,
            isActive : true
        });

        if(!passwordResetRequest){
            return res.status(500).json({
                message : "some error occred from our side"
            })
        }
        
        console.log(JSON.stringify(passwordResetRequest))
        
        const info = await transporter.sendMail(mailOptions);
        
        console.log("Email sent:", info.response);
        return res.status(200).json({
            success: true,
            message: "reset link sent"
        });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({
            success: false,
            message: "error!!",
            error: error.message
        });
    }
    
}


module.exports = {forgotPasswordRequest};