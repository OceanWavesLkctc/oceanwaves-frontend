import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation, route }) {

    // Get role passed from RoleSelect screen
    const role = route?.params?.role || "student";

    const handleLogin = () => {
        if (role === "faculty") {
            navigation.navigate("FacultyDashboard");
        } else {
            navigation.navigate("StudentDashboard");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput placeholder="College ID" style={styles.input} />
            <TextInput placeholder="Password" style={styles.input} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#F6F5FB",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#5B3FD1",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});