import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MY_COLORS } from '@constants'

const CreateDashboard = () => {
  return (
    <View style={{flex:1,backgroundColor:MY_COLORS.BLACK,justifyContent:"center", alignItems:"center"}}>
      <Text style={{color:"black"}}>CreateDashboard</Text>
    </View>
  )
}

export default CreateDashboard

const styles = StyleSheet.create({})