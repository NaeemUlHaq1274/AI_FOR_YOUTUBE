import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { MyButton, MyContainer, MyScrollableContainer, MyText, PressableImage } from '@components'
import { MY_COLORS, PAY_WALL_SCREEN } from '@constants'

const PaywallModal = () => {
  return (
    <MyScrollableContainer contentContainerStyle={{ flexGrow: 1, gap: 20 }}>
      <MyText h1 bold style={{ textAlign: 'center' }} >Boost Your Creation</MyText>
      <MyText cp style={{ textAlign: 'center' }}>Make the most of your content with CreatorBoost Basic and Premium plans.</MyText>
      <Image source={PAY_WALL_SCREEN.PAY_WALL_IMAGE} />
      <View style={{ gap: 12 }}>
        <View style={{ gap: 4, backgroundColor: MY_COLORS.PRIMARY, height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 12 }}>
          <MyText h4 bold>Basic</MyText>
          <MyText h4>$9.99/month</MyText>
        </View>
        <View style={{ gap: 4, borderColor: MY_COLORS.PRIMARY, borderWidth: 1, height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 12 }}>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
            <MyText h4 bold>Premium</MyText>
            <MyText cp style={{ backgroundColor: MY_COLORS.PRIMARY, borderWidth: 1, borderRadius: 20, paddingHorizontal: 6, paddingVertical: 4 }}>Best Value</MyText>
          </View>
          <MyText h4>$24.99/month</MyText>
        </View>
      </View>
      <MyButton title='Buy Now' onPress={() => { }} />
      <MyText fp style={{ textAlign: 'center' }}>By placing the order, you agree to the Terms of Service and Privacy Policy. Subscription automatically renews unless auto-renew is turned off at-least 24-hours before the end of the current period.</MyText>
    </MyScrollableContainer >
  )
}

export default PaywallModal

const styles = StyleSheet.create({})