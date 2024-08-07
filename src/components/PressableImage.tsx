import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';

interface PressableImageProps {
  source: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
}

const PressableImage: React.FC<PressableImageProps> = ({ source, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={source} />
    </TouchableOpacity>
  );
}

export default PressableImage;

const styles = StyleSheet.create({});
