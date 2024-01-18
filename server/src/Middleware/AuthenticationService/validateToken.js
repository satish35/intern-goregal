const jwt= require('jsonwebtoken');

exports.validateToken = (req, res, next) =>{
    if(!req.cookies.token){
        return res.json({'status':'error', 'message': 'No token provided'}).status(403); // checks for token in req.cookie object for authentication
    }
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, (err, result) =>{  //decoding of jwt to check for authenticity of token
        if(err){ // error handling specific to error type
            if(err.name == 'JsonWebTokenError'){
                return res.json({'status': 'error', 'messsage': 'invalid token please log-in again'})
            }
            else if(err.name == 'TokenExpiredError'){
                return res.json({'status': 'error', 'messsage': 'token expired please log-in again'});
            }
            else{
                return res.json({'status': 'error', 'messsage': `${err.message}`});
            }
        }
        else{
            // console.log(result);
            req.username = result.username;
            next(); // if jwt is valid the control is passed from middleware to callback for further execution
        }
    });
}