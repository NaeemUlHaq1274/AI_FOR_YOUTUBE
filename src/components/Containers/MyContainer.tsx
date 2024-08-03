import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { adjust } from '@utils';

interface MyContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

const MyContainer: React.FC<MyContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default MyContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(8),
  },
});
