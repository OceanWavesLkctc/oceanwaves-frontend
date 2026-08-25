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

export default function ResourceDetailScreen({ route, navigation }) {
    const { id, mockData } = route.params || {};
    const { token } = useContext(AuthContext);

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [revealedAnswers, setRevealedAnswers] = useState({}); // Keep track of toggled answer states

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

    const toggleAnswer = (index) => {
        setRevealedAnswers(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const renderQuestionItem = ({ item, index }) => {
        const isRevealed = !!revealedAnswers[index];
        return (
            <View style={styles.qCard}>
                <View style={styles.qHeader}>
                    <Text style={styles.qNumber}>Question {index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{item.question}</Text>
                
                {isRevealed ? (
                    <View style={styles.answerWrapper}>
                        <Text style={styles.answerLabel}>Answer:</Text>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                ) : null}

                <TouchableOpacity 
                    style={[styles.toggleBtn, isRevealed && styles.toggleBtnActive]}
                    onPress={() => toggleAnswer(index)}
                >
                    <Text style={[styles.toggleBtnText, isRevealed && styles.toggleBtnTextActive]}>
                        {isRevealed ? "Hide Answer" : "Reveal Answer"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#5B3FD1" />
                <Text style={styles.loadingText}>Loading questions...</Text>
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
                <Text style={styles.headerTitle} numberOfLines={1}>Study Session</Text>
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
                        <Text style={styles.courseText}>Course requirement: {resource.course}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.facultyText}>
                            Uploaded By: {resource.uploadedBy?.name || "Faculty Member"}
                        </Text>
                        <Text style={styles.deptText}>
                            Department: {resource.uploadedBy?.department || "N/A"}
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
    facultyText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    deptText: {
        fontSize: 13,
        color: "#777",
        marginTop: 2,
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
        backgroundColor: "#F2EFFD",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: "#B39DDB",
    },
    answerLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#5B3FD1",
        marginBottom: 4,
    },
    answerText: {
        fontSize: 15,
        color: "#444",
        lineHeight: 20,
    },
    toggleBtn: {
        borderWidth: 1,
        borderColor: "#B39DDB",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    toggleBtnActive: {
        backgroundColor: "#B39DDB",
    },
    toggleBtnText: {
        color: "#5B3FD1",
        fontWeight: "bold",
        fontSize: 14,
    },
    toggleBtnTextActive: {
        color: "#fff",
    }
});
