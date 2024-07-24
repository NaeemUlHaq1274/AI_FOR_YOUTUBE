// uploadFileUtil.ts
import axios from 'axios';
import { DocumentPickerResponse } from 'react-native-document-picker';

interface FileUploadResponse {
  success: boolean;
  message: string;
}

// Ensure file parameter type matches DocumentPickerResponse
export const uploadFile = async (file: DocumentPickerResponse | undefined) => {
  try {
    if (!file || file.size === 0) {
      console.log(file);
      throw new Error('Invalid file provided');
    }

    // Create a form data object to send the file
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type!,
      name: file.name,
    });



    console.log("===========")
    console.log("===========")
    console.log(formData)
    console.log("===========")
    console.log("===========")
    console.log("===========")

    // Replace 'YOUR_BACKEND_URL/api/upload' with your actual backend URL
    // const response = await axios.post('-------------------------', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    const response = {data:"node"}
    
    console.log('File uploaded successfully', response.data);
    return response.data;
  } catch (err) {
    console.error('Error uploading file:', err);
    return { success: false, message: 'Failed to upload file' };
  }
};
