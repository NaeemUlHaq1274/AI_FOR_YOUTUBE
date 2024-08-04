import React, { useCallback, useMemo } from 'react';
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
    const [settingModalVisible, setSettingModalVisible] = React.useState(false);

    const CategoryItem = useCallback(({ text, onPress, disabled = false }: { text: string; onPress: () => void; disabled?: boolean }) => (
        <TouchableOpacity
            style={[styles.category, disabled && styles.disabledCategory]}
            onPress={onPress}
            disabled={disabled}
        >
            <MyText>{text}</MyText>
            <Image source={ICONS_PATHS.MENU} />
        </TouchableOpacity>
    ), []);

    const categoryItems = useMemo(() => (
        <>
            <CategoryItem text={selectedCategory || 'Select Category'} onPress={handleCategoryPress} />
            <CategoryItem text={selectedSubcategory || 'Select Subcategory'} onPress={handleSubcategoryPress} disabled={!selectedCategory} />
        </>
    ), [CategoryItem, selectedCategory, selectedSubcategory, handleCategoryPress, handleSubcategoryPress]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftContent}>
                    <MyText>Generate by Category</MyText>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image source={ICONS_PATHS.NEXT} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setSettingModalVisible(true)}>
                    <Image source={ICONS_PATHS.SETTING_ICON} />
                </TouchableOpacity>
            </View>

            {categoryItems}

            <SettingModal visible={settingModalVisible} onClose={() => setSettingModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: adjust(6),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingEnd: 6,
    },
    leftContent: {
        flexDirection: 'row',
        gap: adjust(6),
        alignItems: 'center',
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: MY_COLORS.BLACK,
        padding: adjust(8),
        borderRadius: 8,
    },
    disabledCategory: {
        opacity: 0.5,
    },
});

export default React.memo(CategorySelection);