const router = require('express').Router();

const {createRoom,getAllRooms} = require('../controllers/chatRoomControllers')

router.post('/create',createRoom);
router.get('/allChatrooms',getAllRooms)

module.exports = router;