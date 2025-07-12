import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { get, ref, set, push } from "firebase/database";
import { db } from "../firebase/Config";
import { getAuth } from "firebase/auth";

export default function GuardarScreens() {
  const [marca, setMarca] = useState("");
  const [nombreRepuesto, setNombreRepuesto] = useState("");
  const [imagen, setImagen] = useState("");
  const [marcaRepuesto, setMarcaRepuesto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const guardarRepuesto = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      Alert.alert("Error", "Usuario no autenticado");
      return;
    }

    if (!marca || !nombreRepuesto || !imagen || !marcaRepuesto || !descripcion || !precio || !stock) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const userEmail = user.email;
    const userId = `userId_${userEmail.split("@")[0]}`;

    const nuevoRepuesto = {
      marca,
      nombre: nombreRepuesto,
      imagen,
      marcaRepuesto,
      descripcion,
      precio,
      stock,
      creadoPor: userEmail,
      fecha: new Date().toISOString()
    };

    try {
      // Referencia única para cada repuesto (usamos push para ID automático)
      const repuestosRef = ref(db, `users/${userId}/repuestos`);
      const nuevoRepuestoRef = push(repuestosRef);
      await set(nuevoRepuestoRef, nuevoRepuesto);

      Alert.alert("Éxito", "Repuesto guardado correctamente.");

      // Limpiar campos
      setMarca("");
      setNombreRepuesto("");
      setImagen("");
      setMarcaRepuesto("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    } catch (error) {
      console.error("Error al guardar repuesto:", error);
      Alert.alert("Error", "No se pudo guardar el repuesto. Intenta nuevamente.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Repuesto</Text>

      <TextInput
        placeholder="Marca del vehículo"
        onChangeText={setMarca}
        value={marca}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Nombre del repuesto"
        onChangeText={setNombreRepuesto}
        value={nombreRepuesto}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="URL de la imagen"
        onChangeText={setImagen}
        value={imagen}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Marca del repuesto"
        onChangeText={setMarcaRepuesto}
        value={marcaRepuesto}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Descripción del repuesto"
        onChangeText={setDescripcion}
        value={descripcion}
        style={styles.input}
        placeholderTextColor="#aaa"
        multiline={true}
        numberOfLines={3}
      />

      <TextInput
        placeholder="Precio"
        onChangeText={setPrecio}
        value={precio}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Stock disponible"
        onChangeText={setStock}
        value={stock}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={guardarRepuesto}>
        <Text style={styles.buttonText}>Guardar Repuesto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});