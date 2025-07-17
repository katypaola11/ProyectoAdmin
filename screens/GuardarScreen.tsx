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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    backgroundColor: "#0F172A", 
  },
  header: {
    backgroundColor: "#1E293B", 
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#22C55E", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC", 
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8", 
    textAlign: "center",
    marginBottom: 16,
  },
  headerDivider: {
    width: 60,
    height: 4,
    backgroundColor: "#22C55E", 
    alignSelf: "center",
    borderRadius: 2,
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 28,
    backgroundColor: "#1E293B", 
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#22C55E", 
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#22C55E", 
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E2E8F0", 
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#374151", 
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#111827", 
    color: "#F8FAFC", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
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
    backgroundColor: "#22C55E", 
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#16A34A", 
  },
  buttonText: {
    color: "#000000", 
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});