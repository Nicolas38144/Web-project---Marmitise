const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User ({
            email: req.body.email,
            password: hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message: 'User added successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    })    
}


const login = (req, res, next) => {
    var emailBody = req.body.email;
    var password = req.body.password;

    User.findOne({email: emailBody})//{$or: [{email:email}]}
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
            return res.json({
                message: 'No user found !'
            })
        } 
    })
}
module.exports = {
    register, login
}