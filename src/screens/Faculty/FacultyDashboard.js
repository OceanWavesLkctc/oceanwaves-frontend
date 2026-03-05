import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FacultyDashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Faculty Dashboard</Text>

            <TouchableOpacity style={styles.card}>
                <Text>Upload New Resource</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text>Your Uploaded Files</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text>View Statistics</Text>
            </TouchableOpacity>
        </View>
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
        marginBottom: 20
    },
    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 10,
        marginBottom: 12
    }
});