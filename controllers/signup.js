

const signup = (req,res) => {
    
    console.log("a request came for signup");
    console.log( req.body );
    res.json({message : "response ended"});
    
}


module.exports = {signup};