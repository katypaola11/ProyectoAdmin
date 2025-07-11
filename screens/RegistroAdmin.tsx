import { Button, StyleSheet, Text, View, Switch, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function RegistroAdmin({ navigation }: any) {
    const [acepta, setacepta] = useState(false);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    function registro() {
        if (!nombreCompleto || !email || !password || !confirmarPassword) {
            Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos.');
            return;
        }

        if (password !== confirmarPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (!acepta) {
            Alert.alert('Error', 'Debe aceptar los términos y condiciones.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Éxito', 'Usuario registrado correctamente');
                navigation.navigate('Login');
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                if (errorCode == 'auth/weak-password') {
                    errorCode = 'Contraseña Débil';
                    errorMessage = 'Se necesita por lo menos 6 caracteres';
                } else if (errorCode == 'auth/invalid-email') {
                    errorCode = 'Correo Inválido';
                    errorMessage = 'Por favor ingrese un correo electrónico válido';
                } else if (errorCode == 'auth/email-already-in-use') {
                    errorCode = 'Email en uso';
                    errorMessage = 'Este correo electrónico ya está registrado';
                } else {
                    errorCode = 'Error';
                    errorMessage = 'Por favor intente de nuevo';
                }

                Alert.alert(errorCode, errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput
                placeholder="Nombre Completo"
                style={styles.input}
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Correo Electrónico"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Confirmar Contraseña"
                style={styles.input}
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
                placeholderTextColor="#999"
            />

            <View style={styles.switchContainer}>
                <Switch
                    value={acepta}
                    onValueChange={setacepta}
                    thumbColor={acepta ? '#4CAF50' : '#f4f3f4'}
                    trackColor={{ false: '#767577', true: '#a5d6a7' }}
                />
                <Text style={styles.switchLabel}>Aceptar términos y recibir newsletter</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Registrar" color="#4CAF50" onPress={registro} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    switchLabel: {
        marginLeft: 12,
        color: '#ccc',
        fontSize: 15,
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});
