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
        <Image source={icon} />
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

});

export default RenderOption;
