import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MyText, MyTextInput } from '@components';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import SettingModal from './SettingModal';

interface ThemeInputProps {
    theme: string;
    setTheme: (theme: string) => void;
    handleIconPress: () => void;
}

const ThemeInput: React.FC<ThemeInputProps> = ({ theme, setTheme, handleIconPress }) => {
    const [settingModalVisible, setSettingModalVisible] = useState(false);
    return (
        <View style={{ gap: adjust(6) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.row}>
                    <MyText p style={styles.labelText}>Generate by Theme</MyText>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setSettingModalVisible(true)}>
                    <Image source={ICONS_PATHS.SETTING_ICON} style={styles.nextIcon} />
                </TouchableOpacity>
                <SettingModal visible={settingModalVisible} onClose={() => setSettingModalVisible(false)} />
            </View>
            <MyTextInput
                placeholder="Enter the prompt for your video theme here..."
                value={theme}
                onChangeText={setTheme}
                style={styles.themeInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: adjust(8),
    },
    labelText: {
        color: MY_COLORS.WHITE,
    },
    nextIcon: {
        width: 24,
        height: 24,
    },
    themeInput: {
        backgroundColor: MY_COLORS.DARK_GRAY,
        color: MY_COLORS.WHITE,
        borderRadius: 8,
    },
});

export default ThemeInput;