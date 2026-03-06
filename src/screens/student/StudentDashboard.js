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

            <View style={{flex:1, justifyContent:"center",alignItems:"center",marginBottom:"10",width:"100%"}}>
                <Image source={require("./images/group.png")} style={{height:"180",borderRadius:75, resizeMode:"contain"}} />
            </View>

            <TextInput
                placeholder="Search subjects or resources..."
                style={styles.search}
            />


            <Text style={styles.section}>Preview Resources</Text>

            <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center", marginHorizontal:"20"}}> 
                <View style={{borderWidth:1,width:150, height:130,borderRadius:10,padding:4}}>
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Computer Science</Text>
                </View>
                <View style={{borderWidth:1,width:150, height:130,borderRadius:10,padding:4}}>
                    <Text style={{fontWeight:"bold",alignSelf:"center"}}>Literature</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text>Operating Systems Notes</Text>
            </View>

            <View style={styles.card}>
                <Text>DBMS Question Bank</Text>
            </View>

            <Text style={styles.section}>Subjects</Text>

            <View style={styles.grid}>
                <View style={styles.subject}><Text>OS</Text></View>
                <View style={styles.subject}><Text>DBMS</Text></View>
                <View style={styles.subject}><Text>CN</Text></View>
                <View style={styles.subject}><Text>DSA</Text></View>
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
        marginBottom: 10
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