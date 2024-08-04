import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MyContainer, MyText } from '@components';
import { MY_COLORS, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import BottomSheet from '@gorhom/bottom-sheet';
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
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [settingModalVisible, setSettingModalVisible] = useState(false);

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const CategoryItem = ({ text, onPress, disabled = false }: { text: string; onPress: () => void; disabled?: boolean }) => (
        <TouchableOpacity
            style={[styles.category, disabled && styles.disabledCategory]}
            onPress={onPress}
            disabled={disabled}
        >
            <MyText>{text}</MyText>
            <Image source={ICONS_PATHS.MENU} />
        </TouchableOpacity>
    );

    return (
        <View style={{ gap: adjust(6) }}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', gap: adjust(6) }}>
                    <MyText>{'Generate by Category'}</MyText>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image source={ICONS_PATHS.NEXT} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setSettingModalVisible(true)}>
                    <Image source={ICONS_PATHS.SETTING_ICON} />
                </TouchableOpacity>
                <SettingModal visible={settingModalVisible} onClose={() => setSettingModalVisible(false)} />
            </View>

            <CategoryItem text={selectedCategory || 'Select Category'} onPress={handleCategoryPress} />
            <CategoryItem text={selectedSubcategory || 'Select Subcategory'} onPress={handleSubcategoryPress} disabled={!selectedCategory} />

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={[300, '50%', '100%']}
                onChange={(index) => {
                    if (index === -1) { }
                }}
            >
                <MyContainer>
                    <CategoryItem text={selectedCategory || 'Select Category'} onPress={handleCategoryPress} />
                    <CategoryItem text={selectedSubcategory || 'Select Subcategory'} onPress={handleSubcategoryPress} disabled={!selectedCategory} />
                </MyContainer>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingEnd: 6
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
    bottomSheetContent: {
        padding: adjust(16),
    },
});

export default CategorySelection;
