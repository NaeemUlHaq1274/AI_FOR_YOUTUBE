import React, { useState } from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';
import { MY_COLORS } from '@constants';
import { MyButton, MyText } from '@components';
import { adjust } from '@utils';

interface SettingModalProps {
    visible: boolean;
    onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ visible, onClose }) => {
    const screenWidth = Dimensions.get('window').width;
    const isSmallScreen = screenWidth < 360;

    const [selectedDefaultButton, setSelectedDefaultButton] = useState<string>('V-Theme');
    const [selectedGenerateButton, setSelectedGenerateButton] = useState<string>('Generate All');

    const buttonData = [
        { title: 'V-Theme', category: 'Default Setting', onPress: () => console.log('V-Theme pressed') },
        { title: 'Script', category: 'Default Setting', onPress: () => console.log('Script pressed') },
        { title: 'Generate All', category: 'Generate', onPress: () => console.log('Generate All pressed') },
        { title: 'One by One', category: 'Generate', onPress: () => console.log('One by One pressed') },
    ];

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, isSmallScreen && styles.modalContentSmall]}>
                    <MyText h3 bold style={styles.categoryTitle}>Default Setting</MyText>
                    <View style={styles.buttonRow}>
                        {buttonData.filter(button => button.category === 'Default Setting').map((button, index) => (
                            <MyButton
                                key={index}
                                title={button.title}
                                onPress={() => {
                                    setSelectedDefaultButton(button.title);
                                    button.onPress();
                                }}
                                btnType={selectedDefaultButton === button.title ? 'primary' : 'secondary'}
                                btnWidth={'48%'}
                                style={styles.button}
                            />
                        ))}
                    </View>
                    <MyText h3 bold style={styles.categoryTitle}>Generate</MyText>
                    <View style={styles.buttonRow}>
                        {buttonData.filter(button => button.category === 'Generate').map((button, index) => (
                            <MyButton
                                key={index}
                                title={button.title}
                                onPress={() => {
                                    setSelectedGenerateButton(button.title);
                                    button.onPress();
                                }}
                                btnType={selectedGenerateButton === button.title ? 'primary' : 'secondary'}
                                btnWidth={'48%'}
                                style={styles.button}
                            />
                        ))}
                    </View>
                    <MyButton title="Done" onPress={onClose} btnType="secondary" btnWidth={'100%'} />
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
        backgroundColor: MY_COLORS.DARK_GRAY,
        borderRadius: 16,
        padding: 14,
        gap: adjust(6),
    },
    modalContentSmall: {
        width: '95%',
    },
    categoryTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        marginBottom: 10,
    },
});

export default SettingModal;
