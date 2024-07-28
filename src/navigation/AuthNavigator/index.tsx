import * as React from 'react';
import { useAuth } from '../../context';
import { LoginScreen } from '@screens';
import { ActivityIndicator, AppState, AppStateStatus, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adjust } from '@utils';
import { LoadingScreen } from '@components';
import { useLoadingBackHandler } from '@hooks';
import BottomTabNavigation from '../bottomTab';

const App = () => {
  const { currentUser, initializing } = useAuth();
  const [loading, setLoading] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isAllowCount, setIsAllowCount] = React.useState(true);

  React.useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (isAllowCount && nextAppState === 'active') {
        let count = parseInt((await AsyncStorage.getItem('appOpenCount')) || '4');
        console.log('get current count : ', count);
        if (count == 4) setModalVisible(() => true);
        count = count - 1;
        console.log('get update count : ', count);
        if (count == 0) count = 4;
        await AsyncStorage.setItem('appOpenCount', count.toString());
        console.log('current token: ', count);
      }
      setIsAllowCount(false);
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [isAllowCount]);




  useLoadingBackHandler(loading);

  return initializing || loading ? (
    <LoadingScreen description='Login please wait...' />
  ) : (
    <>
      {currentUser ? (
        <>
          {/* <PayWall modalVisible={modalVisible} setModalVisible={(value) => setModalVisible(value)} /> */}
          <BottomTabNavigation />
        </>
      ) : (
        <LoginScreen handleLoading={(value) => setLoading(value)} />
      )}
    </>

  );
};
export default App;

const styles = StyleSheet.create({

})