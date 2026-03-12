import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
 import Entypo from '@expo/vector-icons/Entypo';
const FacultyBottomBar = () => {
  return (
    <View style={{flexDirection:"row"}}>
        <TouchableOpacity> <Entypo name="home" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
<Entypo name="upload-to-cloud" size={24} color="black" />
        </TouchableOpacity>

    </View>
  )
}

export default FacultyBottomBar