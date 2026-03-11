import { View, Text, TouchableOpacity,FlatList,Image,TextInput} from 'react-native'
import React from 'react'

const DATA = [
  { id: '1', title: 'Artificial Intelligence', image: require("./images/microchip.png") },
  { id: '2', title: 'Operating System', image: require("./images/system-update.png") },
  { id: '3', title: 'Database Management', image: require("./images/database.png") },
  { id: '4',title: 'Data Structure', image: require("./images/datastructure.png")},
  { id: '5',title: 'Cloud Computing', image: require("./images/server.png")}
];
const ResourcePosts = () => {

    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity  style={{
        borderWidth:4,
        justifyContent:"center",
        alignItems:"center",
        width:"90%",
        height:200,
        borderRadius:10,
        backgroundColor:'#f8f8f8',
        padding:4,
        elevation:3,
        marginBottom:10,
        alignSelf:"center"
      }}>
            <View>
                <Image source={item.image} style={{width:50,height:50,alignSelf:"center"}} />
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
         </View>
         </TouchableOpacity>
        )
    }
  return (
    
     <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item)=>item.id}

      ListHeaderComponent={
        <>
          <View style={{justifyContent:"center",alignItems:"center",marginBottom:20}}>
            <Image 
              source={require("./images/Logo1.png")}
              style={{height:150,width:120,resizeMode:"contain"}}
            />
            <Text style={{fontSize:26,fontWeight:"bold"}}>Ocean Notes</Text>
            <Text>Resource Sharing for Academics</Text>
          </View>

          <TextInput
            placeholder="Search subjects or resources..."
            style={{
              backgroundColor:"#fff",
              padding:14,
              borderRadius:10,
              marginBottom:20,
              marginHorizontal:20
            }}
          />

          <Text style={{fontWeight:"bold",marginBottom:10,padding:8}}>
            Preview Resources
          </Text>
        </>
      }

      contentContainerStyle={{paddingBottom:40}}
    />
  )
}

export default ResourcePosts;