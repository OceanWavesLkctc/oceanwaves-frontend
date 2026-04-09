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

        </View>

        <TouchableOpacity
          style={{ backgroundColor: "#B39DDB", marginBottom: 10, width: 150, borderRadius: 75, padding: 10, alignSelf: "center", marginTop: "30" }}
          onPress={() => navigation.replace("PublicPreview")}
        >
          <Text style={{ alignSelf: "center", color: "white", fontSize: 20, fontWeight: "600" }}> Log Out {" "}<FontAwesome name="sign-out" size={24} color="white" /></Text>
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