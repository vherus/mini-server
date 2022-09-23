const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    register,
    login,
    WelcomeFrontPage
} = require('../controllers/users');

router.get('/', getAllUsers)
router.post('/register', register);
router.post('/login', login);


module.exports = router;

