import { StyleSheet, View, Dimensions, Modal, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { adjust } from '@utils';

const { height, width } = Dimensions.get("window");

interface ModalSheetProps {
  children: ReactNode;
  visible: boolean;
  onRequestClose: () => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const ModalSheet: React.FC<ModalSheetProps> = ({ children, visible, onRequestClose, style, contentContainerStyle }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={[styles.container, style]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(10),
    height: height,
    width: width,
  },
});

export default ModalSheet;


