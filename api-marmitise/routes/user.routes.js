const router = require("express").Router();
const UserController = require("../controllers/user.controller");

// Create a new User
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Retrieve all Users
router.get('/', UserController.getUsers);

// Retrieve a single User with id
router.get('/:id', UserController.getUserById);

// Delete a User with id
router.delete('/:id', UserController.deleteUser);

module.exports = router;