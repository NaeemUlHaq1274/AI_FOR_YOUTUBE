import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { MY_COLORS, LAYOUT } from '@constants';
import { MyButton, MyText } from '@components';

interface GenerationMethodModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedOption: 'theme' | 'category' | 'script' | 'v-theme';
    setSelectedOption: (option: 'category' | 'theme') => void;
}

const GenerationMethodModal: React.FC<GenerationMethodModalProps> = ({
    modalVisible,
    setModalVisible,
    selectedOption,
    setSelectedOption,
}) => {
    const handleOptionSelect = (option: 'category' | 'theme') => {
        setSelectedOption(option);
        setModalVisible(false);
    };

    const screenWidth = Dimensions.get('window').width;
    const isSmallScreen = screenWidth < 360;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, isSmallScreen && styles.modalContentSmall]}>
                    <View style={[styles.buttonContainer, isSmallScreen && styles.buttonContainerSmall]}>
                        {['Category', 'Theme'].map((option, index) => (
                            <MyButton
                                key={index}
                                title={option}
                                onPress={() => handleOptionSelect(option.toLowerCase() as 'category' | 'theme')}
                                btnType={selectedOption === option.toLowerCase() ? 'primary' : 'secondary'}
                                btnWidth={isSmallScreen ? '100%' : '48%'}
                            />
                        ))}
                    </View>
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
        width: '90%',
        maxWidth: 400,
        backgroundColor: MY_COLORS.DARK_GRAY,
        borderRadius: LAYOUT.BORDER_RADIUS_MEDIUM,
        padding: LAYOUT.SPACING_MEDIUM,
        alignItems: 'center',
    },
    modalContentSmall: {
        width: '95%',
        padding: LAYOUT.SPACING_SMALL,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: LAYOUT.SPACING_SMALL,
    },
    buttonContainerSmall: {
        flexDirection: 'column',
    },
});

export default GenerationMethodModal;