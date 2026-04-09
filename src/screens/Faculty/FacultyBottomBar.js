import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
// import { IonIcons } from "@react-native-vector-icons/ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const FacultyBottomBar = () => {
    const navigation = useNavigation()
  return(
    <View style={{flexDirection:"row",justifyContent:"space-between",height:50,borderRadius:15, backgroundColor:"#B39DDB"}}>
      <TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate("FacultyDashboard")}>
        <AntDesign name="home" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate("UploadResources")}>
       <AntDesign name="cloud-upload" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate("FacultyUserProfileScreen")}>
        <AntDesign name="user" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default FacultyBottomBar

const styles = StyleSheet.create({
  iconstyle: {
    alignItems:"center",marginTop:4,alignSelf:"center",
    activeOpacity:0.3,
    marginHorizontal:25
  }
})