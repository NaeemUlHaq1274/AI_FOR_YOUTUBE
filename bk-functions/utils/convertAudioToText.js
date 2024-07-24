const fs = require('fs');
const openai = require('../config/open_ai'); // Assuming openai is properly imported

exports.convertAudioToTextUtil = async (audioFilePath) => {
  try {
    // Read the audio file from the provided path
    const audioData = fs.readFileSync(audioFilePath);

    // Call OpenAI API to transcribe audio to text
    const response = await openai.createTranscription({
      model: 'whisper-1', // Adjust model as per OpenAI API documentation
      audio: audioData,
      language: 'en', // Specify language if needed
    });

    // Extract the transcribed text from the API response
    const transcribedText = response.data.text;

    return transcribedText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
