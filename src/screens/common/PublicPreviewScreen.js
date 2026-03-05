import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PublicPreviewScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ocean Waves</Text>
            <Text style={styles.subtitle}>
                Access curated academic resources from your college.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("RoleSelect")}
            >
                <Text style={styles.buttonText}>Register to Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F5FB",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#5B3FD1",
    },
    subtitle: {
        marginTop: 12,
        textAlign: "center",
        color: "#555",
    },
    button: {
        marginTop: 40,
        backgroundColor: "#5B3FD1",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});