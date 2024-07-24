import { useEffect, useCallback } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useAlertBackHandler = (isSaved:boolean = false) => {
  const navigation = useNavigation();

  const handleBackPress = useCallback(() => {
    if (isSaved) {
      navigation.goBack();
      return true; // Return true to indicate that the event is handled
    } else {
      Alert.alert(
        'Confirm',
        'Are you sure you want to go back? Your generated novel will be lost.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
      return true; // Return true to prevent the default back action
    }
  }, [isSaved, navigation]);

  useEffect(() => {
    const backHandler = () => handleBackPress();

    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, [handleBackPress]);
};

export default useAlertBackHandler;
