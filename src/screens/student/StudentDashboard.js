import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

export default function StudentDashboard() {
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.header}>Welcome Back</Text>

            <TextInput
                placeholder="Search subjects or resources..."
                style={styles.search}
            />

            <Text style={styles.section}>Recent Uploads</Text>

            <View style={styles.card}>
                <Text>Operating Systems Notes</Text>
            </View>

            <View style={styles.card}>
                <Text>DBMS Question Bank</Text>
            </View>

            <Text style={styles.section}>Subjects</Text>

            <View style={styles.grid}>
                <View style={styles.subject}><Text>OS</Text></View>
                <View style={styles.subject}><Text>DBMS</Text></View>
                <View style={styles.subject}><Text>CN</Text></View>
                <View style={styles.subject}><Text>DSA</Text></View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F6F5FB"
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16
    },
    search: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 20
    },
    section: {
        fontWeight: "bold",
        marginBottom: 10
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    subject: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 10,
        width: "48%",
        marginBottom: 10,
        alignItems: "center"
    }
});