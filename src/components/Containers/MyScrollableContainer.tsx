import { StyleSheet, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { adjust } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';

interface MyScrollableContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  ref?:any;
}

const MyScrollableContainer: React.FC<MyScrollableContainerProps> = ({ children, style, contentContainerStyle, ref }) => {
  return (
    <ScrollView ref={ref} style={ style} contentContainerStyle={[styles.container,contentContainerStyle]} showsVerticalScrollIndicator={false}>
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
