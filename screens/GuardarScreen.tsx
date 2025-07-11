import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase/Config";

export default function GuardarScreens() {
  const [marca, setmarca] = useState("");
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
      Alert.alert("Éxito", "Datos guardados correctamente.");
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Vehículo</Text>

      <TextInput
        placeholder="Marca del vehículo"
        onChangeText={setmarca}
        value={marca}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Cédula del propietario"
        onChangeText={setcedula}
        value={cedula}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Nombre del propietario"
        onChangeText={setnombre}
        value={nombre}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Edad"
        onChangeText={(texto) => setedad(+texto)}
        value={edad ? edad.toString() : ""}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Correo electrónico"
        onChangeText={setcorreo}
        value={correo}
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2c2c2c",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
