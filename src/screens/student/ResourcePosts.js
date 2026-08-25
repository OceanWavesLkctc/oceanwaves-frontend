import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Image, 
    TextInput, 
    StyleSheet, 
    ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';

const SUBJECT_ICONS = {
    'database management system': require("./images/database.png"),
    'operating systems': require("./images/system-update.png"),
    'data structures': require("./images/datastructure.png"),
    'cloud computing': require("./images/server.png"),
    'design and analysis of algorithms': require("./images/ux.png"),
    'default': require("./images/microchip.png")
};

const getIcon = (subjectName) => {
    const key = String(subjectName).trim().toLowerCase();
    return SUBJECT_ICONS[key] || SUBJECT_ICONS['default'];
};

const ResourcePosts = () => {
    const navigation = useNavigation();
    const { token, user } = useContext(AuthContext);
    
    const [resources, setResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    // Fallback Mock Data if server is offline or empty
    const MOCK_RESOURCES = [
        {
            _id: 'mock1',
            subject: 'Operating Systems',
            topic: 'CPU Scheduling Algorithms',
            questions: [
                { question: "What is CPU scheduling?", answer: "The process of determining which process will own CPU for execution." },
                { question: "What is FCFS?", answer: "First Come First Served scheduling algorithm." },
                { question: "What is Round Robin?", answer: "A time-sliced preemptive scheduling algorithm." }
            ],
            uploadedBy: { name: "Prof. Miller", department: "CSE" }
        },
        {
            _id: 'mock2',
            subject: 'Database Management System',
            topic: 'SQL Joins and Queries',
            questions: [
                { question: "What is a SQL Join?", answer: "A clause used to combine rows from two or more tables." },
                { question: "What is Inner Join?", answer: "Returns records that have matching values in both tables." }
            ],
            uploadedBy: { name: "Dr. Smith", department: "IT" }
        }
    ];

    const fetchResources = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const response = await api.get('/studentdashboard', token);
            if (response.success && response.data.files) {
                setResources(response.data.files);
            } else {
                console.log("Using local mock data fallback. Error details:", response.error);
                setResources(MOCK_RESOURCES);
                setErrorMsg("Backend offline. Displaying local preview resources.");
            }
        } catch (e) {
            console.error("Fetch dashboard error:", e);
            setResources(MOCK_RESOURCES);
            setErrorMsg("Network error. Showing local preview resources.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const filteredResources = resources.filter(res => {
        const matchSubject = res.subject?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchTopic = res.topic?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchSubject || matchTopic;
    });

    const renderItem = ({ item }) => {
        const isMock = String(item._id).startsWith('mock');
        return (
            <TouchableOpacity 
                style={styles.card}
                onPress={() => navigation.navigate("ResourceDetail", { 
                    id: item._id,
                    mockData: isMock ? item : null // Pass mock data directly if offline
                })}
            >
                <View style={styles.cardHeader}>
                    <Image source={getIcon(item.subject)} style={styles.subjectIcon} />
                    <View style={styles.titleWrapper}>
                        <Text style={styles.subjectText} numberOfLines={1}>{item.subject}</Text>
                        <Text style={styles.topicText} numberOfLines={1}>{item.topic}</Text>
                    </View>
                </View>
                <View style={styles.cardFooter}>
                    <Text style={styles.statText}>
                        📋 {item.questions?.length || 0} Questions
                    </Text>
                    <Text style={styles.authorText}>
                        By {item.uploadedBy?.name || "Faculty"} ({item.uploadedBy?.department || "CSE"})
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredResources}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                onRefresh={fetchResources}
                refreshing={loading}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <Image 
                                source={require("./images/Logo1.png")}
                                style={styles.logo}
                            />
                            <Text style={styles.headerTitle}>Ocean Notes</Text>
                            {user ? (
                            <Text style={styles.welcomeText}>
                                Hello, {user.name || "Student"} • {user.course || "Student"}
                            </Text>
                        ) : null}
                    </View>

                    <TextInput
                        placeholder="Search subjects or topics..."
                        style={styles.searchBar}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {errorMsg ? (
                        <View style={styles.offlineBanner}>
                            <Text style={styles.offlineText}>{errorMsg}</Text>
                        </View>
                    ) : null}

                    <Text style={styles.sectionTitle}>
                        Academic Resources
                    </Text>
                </>
            }
            ListEmptyComponent={
                !loading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No study resources found</Text>
                    </View>
                ) : null
            }
            contentContainerStyle={styles.listContent}
        />
        </View>
    );
};

export default ResourcePosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5FB',
    },
    listContent: {
        paddingBottom: 40,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    logo: {
        height: 120,
        width: 100,
        resizeMode: "contain",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#777",
        marginTop: 2,
    },
    welcomeText: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
        fontWeight: "500",
        backgroundColor: "#EEEEF4",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    searchBar: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#E2E0EE",
        fontSize: 15,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
        marginBottom: 12,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#E2E0EE",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F0EEF8",
        paddingBottom: 12,
        marginBottom: 12,
    },
    subjectIcon: {
        width: 44,
        height: 44,
        marginRight: 12,
        resizeMode: "contain",
    },
    titleWrapper: {
        flex: 1,
    },
    subjectText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#333",
    },
    topicText: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5B3FD1",
    },
    authorText: {
        fontSize: 12,
        color: "#888",
    },
    offlineBanner: {
        backgroundColor: "#FFEEEF",
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#FFCCD0",
    },
    offlineText: {
        color: "#FF3B30",
        fontSize: 13,
        textAlign: "center",
        fontWeight: "500",
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    emptyText: {
        color: "#999",
        fontSize: 15,
    }
});