import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
// import { IonIcons } from "@react-native-vector-icons/ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
    const navigation = useNavigation()
  return(
    <View style={{flexDirection:"row",justifyContent:"space-between",height:50,borderRadius:15, backgroundColor:"#B39DDB"}}>
      <TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate("StudentDashboard")}>
        <AntDesign name="home" size={30} color="white" />
        {/* <Text style={{color:"#fff"}}>Home</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate("Profile")}>
        <AntDesign name="user" size={30} color="white" />
        {/* <Text style={{color:"#fff"}}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
  iconstyle: {
    alignItems:"center",marginTop:4,alignSelf:"center",
    marginHorizontal:"80",
    activeOpacity:0.3
  }
})