

const logIncomingRequests = (req, res, next) => {

    console.log( "\n\n a request came " + req.url+"\n" + res.data);
    next();
    
}

module.exports = { logIncomingRequests };