// import { ErrorBoundaryFallbackUI, MyButton, MyText } from '@components';
// import { AuthProvider, SubscriptionProvider } from '@context';
// import { usePushNotification } from '@hooks';
// import { useEffect } from 'react';
// import { StyleSheet, View } from 'react-native'
// import SplashScreen from 'react-native-splash-screen';
// import ErrorBoundary from 'react-native-error-boundary';
// import crashlytics from '@react-native-firebase/crashlytics'
// import { AuthNavigator, BottomTabNavigation } from '@navigation';
// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { ICONS_PATHS, MY_COLORS } from '@constants';


// const App = () => {

//   const { getFCMToken, requestUserPermission, onNotificationOpenedAppFromBackground, onNotificationOpenedAppFromQuit, listenToBackgroundNotifications, listenToForegroundNotifications } = usePushNotification()
//   useEffect(() => {
//     SplashScreen.hide();
//     const listenToNotifications = async () => {
//       try {
//         const res = await requestUserPermission();
//         if (res) {
//           getFCMToken();
//           onNotificationOpenedAppFromQuit();
//           listenToBackgroundNotifications();
//           listenToForegroundNotifications();
//           onNotificationOpenedAppFromBackground();
//         }
//       } catch (error: any) {
//         console.log('Error at getting push notification: ', error.message);
//       }
//     };

//     listenToNotifications();
//   }, []);
//   return (
//     <NavigationContainer>
//       <ErrorBoundary
//         onError={(error) => crashlytics().recordError(error)}
//         FallbackComponent={ErrorBoundaryFallbackUI}>
//         <AuthProvider>
//           <GestureHandlerRootView style={{ flex: 1, }}>
//             <AuthNavigator />
//             {/* <BottomTabNavigation /> */}
//           </GestureHandlerRootView>
//         </AuthProvider>
//       </ErrorBoundary>
//     </NavigationContainer>

//   )
// }

// export default App

// const styles = StyleSheet.create({})

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PaywallContainer from './src/PaywallContainer';
import { ModalSheet } from '@components';
import { hp } from '@utils';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalSheet onRequestClose={()=>{}} visible={true} contentStyle={{maxHeight:hp(100),height:hp(95)}} >
        <PaywallContainer />
      </ModalSheet>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});