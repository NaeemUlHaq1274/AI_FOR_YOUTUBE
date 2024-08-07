import { AuthProvider, SubscriptionProvider } from '@context';
import { usePushNotification } from '@hooks';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import { ModalSheet, MyText } from '@components';

const App = () => {

  const { getFCMToken, requestUserPermission, onNotificationOpenedAppFromBackground, onNotificationOpenedAppFromQuit, listenToBackgroundNotifications, listenToForegroundNotifications } = usePushNotification()
  useEffect(() => {
    SplashScreen.hide();
    const listenToNotifications = async () => {
      try {
        const res = await requestUserPermission();
        if (res) {
          getFCMToken();
          onNotificationOpenedAppFromQuit();
          listenToBackgroundNotifications();
          listenToForegroundNotifications();
          onNotificationOpenedAppFromBackground();
        }
      } catch (error: any) {
        console.log('Error at getting push notification: ', error.message);
      }
    };

    listenToNotifications();
  }, []);
  return (
    <ModalSheet visible={true} onRequestClose={() => { }}>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
      <MyText >hello</MyText>
    </ModalSheet>
  )
}

export default App

const styles = StyleSheet.create({})

