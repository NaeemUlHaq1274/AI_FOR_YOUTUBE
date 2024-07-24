// importFileUtil.ts
// importFileUtil.ts
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

export const importAudioFile = async (): Promise<DocumentPickerResponse | undefined> => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });

    console.log("res", res);

    if (!res) {
      throw new Error("Cannot pick document");
    }

    if (Array.isArray(res) && res.length > 1) {
      // Handle case where multiple files are picked (if needed)
      console.log('Multiple files picked:', res.length);
      return undefined; // Or handle as per your application logic
    } else {
      // Single file picked
      return Array.isArray(res) ? res[0] : res;
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Import cancelled');
    } else {
      console.error('Error picking file:', err);
      throw err;
    }
  }
};
