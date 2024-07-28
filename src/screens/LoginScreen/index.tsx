import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { IMAGES_PATHS, LAYOUT, LOGIN_IMAGES_PATH, MY_COLORS } from '@constants';
import { LoadingScreen, MyButton, MyText } from '@components';
import { useAuth } from '@context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useInputValidation } from '@hooks';
import { adjust, showToast } from '@utils';

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  image: number;
};

const slides: Slide[] = [
  {
    key: 'slide3',
    title: 'Thumbnail Design',
    subtitle: 'Create eye-catching thumbnails that stand out and boost click-through rates.',
    image: LOGIN_IMAGES_PATH.THUMBNAIL_IMAGE,
  },
  {
    key: 'slide2',
    title: 'Script & Audio Creation',
    subtitle: 'Craft engaging scripts and produce high-quality audio files for your videos.',
    image: LOGIN_IMAGES_PATH.AUDIO_IMAGE,
  },
  {
    key: 'slide1',
    title: 'Video Optimization',
    subtitle:
      'Generate captivating titles, SEO-rich descriptions, and targeted tags for maximum visibility',
    image: LOGIN_IMAGES_PATH.VIDEO_OPTIMIZATION_IMAGE,
  },
];

const LoginScreen: React.FC<{ handleLoading: (val: boolean) => void }> = ({ handleLoading }: any) => {
  const { handleGoogleSignIn } = useAuth()
  const { isInternetConnected } = useInputValidation()


  const handleSignIn = async () => {
    if (!isInternetConnected()) return
    handleLoading(true)
    try {
      await handleGoogleSignIn();
    } catch (error) {
      showToast('Sign-in failed. Please try again.');
      console.error('Sign-in error:', error);
    }
    setTimeout(() => {
      handleLoading(false)
    }, 2000);
  }
  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Image source={item.image} style={{ width: 200, height: 200 }} />
      </View>
      <View style={{ justifyContent: "flex-start", gap: LAYOUT.SPACING_LARGE }}>
        <View style={{ alignItems: "center", justifyContent: "center", gap: adjust(5) }} >
          <MyText h2 bold style={{ textAlign: 'center', color:MY_COLORS.WHITE }}>{item.title}</MyText>
          <MyText cp style={{ textAlign: 'center', }}>{item.subtitle}</MyText>
        </View>
        <TouchableOpacity style={styles.googleBtn} onPress={() => { handleSignIn() }}  >
          <Image source={LOGIN_IMAGES_PATH.GOOGLE_ICON} resizeMode="contain" />
          <MyText bold p color='white'>Sign in with Google</MyText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      showNextButton={false}
      showSkipButton={false}
      showPrevButton={false}
      showDoneButton={false}
      dotStyle={{ backgroundColor: MY_COLORS.WHITE }}
      activeDotStyle={{ backgroundColor: MY_COLORS.PRIMARY }}
    />
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    gap: LAYOUT.SPACING_LARGE
  },
  topBox: { alignItems: 'center', justifyContent: 'flex-end' },
  googleBtn: { flexDirection: "row", justifyContent: "center", gap: 12, borderRadius: 8, backgroundColor: MY_COLORS.PRIMARY, paddingVertical: 12, width: "95%", alignSelf: "center" },
});