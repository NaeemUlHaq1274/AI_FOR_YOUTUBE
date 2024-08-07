import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyText, PressableImage } from '@components'
import { CREATE_CONTENT_SCREEN, MY_COLORS } from '@constants'
import { adjust } from '@utils'
import { ContentSection } from './components'

const ContentScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "black" }} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={{ backgroundColor: MY_COLORS.BLACK, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: adjust(12), paddingHorizontal: adjust(12) }}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", }}>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.GO_BACK} />
          <MyText p style={{}}>Generate</MyText>
        </View>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", }}>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.SAVE} />
        </View>
      </View>



      {/* Body */}
      <View style={{ paddingHorizontal: adjust(12), gap:adjust(20), paddingVertical:adjust(20)}}>


        <ContentSection />
        <ContentSection />
        <ContentSection />
        <ContentSection />



          <MyText style={{}}>Generate</MyText>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
          <View>
          </View>

        <View>
          <MyText style={{}}>Generate</MyText>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
        </View>

        <View>
          <MyText style={{}}>Generate</MyText>
          <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
        </View>

      </View>
    </ScrollView>
  )
}

export default ContentScreen

const styles = StyleSheet.create({})