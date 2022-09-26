const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    register,
    login,
    deleteUser,
    getUserById,
    updateProfile
} = require('../controllers/users');

router.get('/', getAllUsers)
router.post('/register', register);
router.post('/login', login);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.patch('/:id', updateProfile);

module.exports = router;

