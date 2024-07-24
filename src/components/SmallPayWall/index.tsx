// import BottomSheet from '@gorhom/bottom-sheet'; 
import { StyleSheet, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Modal, AppStateStatus, AppState } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import { useSubscriptionContext } from '@context';
import MyText from '../MyText';
import { MY_COLORS } from '@constants';


const { height, width } = Dimensions.get("window")
type SelectedPlan = "1_MONTHLY" | "12_MONTHLY"


const PayWall = () => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("12_MONTHLY");
    // const { subscriptions, handleBuySubscription, isSubscribed }:any = useSubscriptionContext();
    // const monthlyOfferToken = subscriptions?.["ai_quiz_monthly_7862"]?.[0]?.offerToken;
    // const yearlyOfferToken = subscriptions?.["ai_quiz_yearly_1234"]?.[0]?.offerToken;
    // const monthlyPrice = subscriptions?.["ai_quiz_monthly_7862"]?.[0]?.formattedPrice;
    // const yearlyPrice = subscriptions?.["ai_quiz_yearly_1234"]?.[0]?.formattedPrice;
    // console.log("initialization: ", initialization)

    // const handleSubscribe = () => {
    //     analytics().logEvent(`PAYWALL_${selectedPlan}`);
    //     const subscriptionId = selectedPlan === "1_MONTHLY" ? "ai_quiz_monthly_7862" : "ai_quiz_yearly_1234";
    //     const offerToken = selectedPlan === "1_MONTHLY" ? monthlyOfferToken : yearlyOfferToken;

    //     handleBuySubscription(subscriptionId, offerToken);
    // };

    // if(isSubscribed || !subscriptions) return <></>;

    return (
        <Modal animationType="slide" style={{}} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }} >
            <View></View>
        </Modal>
    );
};

const styles = StyleSheet.create({
});

export default PayWall;
