const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    register,
    login,
    deleteUser
} = require('../controllers/users');

router.get('/', getAllUsers)
router.post('/register', register);
router.post('/login', login);
router.delete('/:id', deleteUser);

module.exports = router;

