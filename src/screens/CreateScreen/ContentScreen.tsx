import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { MyText, PressableImage } from '@components';
import { CREATE_CONTENT_SCREEN, MY_COLORS } from '@constants';
import { adjust } from '@utils';
import ContentSection from './components/ContentSection';

const ContentScreen = () => {
  const textContent = {
    text: "Discover the incredible health benefits of eating apples daily! Learn how this simple habit can boost your overall wellness and keep the doctor away",
  };

  const imageContent = {
    source: CREATE_CONTENT_SCREEN.YOUTUBE_THUMBNAIL_DUMMY_IMAGE,
  };

  const textIcons = [
    { source: CREATE_CONTENT_SCREEN.RELOAD, onPress: () => { /* Handle reload */ } },
    { source: CREATE_CONTENT_SCREEN.COPY, onPress: () => { /* Handle copy */ } },
  ];

  const imageIcons = [
    { source: CREATE_CONTENT_SCREEN.RELOAD, onPress: () => { /* Handle reload */ } },
    { source: CREATE_CONTENT_SCREEN.DOWNLOAD, onPress: () => { /* Handle download */ } },
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "black" }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.GO_BACK} />
          <MyText p>Generate</MyText>
        </View>
        <View style={styles.headerRight}>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.SAVE} />
        </View>
      </View>

      {/* Content Creation Section */}
      <View style={styles.body}>
        <ContentSection title="Your Topic" content={textContent} />
        <ContentSection title="Thumbnail" content={imageContent} icons={imageIcons} />
        <ContentSection title="TItle" content={textContent} icons={textIcons} />
        <ContentSection title="Description" content={textContent} icons={textIcons} />
        <ContentSection title="Tags" content={textContent} icons={textIcons} />
        <ContentSection title="Audio" content={textContent} icons={textIcons} />
        <ContentSection title="Script" content={textContent} icons={textIcons} />


        <MyText style={{}}>Generate</MyText>
        <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
        <View>
        </View>

        <View>
          <MyText style={{}}>Generate</MyText>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
        </View>

        <View>
          <MyText style={{}}>Generate</MyText>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
        </View>

      </View>
    </ScrollView>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: MY_COLORS.BLACK,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: adjust(12),
    paddingHorizontal: adjust(12),
  },
  headerLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  body: {
    paddingHorizontal: adjust(12),
    gap: adjust(20),
    paddingVertical: adjust(20),
  },
});
