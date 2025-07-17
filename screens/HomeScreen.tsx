import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Concesionaria</Text>
      <Text style={styles.subtitle}>Administra vehículos, repuestos y usuarios</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.createCard]} onPress={() => navigation.navigate("Guardar")}>
          <Text style={styles.cardIcon}>🚗</Text>
          <Text style={styles.cardTitle}>Agregar Repuesto</Text>
          <Text style={styles.cardDescription}>Registra autos nuevos en el sistema</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Marca")}>
          <Text style={styles.cardIcon}>🔧</Text>
          <Text style={styles.cardTitle}>Repuesto</Text>
          <Text style={styles.cardDescription}>Consulta y Edision de repuestos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Usuarios")}>
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardDescription}>Revisa  información de usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Historial")}>
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardTitle}>Historial</Text>
          <Text style={styles.cardDescription}>Revisa las compras del Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Editar")}>
          <Text style={styles.cardIcon}>✏️</Text>
          <Text style={styles.cardTitle}>Editar Pedido</Text>
          <Text style={styles.cardDescription}>Actualizar el pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Perfil")}>
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardTitle}>Perfil</Text>
          <Text style={styles.cardDescription}>Ver perfil</Text>
        </TouchableOpacity>


        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  createCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  readCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3',
  },
  updateCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
  },
  deleteCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#F44336',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
    color: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#ccc',
  },
});
