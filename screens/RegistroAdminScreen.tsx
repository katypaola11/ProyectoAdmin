import { Button, StyleSheet, Text, View, Switch, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function RegistroAdminScreen() {
    const [acepta, setAcepta] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput placeholder='Nombre Completo' style={styles.input} />
            <TextInput placeholder='Usuario' style={styles.input} />
            <TextInput placeholder='Correo Electrónico' style={styles.input} keyboardType='email-address' />
            <TextInput placeholder='Contraseña' style={styles.input} secureTextEntry />
            <TextInput placeholder='Confirmar Contraseña' style={styles.input} secureTextEntry />

            <View style={styles.switchContainer}>
                <Switch value={acepta} onValueChange={setAcepta} />
                <Text style={styles.switchLabel}>Aceptar términos y recibir newsletter</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title='Guardar' color="#6eae32f0" onPress={() => { }} />
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