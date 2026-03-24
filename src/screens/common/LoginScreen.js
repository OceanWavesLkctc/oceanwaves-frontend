import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation, route }) {
    const role = route?.params?.role || "student";
    const [collegeId, setCollegeId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!collegeId.trim() || !password.trim()) {
            setError("Please enter both College ID and Password.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 chars and include a capital letter, small letter, number, and special character.");
            return;
        }

        setError("");

        if (role === "faculty") {
            navigation.navigate("FacultyDashboard");
        } else {
            navigation.navigate("StudentDashboard");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                placeholder="College ID"
                style={styles.input}
                value={collegeId}
                onChangeText={setCollegeId}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

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
    errorText: {
        color: "red",
        marginBottom: 10,
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#B39DDB",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});