/**====================================*\
 *  DEPENDENCIES CONFIGURATION
 ======================================*/
 require('dotenv').config();
const jwt = require('jsonwebtoken');
const accessTokenPrivate = process.env.ACCESS_TOKEN_KEY;


/**
* Middleware to check authentification with Json Web Token method
* @param { req } req is the request who contains the header
* @param { res } res is the response
* @param { callback method } next
*/
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenPrivate, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;

            //Callback method to update the req.user value
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT