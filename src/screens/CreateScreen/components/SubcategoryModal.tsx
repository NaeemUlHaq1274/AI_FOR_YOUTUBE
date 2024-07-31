import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, FlatList, Animated, Dimensions } from 'react-native';
import { MY_COLORS, LAYOUT, SUBCATEGORIES } from '@constants';
import { adjust } from '@utils';

interface SubcategoryBottomSheetProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedCategory: string;
    selectedSubcategory: string;
    setSelectedSubcategory: (subcategory: string) => void;
}

const { height } = Dimensions.get('window');

const SubcategoryBottomSheet: React.FC<SubcategoryBottomSheetProps> = ({
    visible,
    setVisible,
    selectedCategory,
    selectedSubcategory,
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

    const selectSubcategory = useCallback((subcategory: string) => {
        setSelectedSubcategory(subcategory);
        setVisible(false);
    }, [setSelectedSubcategory, setVisible]);

    const renderItem = useCallback(({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.modalButton,
                selectedSubcategory === item && styles.selectedModalButton
            ]}
            onPress={() => selectSubcategory(item)}
        >
            <Text style={[
                styles.modalButtonText,
                selectedSubcategory === item && styles.selectedModalButtonText
            ]}>
                {item}
            </Text>
        </TouchableOpacity>
    ), [selectedSubcategory, selectSubcategory]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalOverlay}>
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
                    <Text style={styles.modalTitle}>Select Subcategory</Text>
                    <FlatList
                        data={selectedCategory ? SUBCATEGORIES[selectedCategory] : []}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={true}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
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
    modalTitle: {
        fontSize: adjust(18),
        fontWeight: 'bold',
        color: MY_COLORS.BLACK,
        marginBottom: LAYOUT.SPACING_MEDIUM,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: LAYOUT.SPACING_MEDIUM,
    },
    modalButton: {
        backgroundColor: MY_COLORS.DARK_GRAY,
        padding: LAYOUT.SPACING_SMALL,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        marginBottom: LAYOUT.SPACING_SMALL,
    },
    modalButtonText: {
        color: MY_COLORS.WHITE,
        fontSize: adjust(16),
        textAlign: 'center',
    },
    selectedModalButton: {
        backgroundColor: MY_COLORS.PRIMARY,
    },
    selectedModalButtonText: {
        fontWeight: 'bold',
    },
});

export default SubcategoryBottomSheet;