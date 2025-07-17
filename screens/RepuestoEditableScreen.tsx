import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { ref, update } from 'firebase/database';
import { db } from '../firebase/Config';


export default function RepuestoEditableScreen({ route, navigation }: any) {
    const { repuesto } = route.params;

    const [descripcion, setDescripcion] = useState(repuesto.descripcion);
    const [precio, setPrecio] = useState(repuesto.precio);
    const [stock, setStock] = useState(repuesto.stock);

    function guardarCambios() {
        const repuestoRef = ref(db, `users/userId_katy/repuestos/${repuesto.id}`);

        const datosActualizados = {
            descripcion,
            precio,
            stock,
        };

        update(repuestoRef, datosActualizados)
            .then(() => {
                Alert.alert('Actualizado', 'El repuesto fue actualizado correctamente');
                navigation.goBack();
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Hubo un problema al actualizar');
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre del Repuesto:</Text>
            <Text style={styles.texto}>{repuesto.nombreRepuesto}</Text>

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                value={descripcion}
                onChangeText={setDescripcion}
                style={styles.input}
                multiline
            />

            <Text style={styles.label}>Precio</Text>
            <TextInput
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Stock</Text>
            <TextInput
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.buttonContainer}>
                <Button title="Guardar Cambios" onPress={guardarCambios} color="#4CAF50" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#1a1a1a',
        flexGrow: 1,
    },
    label: {
        color: '#aaa',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        fontSize: 16,
    },
    texto: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#2c2c2c',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
});