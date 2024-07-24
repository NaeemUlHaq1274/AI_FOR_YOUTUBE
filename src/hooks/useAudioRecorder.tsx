import { SCREEN_NAMES } from '@constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

type RecordingStage = "startRecording" | "pauseRecording" | "resumeRecording" | "overRecording";

const useAudioRecorder = () => {
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [recordingStage, setRecordingStage] = useState<RecordingStage>("startRecording");
  const [recordingDuration, setRecordingDuration] = useState<string|null>('00:00:00');
  const [recordingPath, setRecordingPath] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalRecordedTime, setTotalRecordedTime] = useState<number>(0);
  const [transcribe, setTranscribe] = useState<string>("");

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, [audioRecorderPlayer]);

  const updateRecordingDuration = (e: any) => {
    const currentPosition = e.currentPosition;
    const duration = Math.floor((currentPosition - startTime + totalRecordedTime) / 1000);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setRecordingDuration(formattedTime);
  }; 
  
  const startRecording = async () => {
    try {
      const path = await audioRecorderPlayer.startRecorder();
      console.log('Recording started at path:', path);
      audioRecorderPlayer.addRecordBackListener(updateRecordingDuration);
      setRecordingPath(path);
      setRecordingStage("pauseRecording");
      setStartTime(Date.now());
    } catch (error) {
      console.error('startRecording error:', error);
    }
  };

  const pauseRecording = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setTotalRecordedTime((prev) => prev + (Date.now() - startTime));
      audioRecorderPlayer.removeRecordBackListener();
      setRecordingStage("resumeRecording");
    } catch (error) {
      console.error('pauseRecording error:', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setStartTime(Date.now());
      audioRecorderPlayer.addRecordBackListener(updateRecordingDuration);
      setRecordingStage("pauseRecording");
    } catch (error) {
      console.error('resumeRecording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordingStage("overRecording");
      setTotalRecordedTime(0);
      console.log('Recording stopped. File saved at:', result);
      return result;
    } catch (error) {
      console.error('stopRecording error:', error);
    }
  };

  const redoRecording = async () => {
    try {
      await stopRecording();
      setRecordingDuration('00:00:00');
      setRecordingPath(null);
      setRecordingStage("startRecording");
      setTotalRecordedTime(0);
    } catch (error) {
      console.error('redoRecording error:', error);
    }
  };

  const audioDone = async () => {
    try {
      const result = await stopRecording();
      if (result && recordingPath) {
        // Alert.alert("Recording Done", `File stored at: ${recordingPath}`);
        setRecordingDuration('00:00:00');
        setRecordingPath(recordingPath);
        setRecordingStage("startRecording");
        uploadFile(result)
      } else {
        Alert.alert("Error", "Failed to save the recording.");
      }
    } catch (error) {
      console.error('audioDone error:', error);
    }
  };

  const uploadFile = async (fileUri:string) => {
    const fileName = fileUri.split('/').pop();
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: 'audio/mpeg',
    });

    try {
      // const response = await axios.post('YOUR_BACKEND_URL_HERE', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      setTranscribe("your backend transformer of transcriptions")
      console.log('File uploaded successfully:', "response.data");
      Alert.alert('Success', 'File uploaded successfully');
    } catch (error) {
      console.error('File upload error:', error);
      Alert.alert('Error', 'File upload failed');
    }
  };

  return {
    transcribe,
    recordingStage,
    recordingDuration,
    recordingPath,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    redoRecording,
    audioDone,
  };
};

export default useAudioRecorder;
