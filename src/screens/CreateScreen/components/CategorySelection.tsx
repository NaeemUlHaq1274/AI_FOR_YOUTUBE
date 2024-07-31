import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MyText } from '@components';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import SettingModal from './SettingModal';

interface CategorySelectionProps {
    selectedCategory: string;
    selectedSubcategory: string;
    handleCategoryPress: () => void;
    handleSubcategoryPress: () => void;
    handleIconPress: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
    selectedCategory,
    selectedSubcategory,
    handleCategoryPress,
    handleSubcategoryPress,
    handleIconPress,
}) => {
    const [settingModalVisible, setSettingModalVisible] = useState(false);
    return (
        <View style={{ gap: adjust(6) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.row}>
                    <MyText>{'Generate by Category'}</MyText>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setSettingModalVisible(true)}>
                    <Image source={ICONS_PATHS.SETTING_ICON} style={styles.nextIcon} />
                </TouchableOpacity>
                <SettingModal visible={settingModalVisible} onClose={() => setSettingModalVisible(false)} />
            </View>
            <TouchableOpacity style={styles.category} onPress={handleCategoryPress}>
                <MyText>{selectedCategory || 'Select Category'}</MyText>
                <Image source={ICONS_PATHS.MENU} style={styles.nextIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.category, !selectedCategory && styles.disabledCategory]}
                onPress={handleSubcategoryPress}
                disabled={!selectedCategory}
            >
                <MyText>{selectedSubcategory || 'Select Subcategory'}</MyText>
                <Image source={ICONS_PATHS.MENU} style={styles.nextIcon} />
            </TouchableOpacity>
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
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: MY_COLORS.DARK_GRAY,
        padding: adjust(8),
        borderRadius: 8,
    },
    disabledCategory: {
        opacity: 0.5,
    },
});

export default CategorySelection;