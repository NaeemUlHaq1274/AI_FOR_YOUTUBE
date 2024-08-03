import { StyleSheet, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { adjust } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';

interface MyScrollableContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const MyScrollableContainer: React.FC<MyScrollableContainerProps> = ({ children, style, contentContainerStyle }) => {
  return (
    <ScrollView style={[styles.container, style]} contentContainerStyle={contentContainerStyle}>
      {children}
    </ScrollView>
  );
};

export default MyScrollableContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(10),
  },
});
