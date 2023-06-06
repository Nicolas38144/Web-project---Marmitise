const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    if (req.method !== 'GET') {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ 
                message: 'No token provided' 
            });
        }
        jwt.verify(token, 'verySecretValue', (err, decoded) => {
            console.log(token);
            if (err) {
                return res.status(403).json({ 
                    message: 'Token is not valid' 
                });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    } 
    else {
        next();
    }
};

module.exports = authenticateToken;