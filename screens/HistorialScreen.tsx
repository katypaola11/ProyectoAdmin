import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../firebase/Config2';

export default function HistorialScreen() {
  const [datos, setdatos] = useState([]);

  async function leer() {
    const { data, error } = await supabase.from('Historial').select();
    setdatos(data as any);
  }

  useEffect(() => {
    leer();
  }, []);

  type Historia = {
    id: number,
    Pedido: string;
    Marca: string;
    Cantidad: number;

    Total: number;
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      <FlatList
        data={datos}
        renderItem={({ item }: { item: Historia }) => (
          <View style={styles.card}>
           
            <Text style={styles.info}> Id Pedido:{item.id}</Text>
            <Text style={styles.info}> Cantidad: {item.Cantidad}</Text>
            <Text style={styles.info}>Marca: {item.Marca}</Text>
            <Text style={styles.info}>Total: {item.Total}</Text>
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
