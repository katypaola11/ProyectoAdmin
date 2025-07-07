import { Button, StyleSheet, Text, View, Switch, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function RegistroAdmin({navigation}:any) {
    const [acepta, setacepta] = useState(false);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    function registro() {
        if (!nombreCompleto  || !email || !password || !confirmarPassword) {
            Alert.alert("Campos Vacíos", "Por favor, complete todos los campos.");
            return;
        }

        
        if (password !== confirmarPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

       
        if (!acepta) {
            Alert.alert("Error", "Debe aceptar los términos y condiciones.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                Alert.alert("Éxito", "Usuario registrado correctamente");
                navigation.navigate("Login")
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                if (errorCode == "auth/weak-password") {
                    errorCode = "Contraseña Débil"
                    errorMessage = "Se necesita por lo menos 6 caracteres"
                } else if (errorCode == "auth/invalid-email") {
                    errorCode = "Correo Inválido"
                    errorMessage = "Por favor ingrese un correo electrónico válido"
                } else if (errorCode == "auth/email-already-in-use") {
                    errorCode = "Email en uso"
                    errorMessage = "Este correo electrónico ya está registrado"
                } else {
                    errorCode = "Error"
                    errorMessage = "Por favor intente de nuevo"
                }

                Alert.alert(errorCode, errorMessage)
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput 
                placeholder='Nombre Completo' 
                style={styles.input} 
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
            />
    
            <TextInput 
                placeholder='Correo Electrónico' 
                style={styles.input} 
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                placeholder='Contraseña' 
                style={styles.input} 
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput 
                placeholder='Confirmar Contraseña' 
                style={styles.input} 
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
            />

            <View style={styles.switchContainer}>
                <Switch value={acepta} onValueChange={setacepta} />
                <Text style={styles.switchLabel}>Aceptar términos y recibir newsletter</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title='Registrar' color="#6eae32f0" onPress={registro} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    buttonContainer: {
        marginTop: 10,
    },
});