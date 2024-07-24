// const User = require('../models/userModel');
// const userService = require('../services/userService');
const fs = require('fs');
const { convertAudioToTextUtil } = require('../utils/convertAudioToText');
const multer = require('multer');
const { fetchYoutubeAudioAndSaveUtil } = require('../utils/youtubeUtil');

const upload = multer({ dest: 'uploads/' });

exports.convertAudioToText = [
  upload.single('file'),
  async (req, res) => {
    try {
      const audioFilePath = req.file.path;
      
      const transcribedText = convertAudioToTextUtil(audioFilePath);

      // Delete the uploaded file after processing
      fs.unlinkSync(audioFilePath);

      // Send the transcribed text in the response
      res.status(200).json({ text: transcribedText });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.message });
    }
  }
];



exports.fetchYoutubeAudioAndText = async (req, res) => {
  const { url } = req.body;
  try {
    const audioFilePath = await fetchYoutubeAudioAndSaveUtil(url);
    // Optionally, add transcription logic here
    // Return the path to the audio file
    res.status(200).json({ audio: audioFilePath });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};