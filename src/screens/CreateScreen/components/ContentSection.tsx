import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyText, PressableImage } from '@components'
import { CREATE_CONTENT_SCREEN, MY_COLORS } from '@constants'
import { adjust } from '@utils'

const ContentSection = () => {
  return (
    <View style={{ gap: 6, borderWidth:2,borderColor:"white", backgroundColor:MY_COLORS.BLACK }}>
          <MyText p bold style={{}}>Title</MyText>
          <View style={{ flexDirection: "row", gap: 12, padding: 8, borderWidth:2,borderColor:"white" }}>
            <View style={{width:"89%", borderWidth:2,borderColor:"white"}}>
              {/* <MyText cp style={{}}>Discover the incredible health benefits of eating apples daily! Learn how this simple habit can boost your overall wellness and keep the doctor away</MyText> */}
              <Image style={{ width: '100%', height: undefined, aspectRatio: 16 / 9 }}   resizeMode="contain" source={CREATE_CONTENT_SCREEN.YOUTUBE_THUMBNAIL_DUMMY_IMAGE} />
            </View>
            <View style={{width:"9%", gap:adjust(12), borderWidth:2,borderColor:"white"}}>
              <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
              <PressableImage onPress={() => { }} source={CREATE_CONTENT_SCREEN.PDF} />
            </View>
          </View>
        </View>
  )
}

export default ContentSection

const styles = StyleSheet.create({})