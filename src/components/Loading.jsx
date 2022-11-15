import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff"/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        flex: 1, 
        top: 0, 
        left: 0, 
        zIndex: 999,
        width: '100%', 
        height: '100%', 
        position:'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)', 
      }
})