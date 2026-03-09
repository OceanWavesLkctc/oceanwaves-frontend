import { View, Text, StyleSheet, TextInput, ScrollView, Image, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function StudentDashboard() {
    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center",marginBottom:"20"}}>
            
            <Image source={require("./images/logo.png")} style={{height:"100",width:"100", borderRadius: 75, resizeMode:"contain"}}/>
            <Text style={styles.header}>Ocean Waves</Text>
            <Text>Resource Sharing for Academics</Text>
            </View>

            {/* <View style={{flex:1, justifyContent:"center",alignItems:"center",marginBottom:"10",width:"100%"}}>
                <Image source={require("./images/group.png")} style={{height:"180",borderRadius:75, resizeMode:"contain"}} />
            </View> */}

            <TextInput
                placeholder="Search subjects or resources..."
                style={styles.search}
            />


            <Text style={styles.section}>Preview Resources</Text>

            <View style={{alignItems:"center", marginHorizontal:"20"}}> 

                <View style={{borderWidth:4,justifyContent:"center",alignItems:"center", width:"90%", height:200,borderRadius:10,backgroundColor: '#f8f8f8',padding:4,overflow: 'hidden',backgroundColor: '#f8f8f8',elevation: 3,marginBottom:10}}>
                    <Image source={require("./images/ux.png")} style={{width:50,height:50}} />
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Artificial Intelligence</Text>
                </View>
                 <View style={{borderWidth:4,justifyContent:"center",alignItems:"center", width:"90%", height:200,borderRadius:10,backgroundColor: '#f8f8f8',padding:4,overflow: 'hidden',backgroundColor: '#f8f8f8',elevation: 3,marginBottom:10}}>
                    <Image source={require("./images/ux.png")} style={{width:50,height:50}} />
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Operating System</Text>
                </View>
                 <View style={{borderWidth:4,justifyContent:"center",alignItems:"center", width:"90%", height:200,borderRadius:10,backgroundColor: '#f8f8f8',padding:4,overflow: 'hidden',backgroundColor: '#f8f8f8',elevation: 3,marginBottom:10}}>
                    <Image source={require("./images/ux.png")} style={{width:50,height:50}} />
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Database Management System</Text>
                </View>
                 <View style={{borderWidth:4,justifyContent:"center",alignItems:"center", width:"90%", height:200,borderRadius:10,backgroundColor: '#f8f8f8',padding:4,overflow: 'hidden',backgroundColor: '#f8f8f8',elevation: 3,marginBottom:10}}>
                    <Image source={require("./images/ux.png")} style={{width:50,height:50}} />
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Cloud Computing</Text>
                </View>
                 <View style={{borderWidth:4,justifyContent:"center",alignItems:"center", width:"90%", height:200,borderRadius:10,backgroundColor: '#f8f8f8',padding:4,overflow: 'hidden',backgroundColor: '#f8f8f8',elevation: 3,marginBottom:10}}>
                    <Image source={require("./images/ux.png")} style={{width:50,height:50}} />
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Digital Marketing</Text>
                </View>
                

            </View>


        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#F6F5FB"
    },
    header: {
        fontSize: 26,
        fontFamily:"Poppins",
        fontWeight: "bold",
    },
    search: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 20
    },
    section: {
        fontWeight: "bold",
        marginBottom: 10,
        padding:8
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    subject: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 10,
        width: "48%",
        marginBottom: 10,
        alignItems: "center"
    }
});