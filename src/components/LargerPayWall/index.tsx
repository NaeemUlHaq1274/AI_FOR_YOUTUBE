// import BottomSheet from '@gorhom/bottom-sheet'; 
import { StyleSheet, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Modal, AppStateStatus, AppState } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import MyText from '../MyText';
import { MY_COLORS } from '@constants';


const { height, width } = Dimensions.get("window")
type SelectedPlan = "1_MONTHLY" | "12_MONTHLY"


const PayWall = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isAllowCount, setIsAllowCount] = useState(true);
    // const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("12_MONTHLY");
    // const { subscriptions, handleBuySubscription, isSubscribed }:any = useSubscriptionContext();
    // const monthlyOfferToken = subscriptions?.["ai_quiz_monthly_7862"]?.[0]?.offerToken;
    // const yearlyOfferToken = subscriptions?.["ai_quiz_yearly_1234"]?.[0]?.offerToken;
    // const monthlyPrice = subscriptions?.["ai_quiz_monthly_7862"]?.[0]?.formattedPrice;
    // const yearlyPrice = subscriptions?.["ai_quiz_yearly_1234"]?.[0]?.formattedPrice;
    // console.log("initialization: ", initialization)
    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            
            if (isAllowCount && nextAppState === 'active') {
                let count = parseInt(await AsyncStorage.getItem('appOpenCount') || '4');
                console.log("get current count : ", count)
                if (count == 4) setModalVisible(()=>true);
                count = (count) - 1;
                console.log("get update count : ", count)
                if (count == 0) count = 4;
                await AsyncStorage.setItem('appOpenCount', count.toString());
                console.log("current token: ",count);
            }
            setIsAllowCount(false);
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, [isAllowCount]);

    // const handleSubscribe = () => {
    //     analytics().logEvent(`PAYWALL_${selectedPlan}`);
    //     const subscriptionId = selectedPlan === "1_MONTHLY" ? "ai_quiz_monthly_7862" : "ai_quiz_yearly_1234";
    //     const offerToken = selectedPlan === "1_MONTHLY" ? monthlyOfferToken : yearlyOfferToken;

    //     handleBuySubscription(subscriptionId, offerToken);
    // };

    // if(isSubscribed || !subscriptions) return <></>;

    return (
        <Modal animationType="slide" style={{}} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#af58eb", }}>
            </ScrollView>
            <TouchableOpacity onPress={() => { }} style={{ width: "100%", paddingHorizontal: 12, paddingBottom: 12, marginTop: 2, backgroundColor:"transparent" }}>
                <View style={{  paddingVertical: 14, borderRadius: 12, backgroundColor: MY_COLORS.PRIMARY, alignItems: "center", width: "100%" }}>
                    <MyText color='white' h2 style={{ fontWeight: "900" }}>Go Unlimited</MyText>
                    {/* <MyText color='white' h4 style={{ fontWeight: "900" }}>with {(selectedPlan=="1_MONTHLY")? `${monthlyPrice}/month`:`${yearlyPrice}/year`}</MyText> */}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
});

export default PayWall;
