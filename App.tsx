import { ErrorBoundaryFallbackUI, MyText } from '@components';
import { SubscriptionProvider } from '@context';
import { usePushNotification } from '@hooks';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from 'react-native-error-boundary';
import crashlytics from '@react-native-firebase/crashlytics'
import { BottomTabNavigation } from '@navigation';


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
    <ErrorBoundary
      onError={(error) => crashlytics().recordError(error)}
      FallbackComponent={ErrorBoundaryFallbackUI}>
        <BottomTabNavigation />
        {/* <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"red"}}><MyText color='white'>hello</MyText></View> */}
    </ErrorBoundary>
  )
}

export default App

const styles = StyleSheet.create({})