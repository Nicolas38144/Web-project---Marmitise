const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await User.findOne({ email: req.body.email });
    
        if (user) {
            res.json({
                message: 'User already exists',
            });
            return;
        }
    
        const newUser = new User({
            email: req.body.email,
            password: hashedPass,
        });
    
        await newUser.save();
    
        res.json({
            message: 'User added successfully',
        });
    } 
    catch (error) {
        res.json({
            message: 'An error occurred',
        });
    }
};


const login = (req, res, next) => {
    var emailBody = req.body.email;
    var password = req.body.password;

    User.findOne({email: emailBody})
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '1h'})
                    //res.cookie('token', token, { httpOnly: true, secure: true })
                    res.json({
                        message: 'Login successful !',
                        token
                    })
                }
                else {
                    res.json({
                        message: 'Password does not matched'
                    })
                }
            })
        }
        else {
            res.json({
                message: 'No user found !'
            })
        } 
    })
}


module.exports = {
    register, login
}