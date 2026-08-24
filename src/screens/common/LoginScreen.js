import React, { useState, useContext } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation, route }) {
    const role = route?.params?.role || "student"; // "student" or "faculty"
    const { login, signup } = useContext(AuthContext);

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [course, setCourse] = useState("");

    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (emailStr) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailStr)) return false;

        if (role === "faculty") {
            const domain = emailStr.split("@")[1];
            const allowedDomains = ["kclimt.com", "lkcengg.edu.in"];
            return allowedDomains.includes(domain);
        }
        return true;
    };

    const handleAction = async () => {
        setError("");
        setSuccessMsg("");

        if (!email.trim() || !password.trim()) {
            setError("Please fill out Email and Password.");
            return;
        }

        if (!validateEmail(email)) {
            if (role === "faculty") {
                setError("Faculty email must belong to @kclimt.com or @lkcengg.edu.in");
            } else {
                setError("Please enter a valid email address.");
            }
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters and include a capital letter, a lowercase letter, a number, and a special character.");
            return;
        }

        if (isSignUp) {
            if (!name.trim() || !department.trim()) {
                setError("Name and Department are required for registration.");
                return;
            }
            if (role === "student") {
                if (!rollNumber.trim() || !course.trim()) {
                    setError("Roll Number and Course are required for students.");
                    return;
                }
                if (isNaN(rollNumber)) {
                    setError("Roll number must be a valid number.");
                    return;
                }
            }
        }

        setLoading(true);

        try {
            if (isSignUp) {
                // SignUp Mode
                const signupData = {
                    name,
                    email,
                    password,
                    department,
                };
                
                if (role === "student") {
                    signupData.rollnumber = Number(rollNumber);
                    signupData.course = course;
                }

                const result = await signup(signupData, role);
                if (result.success) {
                    setSuccessMsg("Registration successful! You can now log in.");
                    setIsSignUp(false); // Switch to login tab
                    setPassword(""); // Reset password field
                } else {
                    setError(result.error || "Registration failed. Try again.");
                }
            } else {
                // Login Mode
                const result = await login(email, password, role);
                if (!result.success) {
                    setError(result.error || "Login failed. Check your credentials.");
                }
                // AuthContext state update will automatically redirect due to AppNavigator's state guard
            }
        } catch (err) {
            setError("Something went wrong. Please check your network and try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.cardWrapper}>
                    <Text style={styles.title}>
                        {role === "faculty" ? "Faculty Hub" : "Student Hub"}
                    </Text>
                    <Text style={styles.subtitle}>
                        Sign in to access academic resources
                    </Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    {successMsg ? <Text style={styles.successText}>{successMsg}</Text> : null}

                    <TextInput
                        placeholder="Email Address"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleAction} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={{ fontSize: 15, textAlign: "center", marginTop: 22, color: "#666" }}>
                        Don't have an account?{" "}
                        <Text 
                            style={{ color: "#5B3FD1", fontWeight: "bold" }} 
                            onPress={() => navigation.navigate("SignUp")}
                        >
                            Sign Up
                        </Text>
                    </Text>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.navigate("RoleSelect")}
                    >
                        <Text style={styles.backButtonText}>Change Role</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#F6F5FB",
    },
    cardWrapper: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#5B3FD1",
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginBottom: 24,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#EEEEF4",
        borderRadius: 10,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
    },
    activeTabText: {
        color: "#5B3FD1",
    },
    errorText: {
        color: "red",
        marginBottom: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    successText: {
        color: "green",
        marginBottom: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#F6F5FB",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#E2E0EE",
    },
    button: {
        backgroundColor: "#B39DDB",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    backButton: {
        marginTop: 15,
        alignItems: "center",
    },
    backButtonText: {
        color: "#777",
        textDecorationLine: "underline",
        fontSize: 14,
    }
});