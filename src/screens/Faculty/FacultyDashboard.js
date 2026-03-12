import { View, Text, StyleSheet, TouchableOpacity,ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
 import AntDesign from '@expo/vector-icons/AntDesign';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FacultyBottomBar from "./FacultyBottomBar";



 const data = [
    {
        id:"1",title:"Intro to OS"
    },
    {
        id:"2",title:"What is OS"
    },
    {
        id:"3",title:"OS Architecture"
    },
    {
        id:"4",title:"OS Architecture"
    },
    {
        id:"5",title:"OS Architecture"
    },
    {
        id:"6",title:"OS Architecture"
    },
    {
        id:"7",title:"OS Architecture"
    }
    
 ]
export default function FacultyDashboard() {

    const renderItem = ({item}) => {
        return(
            <View style={{flexDirection:'row',height:"60",borderWidth:1,marginBlock:10,padding:15,justifyContent:"space-between",marginHorizontal:"15",borderRadius:15}}>
                <AntDesign name="file-pdf" size={24} color="#B39DDB" />
                  <Text style={{marginLeft:10,fontSize:20,fontWeight:"bold"}}>{item.title}</Text>
                  <FontAwesome name="edit" size={24} color="#B39DDB" />
                  <AntDesign name="delete" size={24} color="#B39DDB" />
            </View>
        )
    }
    return (
        
        <SafeAreaView style={{flex:1}}>
            
            <View style={{padding:16}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Dashboard</Text>
                <Text style={{fontFamily:"Inter",fontSize:17}}>Welcome back, Prof. Miller</Text>
            </View>
            
            <TouchableOpacity style={{backgroundColor:"#B39DDB",width:"80%",borderRadius:25, padding:10,alignSelf:"center", marginTop:10}}>
                <Text style={{alignSelf:"center",fontSize:17,fontWeight:"600", color:"white"}}>
                    <Entypo name="circle-with-plus" size={24} color="white" />{"   "}Upload New Resource</Text>
            </TouchableOpacity>


            <View style={{marginTop:20,padding:10}}>
                <Text style={{fontSize:18,fontWeight:"600"}}>My Uploaded Resources</Text>
            </View>
            
           <FlatList 
           data={data}
           renderItem={renderItem}
           keyExtractor={(item)=>item.id}
           />

           
           <FacultyBottomBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F6F5FB"
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
    },
    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 10,
        marginBottom: 12
    }
});