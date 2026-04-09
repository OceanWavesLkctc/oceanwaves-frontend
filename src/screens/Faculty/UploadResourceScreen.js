import { View, Text,TouchableOpacity,FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomBar from './FacultyBottomBar'
import FacultyBottomBar from './FacultyBottomBar'
import Entypo from '@expo/vector-icons/Entypo';

 import AntDesign from '@expo/vector-icons/AntDesign';
 
import FontAwesome from '@expo/vector-icons/FontAwesome';


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


const UploadResourceScreen = () => {
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
    <SafeAreaView style={{flex:1,paddingTop:10}}>

      <Text style={{alignSelf:"center",fontSize:20,fontWeight:"600", color:"black"}}>UploadResourceScreen</Text>

      <TouchableOpacity style={{backgroundColor:"#B39DDB",width:"80%",borderRadius:25, padding:10,alignSelf:"center", marginTop:10}}>
            <Text style={{alignSelf:"center",fontSize:17,fontWeight:"600", color:"white"}}>
              <Entypo name="circle-with-plus" size={24} color="white" />{"   "}Upload New Resource</Text>
            </TouchableOpacity>


    <Text style={{alignSelf:"center",fontSize:20,fontWeight:"600", color:"black", marginTop:10}}>Recent Uploads</Text>
     <FlatList 
               data={data}
               renderItem={renderItem}
               keyExtractor={(item)=>item.id}
               />

      <FacultyBottomBar />
    </SafeAreaView>
    
  )
}

export default UploadResourceScreen