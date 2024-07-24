// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import MobileAds, {
//     InterstitialAd,
//     AdEventType,
//     TestIds,
//     AdsConsent,
//     AdsConsentStatus,
//     MaxAdContentRating,
//     AdsConsentDebugGeography,
// } from 'react-native-google-mobile-ads';
// import { useNavigation } from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics'
// import { MyInterstitialAd } from '@components';

// const INTERSTITIAL_AD_UNIT = ""

// const ADS_REQUEST_CONFIGURATION = {
//     maxAdContentRating: MaxAdContentRating.T,
//     tagForChildDirectedTreatment: false,
//     tagForUnderAgeOfConsent: true,
//     testDeviceIdentifiers: [''],
// };

// const INFO_REQUEST_CONFIGURATION = {
//     tagForUnderAgeOfConsent: true,
//     testDeviceIdentifiers: ['6ddbdd86752d711b'],
//     // Always ensure debug information is removed for production apps!
//     ...(__DEV__ && { debugGeography: AdsConsentDebugGeography.EEA }),
// };

// interface AdContextProps {
//     showInterstitialAd: (jobToPass: any) => void;
// }
// const AdContext = createContext<AdContextProps | undefined>(undefined);

// export const useAdContext = (): AdContextProps => {
//     const context = useContext(AdContext);
//     if (!context) {
//         throw new Error('useAdContext must be used within a UserProvider');
//     }
//     return context;
// };

// const AdProvider = ({ children }: any) => {
//     const { navigate } = useNavigation();
//     const jobRef = useRef(null);

//     const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
//     const [myInterstitialAd, setMyInterstitialAd] = useState(false);

//     const requestEEAConsent = async () => {
//         // const consentInfo = await AdsConsent.requestInfoUpdate(INFO_REQUEST_CONFIGURATION);
//         const consentInfo = await AdsConsent.requestInfoUpdate();

//         if (
//             consentInfo.isConsentFormAvailable &&
//             consentInfo.status === AdsConsentStatus.REQUIRED
//         ) {
//             const { status } = await AdsConsent.showForm();

//             consentInfo.status = status;
//         }

//         console.log({ consentInfo });

//         return consentInfo;
//     };

//     const initializeAdmob = async () => {
//         try {
//             // Request the respective consent to users in the EEA
//             await requestEEAConsent();

//             // Configure the ads requests
//             await MobileAds().setRequestConfiguration(ADS_REQUEST_CONFIGURATION);

//             // Get analytics once consent is approved
//             await analytics().setAnalyticsCollectionEnabled(true);

//             // Initialize the AdMob service
//             initializeAds();
//         } catch (error) {
//             console.log(JSON.stringify(error));
//         }
//     };

//     useEffect(() => {
//         initializeAdmob();
//     }, []);

//     const initializeAds = () =>
//         MobileAds()
//             .initialize()
//             .then(adapterStatuses => {
//                 console.log('====================================');
//                 console.log('Ad Initialization complete');
//                 console.log('====================================');
//                 loadInterstitialAd();
//             });

//     const loadInterstitialAd = async () => {
//         const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : INTERSTITIAL_AD_UNIT;
//         const newInterstitialAd =  InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

//         const eventListener = newInterstitialAd.addAdEventListener(
//             AdEventType.LOADED,
//             () => {
//                 console.log('====================================');
//                 console.log('Interstitial Add has loaded');
//                 console.log('====================================');
//             },
//         );

//         const closeEventListener = newInterstitialAd.addAdEventListener(
//             AdEventType.CLOSED,
//             () => {
//                 console.log('====================================');
//                 console.log('Interstitial Add has closed');
//                 //  --------------------------------------------------------- Add the screen which you want to navigate after add close // TODO:
//                 // navigate();
//                 console.log('====================================');
//             },
//         );

//         await newInterstitialAd.load();
//         setInterstitialAd(newInterstitialAd);

//         return () => {
//             // Clean up event listener when the component is unmounted
//             eventListener();
//             closeEventListener();
//         };
//     };

//     const showInterstitialAd = async (jobToPass?: any) => {
//         try {
//             if (interstitialAd) {
//                 await interstitialAd.show();
//                 await loadInterstitialAd();
//             } else {
//                 await loadInterstitialAd();
//                 setMyInterstitialAd(true);
//                 console.warn('Interstitial Ad not loaded yet');
//             }
//         } catch (error) {
//             setMyInterstitialAd(true);
//             console.error('Error showing interstitial ad:', error);
//         } finally {
//             if (jobToPass) jobRef.current = jobToPass;
//         }
//     };

//     const value = {
//         showInterstitialAd,
//     };

//     const onCloseMyInterstitialAd = () => {
//         setMyInterstitialAd(false);
//         //  --------------------------------------------------------- Add the screen which you want to navigate after add close // TODO:
//         // navigate();
//     }

//     return <AdContext.Provider value={value}>
//         {children}
//         <MyInterstitialAd modalVisible={myInterstitialAd} onClose={onCloseMyInterstitialAd} />
//     </AdContext.Provider>;
// };

// export default AdProvider;