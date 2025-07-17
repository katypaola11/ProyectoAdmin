import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
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

      const repuestosRef = ref(db, `users/${userId}/repuestos`);
      const nuevoRepuestoRef = push(repuestosRef);
      await set(nuevoRepuestoRef, nuevoRepuesto);
      Alert.alert("Éxito", "Repuesto guardado correctamente.");

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
    <ScrollView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Repuesto</Text>
        <Text style={styles.subtitle}>Completa la información del repuesto</Text>
        <View style={styles.headerDivider} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Vehículo</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Marca del vehículo</Text>
            <TextInput
              placeholder="Ej: Toyota, Honda, Ford..."
              onChangeText={setMarca}
              value={marca}
              style={styles.input}
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Repuesto</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del repuesto</Text>
            <TextInput
              placeholder="Ej: Filtro de aceite, Pastillas de freno..."
              onChangeText={setNombreRepuesto}
              value={nombreRepuesto}
              style={styles.input}
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Marca del repuesto</Text>
            <TextInput
              placeholder="Ej: Bosch, NGK, Denso..."
              onChangeText={setMarcaRepuesto}
              value={marcaRepuesto}
              style={styles.input}
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>URL de la imagen</Text>
            <TextInput
              placeholder="https://ejemplo.com/imagen.jpg"
              onChangeText={setImagen}
              value={imagen}
              style={styles.input}
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción del repuesto</Text>
            <TextInput
              placeholder="Describe las características, compatibilidad y detalles importantes..."
              onChangeText={setDescripcion}
              value={descripcion}
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#6B7280"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Comercial</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Precio ($)</Text>
              <TextInput
                placeholder="0.00"
                onChangeText={setPrecio}
                value={precio}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Stock disponible</Text>
              <TextInput
                placeholder="0"
                onChangeText={setStock}
                value={stock}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={guardarRepuesto}>
          <Text style={styles.buttonText}>💾 Guardar Repuesto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120", // Más elegante y oscuro
  },
  header: {
    backgroundColor: "#111827",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },
  headerDivider: {
    width: 64,
    height: 4,
    backgroundColor: "#16A34A",
    alignSelf: "center",
    borderRadius: 2,
  },
  formContainer: {
    padding: 24,
  },
  section: {
    marginBottom: 28,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#16A34A",
    paddingBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#CBD5E1",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#475569",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: "#0F172A",
    color: "#F1F5F9",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
