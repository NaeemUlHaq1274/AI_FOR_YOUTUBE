import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import { MyText } from '@components';

interface RenderOptionProps {
    title: string;
}

const RenderOption: React.FC<RenderOptionProps> = ({ title }) => (
    <View style={styles.optionButton} >
        <MyText cp color={MY_COLORS.WHITE}>{title}</MyText>
        <TouchableOpacity>
            <Image source={ICONS_PATHS.PLUS} />
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
    iconWrapper: {
        borderRadius: adjust(12.5),
        backgroundColor: MY_COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RenderOption;
