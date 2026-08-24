import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

import PublicPreviewScreen from "../screens/common/PublicPreviewScreen";
import RoleSelectScreen from "../screens/common/RoleSelectScreen";
import LoginScreen from "../screens/common/LoginScreen";

import StudentDashboard from "../screens/student/StudentDashboard";
import StudentResourceDetail from "../screens/student/ResourceDetailScreen";
import SavedResourcesScreen from "../screens/student/SavedResourcesScreen";

import FacultyDashboard from "../screens/Faculty/FacultyDashboard";
import FacultyResourceDetail from "../screens/Faculty/ResourceDetailScreen";
import UploadResourceScreen from "../screens/Faculty/UploadResourceScreen";

import UserProfile from "../screens/common/UserProfile";
// import FacultyUserProfile from "../screens/Faculty/FacultyUserProfile";
import SignUpScreen from "../screens/common/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5FB" }}>
                <ActivityIndicator size="large" color="#5B3FD1" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    user.role === "teacher" ? (
                        <>
                            <Stack.Screen name="FacultyDashboard" component={FacultyDashboard} />
                            <Stack.Screen name="UploadResource" component={UploadResourceScreen} />
                            <Stack.Screen name="ResourceDetail" component={FacultyResourceDetail} />
                            <Stack.Screen name="Profile" component={UserProfile} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
                            <Stack.Screen name="ResourceDetail" component={StudentResourceDetail} />
                            <Stack.Screen name="SavedResources" component={SavedResourcesScreen} />
                            <Stack.Screen name="Profile" component={UserProfile} />
                        </>
                    )
                ) : (
                    <>
                        <Stack.Screen name="PublicPreview" component={PublicPreviewScreen} />
                        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}