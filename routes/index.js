const { router : expenseRouter } = require('./expense');
const { router : signupRouter } = require('./signup');
const { router : loginRouter } = require('./login');


module.exports = {expenseRouter, signupRouter, loginRouter};