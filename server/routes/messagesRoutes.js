const {addMessage,getAllMessage} = require('../controllers/messagesControllers')

const router = require('express').Router();

router.post('/addmsg',addMessage)
router.get('/getmsg',getAllMessage)


module.exports = router