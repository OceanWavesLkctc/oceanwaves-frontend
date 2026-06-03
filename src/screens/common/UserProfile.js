import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AuthContext } from '../../context/AuthContext';
import BottomBar from './BottomBar';
import FacultyBottomBar from '../Faculty/FacultyBottomBar';

const UserProfile = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileCard}>
                    <Text style={styles.title}>My Profile</Text>
                    
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={require("./commonimages/avatar.png")} 
                            style={styles.avatar} 
                        />
                    </View>

                    <Text style={styles.nameText}>{user?.name || "Academic User"}</Text>
                    <Text style={styles.roleText}>{user?.role === 'teacher' ? "Faculty Member" : "Student"}</Text>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Email:</Text>
                        <Text style={styles.detailValue}>{user?.email || "N/A"}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Department:</Text>
                        <Text style={styles.detailValue}>{user?.department || "N/A"}</Text>
                    </View>

                    {user?.role === 'student' && (
                        <>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Course Enrolled:</Text>
                                <Text style={styles.detailValue}>{user?.course || "N/A"}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Roll Number:</Text>
                                <Text style={styles.detailValue}>{user?.rollnumber || "N/A"}</Text>
                            </View>
                        </>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutBtnText}>
                        Log Out <FontAwesome name="sign-out" size={20} color="white" />
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Render correct bottom footer based on user's role */}
            {user?.role === 'teacher' ? <FacultyBottomBar /> : <BottomBar />}
        </SafeAreaView>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5FB',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100, // Safe padding for absolute positioned BottomBars
        justifyContent: "center",
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E0EE",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#5B3FD1",
        marginBottom: 16,
    },
    avatarContainer: {
        backgroundColor: "#F0EEF8",
        padding: 10,
        borderRadius: 50,
        marginBottom: 12,
    },
    avatar: {
        width: 70,
        height: 70,
        resizeMode: "contain",
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    roleText: {
        fontSize: 14,
        color: "#777",
        marginTop: 2,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#E2E0EE",
        marginVertical: 20,
    },
    detailRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#666",
    },
    detailValue: {
        fontSize: 15,
        color: "#333",
        fontWeight: "500",
    },
    logoutBtn: {
        backgroundColor: "#B39DDB",
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 28,
        alignSelf: "center",
        marginTop: 35,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    logoutBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});