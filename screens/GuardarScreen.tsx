import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
//FIREBASE
import {  ref, set } from "firebase/database";
import { db } from "../firebase/Config";


export default function GuardarScreens() {
    const [marca, setmarca] = useState("")
    const [cedula, setcedula] = useState("");
    const [nombre, setnombre] = useState("");
    const [edad, setedad] = useState(0);
    const [correo, setcorreo] = useState("");

    function guardar() {
        set(ref(db, `${marca}/${cedula}`), {
            username: nombre,
            email: correo,
            age: edad,
        }).then(() => {
            setcedula("");
            setnombre("");
            setedad(0);
            setcorreo("");
            Alert.alert("Aviso", "Datos guardados");
        });
    }

    return (
        <View style={styles.container}>
            <Text>Guardar</Text>
            <TextInput
                placeholder="Ingresar Marca"
                onChangeText={setmarca}
                value={marca}
                style={styles.input}
            />

            <TextInput
                placeholder="Ingresar cedula"
                onChangeText={(texto) => setcedula(texto)}
                value={cedula}
                style={styles.input}
            />

            <TextInput
                placeholder="Ingresar Nombre"
                onChangeText={(texto) => setnombre(texto)}
                value={nombre}
                style={styles.input}
            />

            <TextInput
                placeholder="Ingresar Edad"
                onChangeText={(texto) => setedad(+texto)}
                value={edad ? edad.toString() : ""}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Ingresar Correo"
                onChangeText={(texto) => setcorreo(texto)}
                value={correo}
                style={styles.input}
            />

            <Button title="Guardar" onPress={()=>guardar()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "rgb(38,217,59)",
        fontSize: 20,
        margin: 5,
        textAlign: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "rgb(94,191,64)",

    },
});