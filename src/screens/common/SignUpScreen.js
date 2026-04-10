import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

const SignUpScreen = () => {
    const [selectedRole, setSelectedRole] = useState();
  return (
    <SafeAreaView style={styles.container}>
    
        <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: "center"}}>SignUpScreen</Text>
    
    <Text style={{ fontSize: 16,fontWeight:"500", alignSelf: "center", marginTop: 20 }}>Register On Ocean Waves</Text>
    <View style={{ padding: 20}}>

    <Text>Name: </Text>
    <TextInput placeholder="Name" style={styles.input} />
    <Text>Email: </Text>
    <TextInput placeholder="Email" style={styles.input} />
    <Text>Roll Number: </Text>
    <TextInput placeholder="Roll Number" style={styles.input} secureTextEntry />
    <Text>Course: </Text>
    <TextInput placeholder="Course" style={styles.input} secureTextEntry />
    <Text>Department: </Text>
    <TextInput placeholder="Department" style={styles.input} secureTextEntry />
    <Text>Role: <Text>{selectedRole}</Text> </Text>

    <Picker
    style={{ height: 50, width: 200, backgroundColor: "#B39DDB", borderRadius: 10, marginBottom: 16  }}
        selectedValue={selectedRole}
        onValueChange={(itemValue,itemIndex) => 
            setSelectedRole(itemValue)
        }>
        <Picker.Item label="Student" value="Student" style={{ color:"white"}}/>
        <Picker.Item label="Faculty" value="Faculty" style={{ color:"white"}} />
    </Picker>
    </View> 

        <TouchableOpacity style={{ backgroundColor: "#B39DDB", padding: 16, borderRadius: 10, alignItems: "center", width: 150, alignSelf: "center", marginTop: 20 }}>
            <Text style={{ alignSelf: "center", color: "#ebebeb", fontSize: 18, fontWeight: "600" }}> Register </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },

  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  }

})