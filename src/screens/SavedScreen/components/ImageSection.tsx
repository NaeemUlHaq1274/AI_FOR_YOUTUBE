import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MyText } from '@components';
import { IMAGE_SAVEDS, MY_COLORS } from '@constants';

interface ImageSectionProps {
    imageSource: any; // Adjust the type as per your image source type
    title: string;
    description: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageSource, title, description }) => {
    return (
        <View style={styles.section}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <MyText style={styles.title} h4 bold>
                    {title}
                </MyText>
                <MyText style={styles.description} p>
                    {description}
                </MyText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    textContainer: {
        paddingHorizontal: 10,
    },
    title: {
        color: MY_COLORS.WHITE,
        marginBottom: 5,
    },
    description: {
        color: MY_COLORS.DARK_GRAY,
    },
});

export default ImageSection;
