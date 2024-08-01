import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuth } from '@context';
import { IMAGE_SAVEDS, MY_COLORS } from '@constants';
import { MyText } from '@components';
import ImageSection from './components/ImageSection';

const SavedDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {currentUser?.photoURL ? (
          <Image source={{ uri: currentUser.photoURL }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <MyText style={styles.userName}>{currentUser?.displayName || 'User'}</MyText>
      </View>
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
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: MY_COLORS.DARK_GRAY,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc', // Placeholder color
    marginBottom: 10,
  },
  userName: {
    color: MY_COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
});

export default SavedDashboard;
