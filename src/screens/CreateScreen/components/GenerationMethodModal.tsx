import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { MY_COLORS, LAYOUT } from '@constants';
import { adjust } from '@utils';
import { MyButton, MyText } from '@components';

interface GenerationMethodModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedOption: 'category' | 'theme' | 'v-theme' | 'script';
    setSelectedOption: (option: 'category' | 'theme' | 'v-theme' | 'script') => void;
}

const GenerationMethodModal: React.FC<GenerationMethodModalProps> = ({
    modalVisible,
    setModalVisible,
    selectedOption,
    setSelectedOption,
}) => {
    const handleOptionSelect = (option: 'category' | 'theme' | 'v-theme' | 'script') => {
        setSelectedOption(option);
        setModalVisible(false);
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.buttonRow}>
                        <MyButton
                            title="Category"
                            onPress={() => handleOptionSelect('category')}
                            btnType={selectedOption === 'category' ? 'primary' : 'secondary'}
                        />
                        <MyButton
                            title="Topic"
                            onPress={() => handleOptionSelect('theme')}
                            btnType={selectedOption === 'theme' ? 'primary' : 'secondary'}
                        />
                    </View>
                    <View style={styles.buttonRow}>
                        <MyButton
                            title="V-Theme"
                            onPress={() => handleOptionSelect('v-theme')}
                            btnType={selectedOption === 'v-theme' ? 'primary' : 'secondary'}
                        />
                        <MyButton
                            title="Script"
                            onPress={() => handleOptionSelect('script')}
                            btnType={selectedOption === 'script' ? 'primary' : 'secondary'}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <MyText style={styles.closeButtonText}>Close</MyText>
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
        backgroundColor: MY_COLORS.DARK_GRAY,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        padding: LAYOUT.SPACING_MEDIUM,
        alignItems: 'stretch',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: LAYOUT.SPACING_SMALL,
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

export default GenerationMethodModal;
