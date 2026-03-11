import { View, Text, ScrollView,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomBar from './BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const UserProfile = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={{paddingBottom:80}}>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:22,fontWeight:"bold"}}>User Profile</Text>
      <View style={{paddingTop:"15"}}>
        <Image source={require("./commonimages/avatar.png")} style={{width:60,height:60}} />
      </View>
      
      <Text style={{fontSize:18,fontWeight:"600",padding:5}}>John Doe</Text>
      <Text style={{fontSize:18,fontWeight:"600",padding:5}}>Dept. Name: B.Tech Cse</Text>
      <Text style={{fontSize:18,fontWeight:"600",padding:5}}>Sem: 6th</Text>

    </View>

    <TouchableOpacity style={{backgroundColor:"#B39DDB",marginBottom:10,width:150,borderRadius:75,padding:10,alignSelf:"center",marginTop:"30"}}>
        <Text style={{alignSelf:"center",color:"white",fontSize:20,fontWeight:"600"}}> Log Out {" "}<FontAwesome name="sign-out" size={24} color="white" /></Text>
    </TouchableOpacity>
    </ScrollView>
    <BottomBar />
    </SafeAreaView>
  )
}

export default UserProfile