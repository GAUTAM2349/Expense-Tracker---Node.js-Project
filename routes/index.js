const { router : expenseRouter } = require('./expense');
const { router : signupRouter } = require('./signup');
const { router : loginRouter } = require('./login');
const { router : cashfreeRouter }  = require('./cashfree');
const { router : premiumRouter } = require('./premium');
const { router : passwordRouter } = require('./password');
const {router : resetPasswordRouter } = require('./resetPassword');


module.exports = {expenseRouter, signupRouter, loginRouter, cashfreeRouter, premiumRouter, passwordRouter, resetPasswordRouter };