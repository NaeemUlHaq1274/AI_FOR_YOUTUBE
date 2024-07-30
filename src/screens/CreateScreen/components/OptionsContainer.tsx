import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from '@components';
import { MY_COLORS, DASHBOARD_ITEMS } from '@constants';
import { adjust } from '@utils';
import RenderOption from './RenderOption';

const OptionsContainer: React.FC = () => {
    return (
        <View style={styles.optionsContainer}>
            <View style={styles.optionsHeader}>
                <MyText p style={styles.labelText}>Choose Options</MyText>
            </View>
            <View style={{ gap: adjust(8) }}>
                {DASHBOARD_ITEMS.map(option => (
                    <RenderOption key={option} title={option} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        gap: adjust(6),
    },
    optionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: adjust(8),
    },
    labelText: {
        color: MY_COLORS.WHITE,
    },
});

export default OptionsContainer;