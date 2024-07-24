import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { MY_COLORS } from '@constants';
import MyText from './MyText';
import MyButton from './MyButton';


const ErrorBoundaryFallbackUI: React.FC = () => {
  const handleRetry = () => {
    RNRestart.restart();
  };
  return (
    <View style={styles.container}>
      <MyText h2 color='white'>Oops!</MyText>
      <MyText p color='white' style={{marginVertical: 12}}>Something went wrong please try again.</MyText>
      <MyButton title='Retry' onPress={()=> handleRetry()} btnType="secondary" />
    </View>
  );
};

export default ErrorBoundaryFallbackUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor:MY_COLORS.PRIMARY,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25 
  }
});