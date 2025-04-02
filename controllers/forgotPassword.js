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

    console.log("came for password mail");

    const mailOptions = {
        from : process.env.EMAIL,
        to : process.env.RECEIVER_EMAIL,
        subject : 'Sending Email using Node.js',
        text : 'That was easy!'
    }

    try {
        
        const info = await transporter.sendMail(mailOptions);
        
        console.log("Email sent:", info.response);
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send password reset email",
            error: error.message
        });
    }
    
}

module.exports = {forgotPassword};