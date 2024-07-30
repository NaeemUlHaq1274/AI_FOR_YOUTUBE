import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, FlatList } from 'react-native';
import { MY_COLORS, LAYOUT, CATEGORIES } from '@constants';
import { adjust } from '@utils';

interface CategoryModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setSelectedSubcategory: (subcategory: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    visible,
    setVisible,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
}) => {
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory('');
        setVisible(false);
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Category</Text>
                    <FlatList
                        data={CATEGORIES}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.modalButton, selectedCategory === item && styles.selectedModalButton]}
                                onPress={() => selectCategory(item)}
                            >
                                <Text style={[styles.modalButtonText, selectedCategory === item && styles.selectedModalButtonText]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: MY_COLORS.WHITE,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        padding: LAYOUT.SPACING_MEDIUM,
        alignItems: 'stretch',
    },
    modalTitle: {
        fontSize: adjust(18),
        fontWeight: 'bold',
        color: MY_COLORS.BLACK,
        marginBottom: LAYOUT.SPACING_MEDIUM,
        textAlign: 'center',
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
    closeButton: {
        marginTop: LAYOUT.SPACING_SMALL,
        padding: LAYOUT.SPACING_SMALL,
        backgroundColor: MY_COLORS.BLACK,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
    },
    closeButtonText: {
        color: MY_COLORS.WHITE,
        fontSize: adjust(16),
        textAlign: 'center',
    },
});

export default CategoryModal;