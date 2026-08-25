import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function FacultyResourceDetailScreen({ route, navigation }) {
    const { id, mockData } = route.params || {};
    const { token } = useContext(AuthContext);

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchResourceDetail = async () => {
        if (mockData) {
            setResource(mockData);
            setLoading(false);
            return;
        }

        setLoading(true);
        setErrorMsg("");
        try {
            const response = await api.get(`/file/view/${id}`, token);
            if (response.success && response.data.data) {
                setResource(response.data.data);
            } else {
                setErrorMsg("Failed to retrieve file details from server.");
            }
        } catch (e) {
            console.error("View file error:", e);
            setErrorMsg("Network error. Could not retrieve resource.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResourceDetail();
    }, [id]);

    const renderQuestionItem = ({ item, index }) => {
        return (
            <View style={styles.qCard}>
                <View style={styles.qHeader}>
                    <Text style={styles.qNumber}>Question {index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{item.question}</Text>
                <View style={styles.answerWrapper}>
                    <Text style={styles.answerLabel}>Official Answer:</Text>
                    <Text style={styles.answerText}>{item.answer}</Text>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#5B3FD1" />
                <Text style={styles.loadingText}>Loading details...</Text>
            </SafeAreaView>
        );
    }

    if (errorMsg || !resource) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <Ionicons name="alert-circle-outline" size={48} color="red" />
                <Text style={styles.errorText}>{errorMsg || "Resource not found"}</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Custom Header Bar */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>Resource Questions</Text>
                <View style={{ width: 40 }} /> {/* Spacer */}
            </View>

            <FlatList
                data={resource.questions || []}
                renderItem={renderQuestionItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <View style={styles.metadataCard}>
                        <Text style={styles.subjectText}>{resource.subject}</Text>
                        <Text style={styles.topicText}>Topic: {resource.topic}</Text>
                        <Text style={styles.courseText}>Associated Course: {resource.course}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.statusText}>
                            Status: Published • {resource.questions?.length || 0} Questions Total
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5FB',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F5FB",
        padding: 24,
    },
    loadingText: {
        marginTop: 12,
        color: "#5B3FD1",
        fontWeight: "500",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        marginTop: 12,
        textAlign: "center",
        marginBottom: 20,
    },
    backBtn: {
        backgroundColor: "#B39DDB",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    backBtnText: {
        color: "#fff",
        fontWeight: "bold",
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
    listContent: {
        paddingBottom: 40,
    },
    metadataCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        margin: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#E2E0EE",
    },
    subjectText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    topicText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
        marginTop: 4,
    },
    courseText: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: "#E2E0EE",
        marginVertical: 14,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#2E7D32", // Green
    },
    qCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E0EE",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    qHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "#F0EEF8",
        paddingBottom: 8,
        marginBottom: 10,
    },
    qNumber: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    questionText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
        marginBottom: 16,
    },
    answerWrapper: {
        backgroundColor: "#F1F8E9", // Soft green background for official answer
        padding: 14,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#81C784",
    },
    answerLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2E7D32",
        marginBottom: 4,
    },
    answerText: {
        fontSize: 15,
        color: "#444",
        lineHeight: 20,
    }
});
