const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.passwordRegister, 10);
        const user = await User.findOne({ email: req.body.emailRegister });
        if (user) {
            res.json({
                message: 'User already exists',
            });
            return;
        }
    
        const newUser = new User({
            email: req.body.emailRegister,
            password: hashedPass,
            admin: req.body.admin
        });
        console.log(newUser);
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
    var emailBody = req.body.emailLogin;
    var password = req.body.passwordLogin;

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
                    let admin = user.admin || false;
                    res.json({
                        message: 'Login successful !',
                        token,
                        admin
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


//READ ALLL
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } 
    catch (error) {
        res.status(500).json({ 
            message: err.message || "Some error occurred while retrieving users." 
        });
    }
};


// READ ONE
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found with id " + req.params.id 
            });
        }
        res.json(user);
    } 
    catch (error) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Error retrieving user with id " + req.params.id
        });
    }
  };


  //DELETE
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found with id " + req.params.id
            });
        }
        res.json({ 
            message: 'User deleted successfully' 
        });
    } 
    catch (error) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).json({
            message: "Could not delete user with id " + req.params.id
        });
    }
};
module.exports = {
    register, 
    login,
    getUsers,
    getUserById,
    deleteUser
}