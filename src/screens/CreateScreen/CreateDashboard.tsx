import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ImageSourcePropType } from 'react-native';
import { MY_COLORS, IMAGES_PATHS, ICONS_PATHS, DASHBOARD_ITEMS } from '@constants';
import { adjust } from '@utils';
import { LoadingScreen, MyButton, MyHeader, MyText, MyTextInput } from '@components';
import RenderOption from './components/RenderOption';

const CreateDashboard: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (isLoading) {
    return <LoadingScreen description="Generating your video content..." />;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <MyHeader
          color={MY_COLORS.BLACK}
          title="Creator BOOST"
          iconPath={IMAGES_PATHS.BLACK_FEEDBACK as ImageSourcePropType}
          onPressIcon={() => {/* Handle menu press */ }}
          rightIcon={ICONS_PATHS.USER_PROFILE}
        />
      </View>
      <View style={{ gap: adjust(6) }}>
        <MyText p style={styles.labelText}>Generate by Theme</MyText>
        <MyTextInput
          placeholder="Enter the prompt for your video theme here..."
          value={theme}
          onChangeText={setTheme}
          style={styles.themeInput}
        />
      </View>
      <View style={{ gap: adjust(6) }}>
        <MyText p style={styles.labelText}>Choose Options</MyText>
        <View style={{ gap: adjust(8) }}>
          {DASHBOARD_ITEMS.map(option => (
            <RenderOption key={option} title={option} />
          ))}
        </View>
      </View>

      <View style={{ gap: adjust(6) }}>
        <MyButton
          title="More options"
          btnType="secondary"
          onPress={() => {/* Handle more options */ }}
          style={styles.moreOptionsButton}
          textColor={MY_COLORS.PRIMARY}
          btnWidth="100%"
        />

        <MyButton
          title="Remove items"
          btnType="secondary"
          onPress={() => {/* Handle remove items */ }}
          style={styles.removeItemsButton}
          textColor={MY_COLORS.PRIMARY}
          btnWidth="100%"
        />

        <MyButton
          title="Generate now"
          onPress={handleGenerate}
          iconPath={ICONS_PATHS.GENERATE_ICON as ImageSourcePropType}
          style={styles.generateButton}
          textColor={MY_COLORS.WHITE}
          btnWidth="100%"
        />
      </View>
    </ScrollView>
  );
};

export default CreateDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MY_COLORS.BLACK,
    paddingHorizontal: adjust(12),
    paddingVertical: adjust(8),
    gap: adjust(20),
  },
  content: {

  },
  labelText: {
    color: MY_COLORS.WHITE,
  },
  themeInput: {
    backgroundColor: MY_COLORS.DARK_GRAY,
    color: MY_COLORS.WHITE,
    borderRadius: 8,
  },
  moreOptionsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
  },
  removeItemsButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
  },
  generateButton: {
    backgroundColor: MY_COLORS.PRIMARY,
    borderRadius: 8,
  },
});
