import AsyncStorage from '@react-native-async-storage/async-storage';

// newData = {...data,"fileName":inputValue}
export const storeSavedData = async(newData:object) =>{
  try {
    // Get Existing Data
    const existingData = await AsyncStorage.getItem('dataObj');
    const parsedExistingData = existingData ? await JSON.parse(existingData) : [];

    // Append the new question data
    const updatedSavedData = [...parsedExistingData, newData];
    await AsyncStorage.setItem(
      'dataObj',
      JSON.stringify(updatedSavedData),
    );
    console.log('Data stored successfully!');
  } catch (error) {
    console.error('Error storing saved data: ', error);
  }
};

export const deleteSavedData = async() =>{
  try {
    await AsyncStorage.setItem(
      'dataObj',
      JSON.stringify([]),
    );
    console.log('Data deleted successfully!');
  } catch (error) {
    console.error('Error deleting saved data: ', error);
  }
};


export const getSavedData = async() =>{
  try {
    const existingData = await AsyncStorage.getItem('dataObj');
    const parsedExistingData = existingData ? await JSON.parse(existingData) : [];    
    return parsedExistingData;

  } catch (error) {
    console.error('Error fetching saved data: ', error);
  }
}

export const removeSavedData = async(uidToRemove:any) =>{
  try {
    // Get Existing Data
    const existingData = await AsyncStorage.getItem('dataObj');
    const parsedExistingData = existingData ? await JSON.parse(existingData) : [];

    // Append the new question data
    const updatedSavedData = parsedExistingData.filter((item:any) => item.uid !== uidToRemove);
    await AsyncStorage.setItem(
      'dataObj',
      JSON.stringify(updatedSavedData),
    );
    console.log('Data remove successfully!');
  } catch (error) {
    console.error('Error remove saved data: ', error);
  }
}