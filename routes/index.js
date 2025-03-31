const { router : expenseRouter } = require('./expense');
const { router : signupRouter } = require('./signup');
const { router : loginRouter } = require('./login');
const { router : cashfreeRouter }  = require('./cashfree');
const { router : premiumRouter } = require('./premium');


module.exports = {expenseRouter, signupRouter, loginRouter, cashfreeRouter, premiumRouter };