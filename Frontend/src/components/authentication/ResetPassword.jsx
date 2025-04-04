import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../config/axiosConfig';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailSentMessage, setEmailSentMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!resetToken) {
            setErrorMessage("Invalid reset token.");
        }
    }, [resetToken]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!resetToken) {
            setErrorMessage("Reset token is missing.");
            return;
        }

        try {
            const response = await api.post(`/reset-password`, { resetToken, newPassword });
            setEmailSentMessage("Password has been successfully reset.");
            setErrorMessage('');
        } catch (error) {
            console.log(error)
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Failed to reset password');
            } else if (error.request) {
                setErrorMessage('No response from server.');
            } else {
                setErrorMessage(error.message);
            }
            setEmailSentMessage('');
        }
    };

    return (
        <div className="flex justify-center mt-[100px]">
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col justify-center md-w[50%] xl:w-[40%] items-center w-[70%] shadow-2xl h-[50vh] rounded-2xl"
            >
                <div className="p-5">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="bg-white outline-0 px-1 border border-black"
                    />
                </div>
                <div className="p-5">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-white outline-0 px-1 border border-black"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 px-3 py-1 border rounded-2xl"
                >
                    Reset Password
                </button>

                {emailSentMessage && (
                    <div className="text-green-600 my-[40px]">{emailSentMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-600 my-[40px]">{errorMessage}</div>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;
