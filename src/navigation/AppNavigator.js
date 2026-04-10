import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PublicPreviewScreen from "../screens/common/PublicPreviewScreen";
import RoleSelectScreen from "../screens/common/RoleSelectScreen";
import LoginScreen from "../screens/common/LoginScreen";
import StudentDashboard from "../screens/student/StudentDashboard";

import FacultyDashboard from "../screens/Faculty/FacultyDashboard";
import UserProfile from "../screens/common/UserProfile";
import UploadResourceScreen from "../screens/Faculty/UploadResourceScreen";
import FacultyUserProfile from "../screens/Faculty/FacultyUserProfile";
import SignUpScreen from "../screens/common/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="PublicPreview" component={PublicPreviewScreen} />
                <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
                <Stack.Screen name="FacultyDashboard" component={FacultyDashboard} />
                <Stack.Screen name="Profile" component={UserProfile} />
                <Stack.Screen name="UploadResources" component={UploadResourceScreen} />
                <Stack.Screen name="FacultyUserProfileScreen" component={FacultyUserProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}