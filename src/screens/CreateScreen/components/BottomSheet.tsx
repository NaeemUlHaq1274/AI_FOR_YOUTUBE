import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import { MY_COLORS, LAYOUT, CATEGORIES, SUBCATEGORIES } from '@constants';
import { adjust } from '@utils';
import { MyBottomSheet } from '@components';

interface BottomSheetProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedItem: string;
    setSelectedItem: (item: string) => void;
    type: 'category' | 'subcategory';
    selectedCategory?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    setVisible,
    selectedItem,
    setSelectedItem,
    type,
    selectedCategory,
}) => {

    const selectItem = useCallback((item: string) => {
        setSelectedItem(item);
        setVisible(false);
    }, [setSelectedItem, setVisible]);

    const renderItem = useCallback(({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.itemButton,
                selectedItem === item && styles.selectedItemButton
            ]}
            onPress={() => selectItem(item)}
        >
            <Text style={[
                styles.itemButtonText,
                selectedItem === item && styles.selectedItemButtonText
            ]}>
                {item}
            </Text>
        </TouchableOpacity>
    ), [selectedItem, selectItem]);

    const getData = () => {
        if (type === 'category') return CATEGORIES;
        if (type === 'subcategory' && selectedCategory) return SUBCATEGORIES[selectedCategory];
        return [];
    };

    return (
        <MyBottomSheet visible={visible} setVisible={setVisible}>
            <Text style={styles.title}>Select {type === 'category' ? 'Category' : 'Subcategory'}</Text>
            <FlatList
                data={getData()}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={true}
            />
        </MyBottomSheet>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: adjust(18),
        fontWeight: 'bold',
        color: MY_COLORS.BLACK,
        marginVertical: LAYOUT.SPACING_MEDIUM,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: LAYOUT.SPACING_MEDIUM,
    },
    itemButton: {
        backgroundColor: MY_COLORS.DARK_GRAY,
        padding: LAYOUT.SPACING_SMALL,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        marginBottom: LAYOUT.SPACING_SMALL,
    },
    itemButtonText: {
        color: MY_COLORS.WHITE,
        fontSize: adjust(16),
        textAlign: 'center',
    },
    selectedItemButton: {
        backgroundColor: MY_COLORS.PRIMARY,
    },
    selectedItemButtonText: {
        fontWeight: 'bold',
    },
});

export default BottomSheet;
