import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MyText, MyTextInput } from '@components';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';

interface ThemeInputProps {
    theme: string;
    setTheme: (theme: string) => void;
    handleIconPress: () => void;
}

const ThemeInput: React.FC<ThemeInputProps> = ({ theme, setTheme, handleIconPress }) => {
    return (
        <View style={{ gap: adjust(6) }}>
            <View style={styles.row}>
                <MyText p style={styles.labelText}>Generate by Theme</MyText>
                <TouchableOpacity onPress={handleIconPress}>
                    <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
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