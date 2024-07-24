import React, {useEffect, useState} from 'react';
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Linking,
  ImageProps,
} from 'react-native';
import {PRE_LOADED_BANNERS} from './AdsImages/PRE_LOADED_ADS';
import analytics from '@react-native-firebase/analytics';

const CLOSE_ICON = require('./AdsImages/CloseIcon.png');

interface AdStructure {
  imagePath: ImageProps;
  appLink: string;
  title: string;
}

interface MyInterstitialAdProps {
  modalVisible: boolean;
  onClose: () => void;
}

const MyInterstitialAd: React.FC<MyInterstitialAdProps> = ({
  modalVisible,
  onClose,
}) => {
  const [randomBanner, setRandomBanner] = useState<AdStructure | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  useEffect(() => {
    setRandomBanner(getRandomPreLoadedBanner(PRE_LOADED_BANNERS));
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowCloseBtn(true), 2000);

    return () => {
      // setRandomBanner(null);
      setShowCloseBtn(false);
      clearTimeout(timeout);
    };
  }, [modalVisible]);

  const onAdClicked = () => {    
    analytics().logEvent(`${randomBanner?.title}_int_clicked`);
    Linking.openURL(randomBanner?.appLink!);
  };

  const onAdClosed = () => {    
    analytics().logEvent(`${randomBanner?.title}_int_impression`);
    setRandomBanner(getRandomPreLoadedBanner(PRE_LOADED_BANNERS));
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {showCloseBtn && (
          <TouchableOpacity style={styles.closeButton} onPress={onAdClosed}>
            <Image source={CLOSE_ICON} />
          </TouchableOpacity>
        )}

        {randomBanner && (
          <Animated.View style={[styles.adContainer, {opacity: fadeAnim}]}>
            <TouchableOpacity
              onPress={onAdClicked}
              style={{height: '100%', width: '100%'}}>
              <Image source={randomBanner?.imagePath} style={styles.adImage} />
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.adBox}>
          <Text>AD</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
  },
  adContainer: {
    flex: 1,
    marginVertical: '20%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  adBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyInterstitialAd;

function getRandomPreLoadedBanner(preLoadedBanners: any) {
  if (preLoadedBanners.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * preLoadedBanners.length);
  return preLoadedBanners[randomIndex];
}
