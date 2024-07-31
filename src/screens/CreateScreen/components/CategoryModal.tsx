import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Modal, Animated, Dimensions } from 'react-native';
import { MY_COLORS, LAYOUT, CATEGORIES } from '@constants';
import { adjust } from '@utils';

interface CategoryBottomSheetProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setSelectedSubcategory: (subcategory: string) => void;
}

const { height } = Dimensions.get('window');

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
    visible,
    setVisible,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
}) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible, animation]);

    const selectCategory = useCallback((category: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory('');
        setVisible(false);
    }, [setSelectedCategory, setSelectedSubcategory, setVisible]);

    const renderItem = useCallback(({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
            ]}
            onPress={() => selectCategory(item)}
        >
            <Text
                style={[
                    styles.categoryButtonText,
                    selectedCategory === item && styles.selectedCategoryButtonText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    ), [selectedCategory, selectCategory]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                />
                <Animated.View
                    style={[
                        styles.bottomSheetContainer,
                        { transform: [{ translateY }] }
                    ]}
                >
                    <View style={styles.handle} />
                    <Text style={styles.title}>Select Category</Text>
                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderItem}
                        keyExtractor={(item: string) => item}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={true}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    bottomSheetContainer: {
        backgroundColor: MY_COLORS.WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: LAYOUT.SPACING_MEDIUM,
        paddingBottom: LAYOUT.SPACING_MEDIUM,
        maxHeight: '80%',
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: MY_COLORS.DARK_GRAY,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: LAYOUT.SPACING_SMALL,
    },
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
    categoryButton: {
        backgroundColor: MY_COLORS.DARK_GRAY,
        padding: LAYOUT.SPACING_SMALL,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        marginBottom: LAYOUT.SPACING_SMALL,
    },
    categoryButtonText: {
        color: MY_COLORS.WHITE,
        fontSize: adjust(16),
        textAlign: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: MY_COLORS.PRIMARY,
    },
    selectedCategoryButtonText: {
        fontWeight: 'bold',
    },
});

export default CategoryBottomSheet;