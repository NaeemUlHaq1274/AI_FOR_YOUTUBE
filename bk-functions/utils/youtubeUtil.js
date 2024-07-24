// utils/youtubeUtil.js

const path = require('path');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const fetchYoutubeAudioAndSaveUtil = async (url) => {
  if (!ytdl.validateURL(url)) {
    throw new Error('Invalid YouTube URL');
  }

  const videoId = ytdl.getURLVideoID(url);
  const audioFilePath = path.resolve(__dirname, `../temp/${videoId}.mp3`);

  return new Promise((resolve, reject) => {
    const audioStream = ytdl(url, { filter: 'audioonly' });

    ffmpeg(audioStream)
      .audioBitrate(128)
      .save(audioFilePath)
      .on('end', () => {
        console.log(`Audio file saved: ${audioFilePath}`);
        resolve(audioFilePath);
      })
      .on('error', (err) => {
        console.error('Error processing audio:', err);
        reject(err);
      });
  });
};

module.exports = {
    fetchYoutubeAudioAndSaveUtil,
};
