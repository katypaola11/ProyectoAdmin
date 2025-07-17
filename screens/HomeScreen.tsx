import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚘 Gestión de Concesionaria</Text>
      <Text style={styles.subtitle}>Administra vehículos, repuestos y usuarios</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.createCard]} onPress={() => navigation.navigate("Guardar")}>
          <Text style={styles.cardIcon}>➕</Text>
          <Text style={styles.cardTitle}>Agregar Repuesto</Text>
          <Text style={styles.cardDescription}>Registra repuestos nuevos en el sistema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Marca")}>
          <Text style={styles.cardIcon}>🔍</Text>
          <Text style={styles.cardTitle}>Repuestos</Text>
          <Text style={styles.cardDescription}>Consulta y edición de repuestos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Usuarios")}>
          <Text style={styles.cardIcon}>👥</Text>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardDescription}>Revisa la información de los usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Historial")}>
          <Text style={styles.cardIcon}>📜</Text>
          <Text style={styles.cardTitle}>Historial</Text>
          <Text style={styles.cardDescription}>Revisa compras realizadas por usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Editar")}>
          <Text style={styles.cardIcon}>🛠️</Text>
          <Text style={styles.cardTitle}>Editar Pedido</Text>
          <Text style={styles.cardDescription}>Actualiza la información del pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Ubicacion")}>
          <Text style={styles.cardIcon}>📍</Text>
          <Text style={styles.cardTitle}>Ubicación de Empresa</Text>
          <Text style={styles.cardDescription}>Encuentra la sede en Google Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Perfil")}>
          <Text style={styles.cardIcon}>🧑</Text>
          <Text style={styles.cardTitle}>Perfil</Text>
          <Text style={styles.cardDescription}>Visualiza y edita tu perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbbbbb',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 450,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  createCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
  },
  readCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#2196F3',
  },
  updateCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#FFC107',
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 10,
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
});
