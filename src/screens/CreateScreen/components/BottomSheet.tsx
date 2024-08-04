import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MY_COLORS, LAYOUT, CATEGORIES, SUBCATEGORIES, ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import { MyBottomSheet } from '@components';
import { Image } from 'react-native';

interface BottomSheetProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedItem: string | null;
    setSelectedItem: (item: string) => void;
    type: 'category' | 'subcategory' | 'remove';
    selectedCategory?: string;
    items?: string[];
    handleItemClick?: (item: string) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    setVisible,
    selectedItem,
    setSelectedItem,
    type,
    selectedCategory,
    items = [],
    handleItemClick,
}) => {
    const selectItem = useCallback((item: string) => {
        setSelectedItem(item);
        setVisible(false);
    }, [setSelectedItem, setVisible]);

    const renderItem = useCallback(({ item }: { item: string }) => (
        <TouchableOpacity
            style={[styles.itemButton]}
            onPress={() => type === 'remove' ? handleItemClick && handleItemClick(item) : selectItem(item)}
        >
            <Text style={[styles.itemButtonText]}>
                {item}
            </Text>
            {type === 'remove' && (
                <Image source={ICONS_PATHS.MINUS} />
            )}
        </TouchableOpacity>
    ), [selectedItem, selectItem, type, handleItemClick]);

    const getData = () => {
        if (type === 'category') return CATEGORIES;
        if (type === 'subcategory' && selectedCategory) return SUBCATEGORIES[selectedCategory];
        if (type === 'remove') return items;
        return [];
    };

    return (
        <MyBottomSheet visible={visible} setVisible={setVisible}>
            <Text style={styles.title}>Select {type === 'category' ? 'Category' : type === 'subcategory' ? 'Subcategory' : 'Items to Remove'}</Text>
            <View style={styles.listContainer}>
                {getData().map((item) => (
                    <View key={item}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>
        </MyBottomSheet>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: adjust(14),
        fontWeight: 'bold',
        color: MY_COLORS.BLACK,
        marginVertical: LAYOUT.SPACING_MEDIUM,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: LAYOUT.SPACING_MEDIUM,
    },
    itemButton: {
        backgroundColor: MY_COLORS.BLACK,
        padding: LAYOUT.SPACING_SMALL,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        marginBottom: LAYOUT.SPACING_SMALL,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemButtonText: {
        color: MY_COLORS.WHITE,
        fontSize: adjust(12),
    },

});

export default BottomSheet;
