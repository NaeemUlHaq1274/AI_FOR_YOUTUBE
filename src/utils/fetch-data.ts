import axios from "axios";

export const fetchDataFromJsonFile = async () => {
  try {
    // const jobDummyData = require('../../jobDummyData.json');
    const jobDummyData = require('../../jobDummyJson.json');
    // console.log("Data:", jobDummyData.TEMP_DUMMY_DATA.hits);
    return jobDummyData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error()
  }
};




export const generateAiResume = async (jobTitle: string, jobDescription: string, name: any, email: any) => {
    const url = `https://us-central1-courseai-9b4f6.cloudfunctions.net/generateResumeForJobPost?`;
    const postData = {
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      name: name,
      email: email,
    };
  
    try {
      const response = await axios.post(url, postData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error()
    }
  };