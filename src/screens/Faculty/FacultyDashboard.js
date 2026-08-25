import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    TextInput, 
    ActivityIndicator,
    Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import FacultyBottomBar from "./FacultyBottomBar";

export default function FacultyDashboard({ navigation }) {
    const { token, user } = useContext(AuthContext);

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const MOCK_DATA = [
        { _id: "mock1", subject: "Operating Systems", topic: "Intro to OS", course: "B.Tech CSE" },
        { _id: "mock2", subject: "Operating Systems", topic: "CPU Scheduling Algorithms", course: "B.Tech CSE" },
        { _id: "mock3", subject: "Database Management System", topic: "Relational Algebra", course: "B.Tech CSE" }
    ];

    const fetchTeacherResources = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const response = await api.get('/teacherdashboard', token);
            if (response.success && response.data.files) {
                setResources(response.data.files);
            } else {
                console.log("Using faculty mock data fallback. Error details:", response.error);
                setResources(MOCK_DATA);
                setErrorMsg("Backend offline. Displaying local preview resources.");
            }
        } catch (e) {
            console.error("Dashboard fetch error:", e);
            setResources(MOCK_DATA);
            setErrorMsg("Network error. Displaying local preview resources.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeacherResources();
    }, []);

    const handleDelete = async (id) => {
        if (String(id).startsWith('mock')) {
            setResources(resources.filter(item => item._id !== id));
            return;
        }

        Alert.alert(
            "Delete Resource",
            "Are you sure you want to delete this resource and all its questions?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: async () => {
                        setActionLoading(true);
                        try {
                            const response = await api.delete(`/file/delete/${id}`, token);
                            if (response.success) {
                                setResources(resources.filter(item => item._id !== id));
                            } else {
                                Alert.alert("Error", response.error || "Failed to delete resource");
                            }
                        } catch (err) {
                            console.error("Delete error:", err);
                        } finally {
                            setActionLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.topic);
    };

    const handleSave = async (id, item) => {
        if (!editTitle.trim()) return;

        if (String(id).startsWith('mock')) {
            setResources(resources.map(r => r._id === id ? { ...r, topic: editTitle } : r));
            setEditId(null);
            setEditTitle("");
            return;
        }

        setActionLoading(true);
        try {
            const response = await api.put(`/file/update/${id}`, {
                course: item.course,
                subject: item.subject,
                topic: editTitle
            }, token);
            
            if (response.success) {
                setResources(resources.map(r => r._id === id ? { ...r, topic: editTitle } : r));
                setEditId(null);
                setEditTitle("");
            } else {
                Alert.alert("Error", response.error || "Failed to update resource title");
            }
        } catch (err) {
            console.error("Update error:", err);
        } finally {
            setActionLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        const isEditing = editId === item._id;
        const isMock = String(item._id).startsWith('mock');
        return (
            <View style={styles.resourceCard}>
                <TouchableOpacity 
                    style={styles.cardContent}
                    onPress={() => !isEditing && navigation.navigate("ResourceDetail", { 
                        id: item._id,
                        mockData: isMock ? item : null 
                    })}
                    disabled={isEditing}
                >
                    <AntDesign name="file1" size={24} color="#B39DDB" style={styles.fileIcon} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.subjectText}>{item.subject}</Text>
                        {isEditing ? (
                            <TextInput 
                                style={styles.editInput}
                                value={editTitle}
                                onChangeText={setEditTitle}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.topicText} numberOfLines={1}>{item.topic}</Text>
                        )}
                        <Text style={styles.courseText}>Req: {item.course}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.actionButtons}>
                    {isEditing ? (
                        <TouchableOpacity onPress={() => handleSave(item._id, item)} style={styles.actionBtn}>
                            <FontAwesome name="save" size={22} color="green" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionBtn}>
                            <FontAwesome name="edit" size={22} color="#B39DDB" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.actionBtn}>
                        <AntDesign name="delete" size={22} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Faculty Dashboard</Text>
                <Text style={styles.welcomeText}>
                    Welcome, {user?.name || "Professor"} • {user?.department || "Academic"}
                </Text>
            </View>

            <TouchableOpacity 
                style={styles.uploadBtn}
                onPress={() => navigation.navigate("UploadResource")}
            >
                <Entypo name="circle-with-plus" size={20} color="white" />
                <Text style={styles.uploadBtnText}>Upload New Resource</Text>
            </TouchableOpacity>

            {errorMsg ? (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineText}>{errorMsg}</Text>
                </View>
            ) : null}

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Uploaded Resources</Text>
                {actionLoading ? <ActivityIndicator size="small" color="#5B3FD1" /> : null}
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#5B3FD1" />
                </View>
            ) : (
                <FlatList 
                    data={resources}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    onRefresh={fetchTeacherResources}
                    refreshing={loading}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You haven't uploaded any resources yet.</Text>
                        </View>
                    }
                />
            )}

            <FacultyBottomBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F5FB",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    welcomeText: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    uploadBtn: {
        backgroundColor: "#5B3FD1",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginVertical: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    uploadBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    offlineBanner: {
        backgroundColor: "#FFEEEF",
        marginHorizontal: 20,
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#FFCCD0",
    },
    offlineText: {
        color: "#FF3B30",
        fontSize: 13,
        textAlign: "center",
        fontWeight: "500",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    listContainer: {
        paddingBottom: 80, // Prevent overlap with bottom navigation bar
    },
    resourceCard: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 14,
        marginHorizontal: 20,
        marginVertical: 6,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E2E0EE",
        elevation: 1,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    fileIcon: {
        marginRight: 12,
    },
    subjectText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#B39DDB",
        textTransform: "uppercase",
    },
    topicText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 2,
    },
    editInput: {
        fontSize: 16,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#5B3FD1",
        color: "#333",
        paddingVertical: 2,
        marginTop: 2,
    },
    courseText: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        padding: 8,
        marginLeft: 4,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
    },
    emptyText: {
        color: "#888",
        fontSize: 15,
        textAlign: "center",
    }
});