import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../firebase/Config2';

export default function LeerUsuariosScreen() {
  const [datos, setdatos] = useState([]);

  async function leer() {
    const { data, error } = await supabase.from('Usuarios').select();
    setdatos(data as any);
  }

  useEffect(() => {
    leer();
  }, []);

  type Usuario = {
    cedula: string;
    nombre: string;
    apellido: string;
    correo: string;
    Telefono: string;
    dirreccion: string;
    contrasena: string;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>
              👤 {item.nombre} {item.apellido}
            </Text>
            <Text style={styles.info}>📧 {item.correo}</Text>
            <Text style={styles.info}>📞 {item.Telefono}</Text>
            <Text style={styles.info}>📍 {item.dirreccion}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
});
