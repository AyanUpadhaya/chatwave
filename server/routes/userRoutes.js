const { register, login,setAvatar,allUsers} = require('../controllers/userControllers');



const router = require('express').Router();

router.post('/register',register);
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)
router.get('/allusers/:id',allUsers)

module.exports =router;