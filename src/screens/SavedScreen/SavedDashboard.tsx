import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IMAGE_SAVEDS, MY_COLORS } from '@constants';
import { MyText } from '@components';
import ImageSection from './components/ImageSection';

const SavedDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ImageSection
          imageSource={IMAGE_SAVEDS.IMAGE_SAVEDS_1}
          title="Title 1"
          description="Description for section 1"
        />
        <ImageSection
          imageSource={IMAGE_SAVEDS.IMAGE_SAVEDS_1}
          title="Title 2"
          description="Description for section 2"
        />
        {/* Add more ImageSection components as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MY_COLORS.BLACK,
  },
  contentContainer: {
    padding: 20,
  },
});

export default SavedDashboard;
