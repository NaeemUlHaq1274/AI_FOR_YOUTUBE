import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MyText, PressableImage } from '@components';
import { MY_COLORS } from '@constants';
import { adjust } from '@utils';

type ContentSectionProps = {
  title: string;
  content: { text?: string; source?: any };
  icons?: { source: any; onPress: () => void }[];
};

const ContentSection: React.FC<ContentSectionProps> = ({ title, content, icons = [] }) => {
  const isImageContent = !!content.source;

  return (
    <View style={styles.container}>
      <MyText p bold>{title}</MyText>
      <View style={styles.contentContainer}>
        <View style={[styles.content, { width: icons.length > 0 ? '89%' : '100%' }]}>
          {isImageContent ? (
            <Image style={styles.image} resizeMode="contain" source={content.source} />
          ) : (
            <MyText cp>{content.text}</MyText>
          )}
        </View>
        {icons.length > 0 && (
          <View style={styles.iconsContainer}>
            {icons.map((icon, index) => (
              <PressableImage key={index} onPress={icon.onPress} source={icon.source} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default ContentSection;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: MY_COLORS.BLACK,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  content: {
    borderWidth: 2,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  iconsContainer: {
    gap: adjust(12),
    borderWidth: 2,
    borderColor: 'white',
  },
});
