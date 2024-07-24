import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { MY_COLORS } from '@constants'
import MyText from './MyText'
import { adjust } from '@utils'

const LoadingScreen:React.FC<{description?:string}> = ({description}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color={MY_COLORS.SECONDARY} />
            <MyText cp style={{textAlign:'center'}}> {description} </MyText>
        </View>
    )
}
export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: adjust(12),
        gap:20,
        backgroundColor:MY_COLORS.PRIMARY
    },
})