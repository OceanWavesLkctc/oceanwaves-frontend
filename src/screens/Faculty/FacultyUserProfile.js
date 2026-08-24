<<<<<<< HEAD
import React, { useContext } from 'react'
import FacultyBottomBar from './FacultyBottomBar';
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';

const FacultyUserProfile = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#5B3FD1" }}>User Profile</Text>
          <View style={{ paddingTop: 15, marginBottom: 15 }}>
            <Image source={require("./FacultyImages/avatar.png")} style={{ width: 70, height: 70 }} />
          </View>

          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333", padding: 2 }}>{user?.name || "Professor"}</Text>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#777", padding: 2, textTransform: "uppercase" }}>Faculty Member</Text>
          
          <View style={{ width: "90%", height: 1, backgroundColor: "#E2E0EE", marginVertical: 20 }} />

          <View style={{ width: "80%", alignSelf: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 6 }}>
              <Text style={{ fontWeight: "600", color: "#666" }}>Department:</Text>
              <Text style={{ color: "#333", fontWeight: "500" }}>{user?.department || "N/A"}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 6 }}>
              <Text style={{ fontWeight: "600", color: "#666" }}>Email:</Text>
              <Text style={{ color: "#333", fontWeight: "500" }}>{user?.email || "N/A"}</Text>
            </View>
          </View>
=======
import { View, Text, ScrollView, Image, TouchableOpacity, Platform,StyleSheet } from 'react-native'
import React from 'react'
import FacultyBottomBar from './FacultyBottomBar';
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FacultyUserProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>User Profile</Text>
          <View style={{ paddingTop: "15" }}>
            <Image source={require("./FacultyImages/avatar.png")} style={{ width: 60, height: 60 }} />
          </View>

          <Text style={{ fontSize: 18, fontWeight: "600", padding: 5 }}>John Doe</Text>
          <Text style={{ fontSize: 18, fontWeight: "600", padding: 5 }}>Dept. Name: Computer Science</Text>
          <Text style={{ fontSize: 18, fontWeight: "600", padding: 5 }}>Email: john.doe@lkctc.edu</Text>
>>>>>>> 7597b64c4396117dbca6a2af1d7a2944f461265a

        </View>

        <TouchableOpacity
<<<<<<< HEAD
          style={{ backgroundColor: "#B39DDB", marginBottom: 10, width: 150, borderRadius: 25, padding: 12, alignSelf: "center", marginTop: 30 }}
          onPress={handleLogout}
        >
          <Text style={{ alignSelf: "center", color: "white", fontSize: 18, fontWeight: "600" }}> Log Out {" "}<FontAwesome name="sign-out" size={20} color="white" /></Text>
=======
          style={{ backgroundColor: "#B39DDB", marginBottom: 10, width: 150, borderRadius: 75, padding: 10, alignSelf: "center", marginTop: "30" }}
          onPress={() => navigation.replace("PublicPreview")}
        >
          <Text style={{ alignSelf: "center", color: "white", fontSize: 20, fontWeight: "600" }}> Log Out {" "}<FontAwesome name="sign-out" size={24} color="white" /></Text>
>>>>>>> 7597b64c4396117dbca6a2af1d7a2944f461265a
        </TouchableOpacity>
      </ScrollView>
      <FacultyBottomBar />
    </SafeAreaView>
  )
}

export default FacultyUserProfile


const styles = StyleSheet.create({ 
  container:{
      flex: 1,
      paddingTop: Platform.OS === "android" ? 25 : 0
  }
})