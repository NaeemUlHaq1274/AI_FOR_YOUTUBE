const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/audio-to-text', userController.convertAudioToText);
router.post('/link-to-audio-text', userController.fetchYoutubeAudioAndText);

module.exports = router;
