import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Button,
} from 'react-native';
import { auth } from '../firebase/Config';


export default function LoginScreen({ navigation }: any) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        Alert.alert('Error', 'El correo electrónico no es válido.');
                        break;
                    case 'auth/user-not-found':
                        Alert.alert('Error', 'Usuario no registrado.');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Error', 'Contraseña incorrecta.');
                        break;
                    default:
                        Alert.alert('Error', 'Credenciales incorrectas o error inesperado.');
                        console.error(error);
                }
            });
    }


    function restablecer() {
        if (!user) {
            Alert.alert('Atención', 'Ingresa tu correo antes de solicitar recuperación.');
            return;
        }
        sendPasswordResetEmail(auth, user)
            .then(() => {
                Alert.alert('Mensaje', 'Verifica tu correo electrónico para restablecer la contraseña.');
            })
            .catch((error) => {
                Alert.alert('Error', 'No se pudo enviar el correo. Revisa el correo ingresado.');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={user}
                onChangeText={setUser}
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
            />

            

            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Acceder</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={restablecer}>
                <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#2c2c2c',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#444',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    linkText: {
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});

