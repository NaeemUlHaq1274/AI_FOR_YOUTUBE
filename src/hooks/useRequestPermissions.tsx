import { useEffect, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, Permission } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'unsupported';

const useRequestPermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('denied');

  const requestPermissions = async (permissions: Permission[]): Promise<void> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const allPermissionsGranted = permissions.every(
          (permission) => granted[permission] === PermissionsAndroid.RESULTS.GRANTED
        );

        setPermissionStatus(allPermissionsGranted ? 'granted' : 'denied');

      } else if (Platform.OS === 'ios') {
        // Handle iOS permission requests here
        setPermissionStatus('granted'); // Assuming permission is granted by default on iOS
      } else {
        setPermissionStatus('unsupported');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setPermissionStatus('denied');
    }
  };


  const checkPermissions = async (permissions: Permission[]): Promise<void> => {
    try {
      if (Platform.OS === 'android') {
        // Check if each permission is granted
        const checkResults = await Promise.all(
          permissions.map(permission => PermissionsAndroid.check(permission))
        );
        const allPermissionsGranted = checkResults.every(result => result);

        setPermissionStatus(allPermissionsGranted ? 'granted' : 'denied');
      } else if (Platform.OS === 'ios') {
        // Handle iOS permission checks here
        setPermissionStatus('granted'); // Assume granted for simplicity
      } else {
        setPermissionStatus('unsupported');
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
      setPermissionStatus('denied');
    }
  };


  const permissionAlert = async (): Promise<void> => {
    Alert.alert(
      'Permissions Required',
      'This app needs certain permissions to function properly. Please go to the app settings to enable the permissions.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            // Use setTimeout to ensure alert is fully dismissed before opening settings
            setTimeout(async() => {
              await Linking.openSettings();
            }, 100);
          },
        },
      ],
    );
  };

  return { permissionStatus, requestPermissions, permissionAlert, checkPermissions };
};

export default useRequestPermissions;



// How to use
// ================

// const { permissionStatus, requestPermissions, permissionAlert } = useRequestPermissions();
// const permissions:Permission[] = ['android.permission.WRITE_EXTERNAL_STORAGE','android.permission.RECORD_AUDIO']


// useEffect(() => {       
//   handleRequestPermission()
// }, []);

// const handleRequestPermission = async () => requestPermissions(permissions);
// const handlePermissionAlert = async () => permissionAlert(permissions);
