// RenderOption.tsx
import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import { MyText } from '@components';

interface RenderOptionProps {
    title: string;
    icon: ImageSourcePropType;
    onIconPress?: () => void;
}

const RenderOption: React.FC<RenderOptionProps> = ({ title, icon, onIconPress }) => (
    <View style={styles.optionButton}>
        <MyText cp color={MY_COLORS.WHITE}>{title}</MyText>
        <TouchableOpacity>
            <Image source={icon} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: MY_COLORS.DARK_GRAY,
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
