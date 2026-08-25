import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
// import { IonIcons } from "@react-native-vector-icons/ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.navigate("StudentDashboard")}>
                <AntDesign name="home" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.navigate("Profile")}>
                <AntDesign name="user" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default BottomBar

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#B39DDB",
    alignItems: "center"
  },
  iconstyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  }
});