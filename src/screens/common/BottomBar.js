import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
// import { IonIcons } from "@react-native-vector-icons/ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
    const navigation = useNavigation()
  return(
    <View style={{flexDirection:"row",justifyContent:"space-evenly",height:50,borderRadius:50,backgroundColor:"#B39DDB",bottom:0}}>
      <TouchableOpacity style={{alignItems:"center",marginTop:4}} >
        <AntDesign name="home" size={24} color="white" />
        <Text style={{color:"#fff"}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:"center",marginTop:4}} onPress={navigation.navigate("Profile")}>
        <AntDesign name="profile" size={24} color="white" />
        <Text style={{color:"#fff"}}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomBar