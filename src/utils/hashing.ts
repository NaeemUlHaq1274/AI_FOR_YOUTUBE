import CryptoJS from 'crypto-js'
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import axios from 'axios';

export const hashEmail = (email: string) => CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);

export const checkEmailHash = async (hashKey: string) => {
  try {
    const hashDoc = await firestore().collection('Hash').doc(hashKey).get();
    return {
      isHashExists: hashDoc.exists,
      data: hashDoc.exists ? hashDoc.data() : null,
    };
  } catch (error) {
    console.error('Error checking hash key:', error);
    return false;
  }
};

export const handleDeleteAccount = async ({ userId, userEmail, logout }: { userId: string, userEmail: string, logout: () => void }) => {
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete your account?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const response = await axios.post("https://us-central1-ai-interview-a2e8a.cloudfunctions.net/deleteAccount", {
              userId: userId,
              userEmail: userEmail,
            });
            if (!response.data.success) throw new Error("Error: " + JSON.stringify(response.data));
            logout();
          } catch (error: any) {
            throw new Error("Error: " + error);
          }
        },
      },
    ],
    { cancelable: false },
  );
};