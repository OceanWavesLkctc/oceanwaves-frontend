import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const FacultyBottomBar = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("FacultyDashboard")}
            >
                <AntDesign
                    name="home"
                    size={28}
                    color={route.name === "FacultyDashboard" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("UploadResource")}
            >
                <Ionicons
                    name="cloud-upload-outline"
                    size={28}
                    color={route.name === "UploadResource" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("Profile")}
            >
                <AntDesign
                    name="user"
                    size={28}
                    color={route.name === "Profile" ? "white" : "#E2D9F3"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FacultyBottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 55,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "#B39DDB",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    iconStyle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    }
});
