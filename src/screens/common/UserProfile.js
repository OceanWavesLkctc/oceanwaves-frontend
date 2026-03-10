import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BottomBar from './BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserProfile = () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>UserProfile</Text>
    </View>
    </ScrollView>
    {/* <BottomBar style={{bottom:0}}/> */}
    </SafeAreaView>
  )
}

export default UserProfile