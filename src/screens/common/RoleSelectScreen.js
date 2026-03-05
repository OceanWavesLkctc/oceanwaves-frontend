import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RoleSelectScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Role</Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Login", { role: "student" })}
            >
                <Text style={styles.cardText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Login", { role: "faculty" })}
            >
                <Text style={styles.cardText}>Faculty</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#F6F5FB",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
    },
    cardText: {
        fontSize: 18,
    },
});