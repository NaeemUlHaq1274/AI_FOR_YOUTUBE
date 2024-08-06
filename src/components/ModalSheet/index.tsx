// ModalSheet.js
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';
import { adjust } from '@utils';
import MyText from '../MyText';

const { height, width } = Dimensions.get("window");

interface ModalSheetProps {
  children: ReactNode;
  visible: boolean;
  onRequestClose: () => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const ModalSheet: React.FC<ModalSheetProps> = ({
  children,
  visible,
  onRequestClose,
  style,
  contentContainerStyle,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onRequestClose}
      style={[styles.modal, style]}
      swipeDirection="down"
      onSwipeComplete={onRequestClose}
    >
      <View style={styles.content}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{width:adjust(36)}} />
          <View style={styles.handle} />
          <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
            <MyText color='white'>Close</MyText>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={[styles.scrollContainer, contentContainerStyle]} showsVerticalScrollIndicator={false}   >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
  },
  handle: {
    width: adjust(40),
    height: adjust(5),
    backgroundColor: '#ccc',
    borderRadius: adjust(2.5),
    alignSelf: 'center',
    marginBottom: adjust(10),
  },
  scrollContainer: {
    flexGrow: 1,
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default ModalSheet;
