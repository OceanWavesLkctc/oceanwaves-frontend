<<<<<<< HEAD
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const FacultyBottomBar = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("FacultyDashboard")}
            >
                <AntDesign
                    name="home"
                    size={28}
                    color={route.name === "FacultyDashboard" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("UploadResource")}
            >
                <AntDesign
                    name="clouduploado"
                    size={28}
                    color={route.name === "UploadResource" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("Profile")}
            >
                <AntDesign
                    name="user"
                    size={28}
                    color={route.name === "Profile" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FacultyBottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 55,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "#B39DDB",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    iconStyle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    }
});
=======
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
>>>>>>> 7597b64c4396117dbca6a2af1d7a2944f461265a
