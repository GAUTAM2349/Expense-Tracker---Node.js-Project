const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

    service : 'gmail',
    host : 'smtp@gmail.com',
    secure : true,
    port: 587,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
    
});



const forgotPassword = async (req,res) => {

    const receiverEmail = req.body.email;

    if(!receiverEmail){

        return res.status(500).json({
            success: false,
            message: "no email found!!",
            error: error.message
        })
    }

    console.log("came for password mail");

    const mailOptions = {
        from : process.env.EMAIL,
        to : receiverEmail,
        subject : 'Sending Email using Node.js',
        text : 'That was easy!'
    }

    try {
        
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

module.exports = {forgotPassword};