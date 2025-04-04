const { ForgotPasswordRequest } = require('../models');
const moment = require('moment');
const { User } = require("../models");

const validatePasswordResetToken = async (req, res, next) => {
    try {
        const { resetToken } = req.body;
        if (!resetToken) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const forgotPasswordRequest = await ForgotPasswordRequest.findOne({
            where: { id: resetToken, isActive: true },
        });

        if (!forgotPasswordRequest) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const generationTime = moment(forgotPasswordRequest.generationTime);
        const currentTime = moment();
        const timeDifferenceInMinutes = currentTime.diff(generationTime, 'minutes');

        if (timeDifferenceInMinutes > 50) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        req.userId = forgotPasswordRequest.userId;
        const user = await User.findOne({ where: { id: req.userId } });

        if (!user) {
            return res.status(400).json({ message: 'No user exists' });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
``
module.exports = {
    validatePasswordResetToken,
};
