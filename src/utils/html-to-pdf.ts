import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';

// Android Permissions
const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted;
    } catch (err) {
      console.warn(err);
      return PermissionsAndroid.RESULTS.DENIED;
    }
  }
};

const checkAndRequestPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      // add it after confirmed
      // confirmed list: 34 | 33
      if (Platform.Version > 30) return PermissionsAndroid.RESULTS.GRANTED;
      const status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (status) return PermissionsAndroid.RESULTS.GRANTED;

      const granted = await requestPermission();
      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'You have denied storage permission. Please grant the permission in order to use this feature.',
          ToastAndroid.LONG,
        );
        return PermissionsAndroid.RESULTS.DENIED;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Blocked',
          'You have blocked storage permission. Please enable it in your device settings.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('OK Pressed'),
            },
            {
              text: 'Open Settings',
              onPress: openAppSettings,
            },
          ],
        );
        return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
      }
    }
  } catch (error) {
    return PermissionsAndroid.RESULTS.DENIED;
  }
};

const openAppSettings = () => {
  if (Platform.OS === 'android') {
    Linking.openSettings();
  }
};

const exportToPDF = async (content: string) => {
  const status = await checkAndRequestPermission();
  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    try {
      let options = {
        html: content,
        fileName: 'CoverLetter',
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      await FileViewer.open(file.filePath!);
      ToastAndroid.show(
        'Export to PDF was successful, only created content  were included in the export.',
        ToastAndroid.SHORT,
      );
      return null;
    } catch (error) {
      console.log(error);
      Alert.alert('PDF Viewer Required', "To open this PDF file, you'll need a PDF viewer app installed on your device.");
    }
  }
};

export {exportToPDF};