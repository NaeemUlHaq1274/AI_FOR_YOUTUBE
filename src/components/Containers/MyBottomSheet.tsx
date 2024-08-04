import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MY_COLORS, LAYOUT } from '@constants';
import { adjust } from '@utils';

const { height } = Dimensions.get('window');

interface BottomSheetProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    children: React.ReactNode;
}

const MyBottomSheet: React.FC<BottomSheetProps> = ({ visible, setVisible, children }) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible, animation]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    const handleOverlayPress = useCallback(() => setVisible(false), [setVisible]);

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={handleOverlayPress}>
            <View style={styles.modalOverlay}>
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleOverlayPress} />
                <Animated.View style={[styles.bottomSheetContainer, { transform: [{ translateY }] }]}>
                    <View style={styles.handle} />
                    {children}
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
        borderTopLeftRadius: adjust(20),
        borderTopRightRadius: adjust(20),
        paddingHorizontal: adjust(LAYOUT.SPACING_MEDIUM),
        paddingBottom: adjust(LAYOUT.SPACING_MEDIUM),
        maxHeight: '80%',
    },
    handle: {
        width: adjust(40),
        height: adjust(5),
        backgroundColor: MY_COLORS.DARK_GRAY,
        borderRadius: adjust(3),
        alignSelf: 'center',
        marginVertical: adjust(LAYOUT.SPACING_SMALL),
    },
});

export default React.memo(MyBottomSheet);