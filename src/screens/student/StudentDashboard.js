import { View, Text, StyleSheet, TextInput, ScrollView, Image, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Avatar, Card, IconButton } from 'react-native-paper';
import BottomBar from "../common/BottomBar";
import ResourcePosts from "./ResourcePosts";



export default function StudentDashboard() {
   
    return (
        
        <SafeAreaView style={{flex:1}}>
           <ResourcePosts />
         <BottomBar />
        </SafeAreaView>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#f3f3f5"
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