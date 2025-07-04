import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={user}
                onChangeText={setUser}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#2980b9',
                        padding: 15,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: '#f7f9fc',
        flex: 1,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#2c3e50',
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        elevation: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    switchLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: '#34495e',
        flexShrink: 1,
    },
    buttonContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
});
