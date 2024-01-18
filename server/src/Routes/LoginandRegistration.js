const router= require('express').Router();
const jwt= require('jsonwebtoken');
const dayjs= require('dayjs');
const pool= require('../DatabaseConfig/db');
const { validateToken }= require('../Middleware/AuthenticationService/validateToken')
const bcrypt= require('bcrypt');

router.post('/register', async(req,res) => {
    try {
        const { first_name, last_name, email, username, password } = req.body; //destructuring user info in req.body for ease of access
        const hashedPassword= await bcrypt.hash(password, 10); //hashing of plain-text password
        query_str='INSERT INTO user_info(first_name, last_name, email, username, password) VALUES(($1), ($2), ($3), ($4), ($5))';
        pool.query(query_str,[first_name, last_name, email, username, hashedPassword], (err, result) =>{
            if(err){
                throw err;
            }
            else{
                res.json({'status': 'success', 'message': 'registred successfully'}).status(200);
            }
        });
    } catch (err) {
        if(err.code == '23505'){
            res.json({'status':'error', 'message':'email already exist try different email'});
        }
        else if(err.code == '23502'){
            res.json({'status': 'error', 'message':`${err.column} is required`});// error for any empty field because of NOT NULL constraint in psql
        }
        else{
            res.json({'status': 'error', 'message': 'something went wrong in server side'}).status(500);
        }
    }
});

router.post('/log-in', async(req, res) =>{
    try{
        const { username , password }= req.body;
        query_str='SELECT * FROM user_info WHERE username=($1)';
        pool.query(query_str,[username], (err, result) =>{
            if(err){
                throw err;
            }
            else if(result.rowCount == 0){// this is the case when no user is found for given username
                res.json({'status': 'error', 'message': 'user doesnt exist'}).status(401);
            }
            else
            {
                bcrypt.compare(password,result.rows[0].password, (err, result2) =>{// compares plain-text password sent in req.body with hashed password stored in db
                    if(err){
                        throw err;
                    }
                    else{
                        if(result2)
                        {
                            const token = jwt.sign(                     // if user is valid jwt is issued and assigned to res.cookie to store in client's cookie jar
                                {'username': result.rows[0].username}, 
                                process.env.JWT_SECRET_KEY,
                                {
                                    expiresIn: '120s'
                            });
                            res.cookie('token', token,{
                                'secure': false,
                                'httpOnly': true,
                                'expires': dayjs().add(120, 'second').toDate()
                            }).json({'status': 'success', 'message': 'successfully logged-in'}).status(200);
                        }
                        else{
                            res.json({'status': 'error', 'message': 'wrong crediantials'}).status(403);
                        }
                    }
                });
            }
        });
    }catch(err){
        res.json({'status': 'error', 'message': 'something went wrong in server side'}).status(500);
    }
});

router.get('/log-out', validateToken, async(req, res) =>{
    try {
        return res.json({'status': 'success', 'message': `User ${req.username} logged-out succesfully`}).status(200);
    } catch (error) {
        res.json({'status': 'error', 'message': 'something went wrong in server side'}).status(500);
    }
})

module.exports = router;