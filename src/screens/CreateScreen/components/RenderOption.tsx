import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { MY_COLORS } from '@constants';
import { adjust } from '@utils';
import { MyText } from '@components';

interface RenderOptionProps {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void;
}

const RenderOption: React.FC<RenderOptionProps> = ({ title, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.optionButton}>
        <MyText cp color={MY_COLORS.WHITE}>{title}</MyText>
        <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: MY_COLORS.BLACK,
        padding: adjust(8),
        borderRadius: 8,
    },
    icon: {
        width: adjust(20),
        height: adjust(20),
        marginRight: adjust(10),
    },
});

export default RenderOption;
