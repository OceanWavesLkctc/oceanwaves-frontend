<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const { signup } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [course, setCourse] = useState("");
    const [department, setDepartment] = useState("");
    const [selectedRole, setSelectedRole] = useState("Student");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (emailStr) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailStr)) return false;

        if (selectedRole === "Faculty") {
            const domain = emailStr.split("@")[1];
            const allowedDomains = ["kclimt.com", "lkcengg.edu.in"];
            return allowedDomains.includes(domain);
        }
        return true;
    };

    const handleRegister = async () => {
        setError("");

        if (!name.trim() || !email.trim() || !password.trim() || !department.trim()) {
            setError("Please fill out all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            if (selectedRole === "Faculty") {
                setError("Faculty email must belong to @kclimt.com or @lkcengg.edu.in");
            } else {
                setError("Please enter a valid email address.");
            }
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters and include a capital, a lowercase, a number, and a special character.");
            return;
        }

        if (selectedRole === "Student") {
            if (!rollNumber.trim() || !course.trim()) {
                setError("Roll Number and Course are required for students.");
                return;
            }
            if (isNaN(rollNumber)) {
                setError("Roll number must be a valid number.");
                return;
            }
        }

        setLoading(true);

        try {
            const signupData = {
                name: name.trim(),
                email: email.trim(),
                password: password.trim(),
                department: department.trim(),
            };

            if (selectedRole === "Student") {
                signupData.rollnumber = Number(rollNumber);
                signupData.course = course.trim();
            }

            const backendRole = selectedRole === "Faculty" ? "faculty" : "student";
            const result = await signup(signupData, backendRole);

            if (result.success) {
                Alert.alert(
                    "Success", 
                    "Registration successful! Please log in.",
                    [{ text: "OK", onPress: () => navigation.navigate("Login", { role: backendRole }) }]
                );
            } else {
                setError(result.error || "Registration failed. Try again.");
            }
        } catch (err) {
            console.error("Sign up error:", err);
            setError("Something went wrong. Please check your network and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Register Account</Text>
                    <Text style={styles.subtitle}>Join Ocean Notes resource platform</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Text style={styles.label}>Choose Your Role:</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedRole}
                            onValueChange={(itemValue) => setSelectedRole(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Student" value="Student" />
                            <Picker.Item label="Faculty" value="Faculty" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Full Name *</Text>
                    <TextInput 
                        placeholder="Name" 
                        style={styles.input} 
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Email Address *</Text>
                    <TextInput 
                        placeholder="Email" 
                        style={styles.input} 
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password *</Text>
                    <TextInput 
                        placeholder="Password" 
                        style={styles.input} 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.label}>Department *</Text>
                    <TextInput 
                        placeholder="e.g. CSE, IT" 
                        style={styles.input} 
                        value={department}
                        onChangeText={setDepartment}
                    />

                    {selectedRole === "Student" && (
                        <>
                            <Text style={styles.label}>Roll Number *</Text>
                            <TextInput 
                                placeholder="Roll Number" 
                                style={styles.input} 
                                value={rollNumber}
                                onChangeText={setRollNumber}
                                keyboardType="numeric"
                            />
                            
                            <Text style={styles.label}>Course *</Text>
                            <TextInput 
                                placeholder="Course (e.g. B.Tech)" 
                                style={styles.input} 
                                value={course}
                                onChangeText={setCourse}
                            />
                        </>
                    )}

                    <TouchableOpacity 
                        style={[styles.registerBtn, loading && styles.registerBtnDisabled]} 
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.registerBtnText}>Register</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.loginLink}
                        onPress={() => navigation.navigate("Login", { role: selectedRole.toLowerCase() })}
                    >
                        <Text style={styles.loginLinkText}>Already have an account? Log In</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: "#F6F5FB",
    },
    scrollContent: {
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 26, 
        fontWeight: "bold",
        color: "#5B3FD1",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        alignSelf: "center",
        marginTop: 4,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
        marginTop: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E2E0EE",
        borderRadius: 8,
        padding: 12,
        marginBottom: 14,
        backgroundColor: "#fff",
        fontSize: 15,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#E2E0EE",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 14,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    registerBtn: {
        backgroundColor: "#5B3FD1",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        elevation: 2,
    },
    registerBtnDisabled: {
        backgroundColor: "#B39DDB",
    },
    registerBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 15,
    },
    loginLink: {
        marginTop: 15,
        alignItems: "center",
    },
    loginLinkText: {
        color: "#777",
        textDecorationLine: "underline",
        fontSize: 14,
    }
});
=======
import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

const SignUpScreen = () => {
    const [selectedRole, setSelectedRole] = useState();
  return (
    <SafeAreaView style={styles.container}>
    
        <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf: "center"}}>SignUpScreen</Text>
    
    <Text style={{ fontSize: 16,fontWeight:"500", alignSelf: "center", marginTop: 20 }}>Register On Ocean Waves</Text>
    <View style={{ padding: 20}}>

    <Text>Name: </Text>
    <TextInput placeholder="Name" style={styles.input} />
    <Text>Email: </Text>
    <TextInput placeholder="Email" style={styles.input} />
    <Text>Roll Number: </Text>
    <TextInput placeholder="Roll Number" style={styles.input} secureTextEntry />
    <Text>Course: </Text>
    <TextInput placeholder="Course" style={styles.input} secureTextEntry />
    <Text>Department: </Text>
    <TextInput placeholder="Department" style={styles.input} secureTextEntry />
    <Text>Role: <Text>{selectedRole}</Text> </Text>

    <Picker
    style={{ height: 50, width: 200, backgroundColor: "#B39DDB", borderRadius: 10, marginBottom: 16  }}
        selectedValue={selectedRole}
        onValueChange={(itemValue,itemIndex) => 
            setSelectedRole(itemValue)
        }>
        <Picker.Item label="Student" value="Student" style={{ color:"white"}}/>
        <Picker.Item label="Faculty" value="Faculty" style={{ color:"white"}} />
    </Picker>
    </View> 

        <TouchableOpacity style={{ backgroundColor: "#B39DDB", padding: 16, borderRadius: 10, alignItems: "center", width: 150, alignSelf: "center", marginTop: 20 }}>
            <Text style={{ alignSelf: "center", color: "#ebebeb", fontSize: 18, fontWeight: "600" }}> Register </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },

  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  }

})
>>>>>>> 7597b64c4396117dbca6a2af1d7a2944f461265a
