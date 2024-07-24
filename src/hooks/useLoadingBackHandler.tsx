import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '@utils';

const useLoadingBackHandler = (loading:boolean) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (loading) {
        showToast("loading please wait...");
        return true; // Prevent default back action
      } else {
        navigation.goBack(); // Perform navigation back
        return true; // Prevent default back action
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [loading, navigation]);
};

export default useLoadingBackHandler;
