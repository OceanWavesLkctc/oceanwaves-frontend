import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';

import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import FacultyBottomBar from './FacultyBottomBar';

export default function UploadResourceScreen({ navigation }) {
    const { token } = useContext(AuthContext);

    const [course, setCourse] = useState("");
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handlePickDocument = async () => {
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ],
                copyToCacheDirectory: true
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const fileAsset = result.assets[0];
                setSelectedFile(fileAsset);
            }
        } catch (err) {
            console.error("Document picking error:", err);
            setErrorMsg("Could not select the file. Please try again.");
        }
    };

    const handleUpload = async () => {
        setErrorMsg("");
        setSuccessMsg("");

        if (!course.trim() || !subject.trim() || !topic.trim()) {
            setErrorMsg("Please fill out Course, Subject, and Topic.");
            return;
        }

        if (!selectedFile) {
            setErrorMsg("Please select an Excel question bank file.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('course', course.trim());
            formData.append('subject', subject.trim());
            formData.append('topic', topic.trim());

            // Format for file upload
            formData.append('file', {
                uri: selectedFile.uri,
                name: selectedFile.name,
                type: selectedFile.mimeType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const response = await api.post('/teacherUpload', formData, token, true);

            if (response.success) {
                setSuccessMsg("Question bank uploaded successfully!");
                // Clear fields
                setCourse("");
                setSubject("");
                setTopic("");
                setSelectedFile(null);

                // Show success Alert and navigate
                Alert.alert("Success", "Question bank uploaded successfully!", [
                    { text: "OK", onPress: () => navigation.navigate("FacultyDashboard") }
                ]);
            } else {
                setErrorMsg(response.error || "Failed to upload file.");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setErrorMsg("Network error. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Custom Header Bar */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.navigate("FacultyDashboard")} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upload Resource</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Text style={styles.sectionSubtitle}>Define course and topic for your question sheet</Text>

                    {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
                    {successMsg ? <Text style={styles.successText}>{successMsg}</Text> : null}

                    <Text style={styles.label}>Course *</Text>
                    <TextInput
                        placeholder="e.g. B.Tech CSE"
                        style={styles.input}
                        value={course}
                        onChangeText={setCourse}
                    />

                    <Text style={styles.label}>Subject *</Text>
                    <TextInput
                        placeholder="e.g. Database Management System"
                        style={styles.input}
                        value={subject}
                        onChangeText={setSubject}
                    />

                    <Text style={styles.label}>Topic *</Text>
                    <TextInput
                        placeholder="e.g. Normalization Forms"
                        style={styles.input}
                        value={topic}
                        onChangeText={setTopic}
                    />

                    <View style={styles.divider} />

                    <Text style={styles.label}>Question Bank File (Excel) *</Text>
                    <Text style={styles.infoText}>Must contain "Question" and "Answer" columns</Text>

                    {selectedFile ? (
                        <View style={styles.fileSelectedBox}>
                            <FontAwesome name="file-excel-o" size={24} color="#2E7D32" />
                            <Text style={styles.fileNameText} numberOfLines={1}>
                                {selectedFile.name}
                            </Text>
                            <TouchableOpacity onPress={() => setSelectedFile(null)}>
                                <Ionicons name="close-circle" size={20} color="#FF3B30" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.pickerBtn} onPress={handlePickDocument}>
                            <Ionicons name="cloud-upload-outline" size={22} color="#5B3FD1" />
                            <Text style={styles.pickerBtnText}>Select Excel File</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                        onPress={handleUpload}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.submitBtnText}>Upload Resource</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <FacultyBottomBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5FB',
    },
    headerBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E0EE",
    },
    iconButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 80,
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E2E0EE",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    sectionSubtitle: {
        fontSize: 13,
        color: "#666",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#F6F5FB",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E0EE",
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: "#E2E0EE",
        marginVertical: 16,
    },
    infoText: {
        fontSize: 12,
        color: "#777",
        marginBottom: 12,
    },
    pickerBtn: {
        borderWidth: 2,
        borderColor: "#B39DDB",
        borderStyle: "dashed",
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#FBF9FE",
        marginBottom: 24,
    },
    pickerBtnText: {
        color: "#5B3FD1",
        fontWeight: "bold",
        marginLeft: 8,
        fontSize: 14,
    },
    fileSelectedBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8F5E9",
        padding: 14,
        borderRadius: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#A5D6A7",
    },
    fileNameText: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 14,
        color: "#2E7D32",
        fontWeight: "500",
    },
    submitBtn: {
        backgroundColor: "#5B3FD1",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    submitBtnDisabled: {
        backgroundColor: "#B39DDB",
    },
    submitBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
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
    }
});
