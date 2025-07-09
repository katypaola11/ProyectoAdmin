import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Marcas(props: any) {

  function mostrar(data: any) {
    Alert.alert("Información", `${data.marca} - ${data.precio}`);
  }

  return (
    <TouchableOpacity onPress={() => mostrar(props.info)} style={styles.card}>
      <Image style={styles.image} source={{ uri: props.info.imagen }} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{props.info.nombre}</Text>
        <Text style={styles.descripcion}>{props.info.descripcion}</Text>
        <Text style={styles.precio}>Precio: ${props.info.precio}</Text>
        <Text style={styles.stock}>Stock: {props.info.stock}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  precio: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  stock: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
