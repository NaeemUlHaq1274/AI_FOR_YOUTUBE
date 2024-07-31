import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MyText } from '@components';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';

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
    return (
        <View style={{ gap: adjust(6) }}>
            <View style={styles.row}>
                <MyText>{'Generate by Category'}</MyText>
                <TouchableOpacity onPress={handleIconPress}>
                    <Image source={ICONS_PATHS.NEXT} style={styles.nextIcon} />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
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