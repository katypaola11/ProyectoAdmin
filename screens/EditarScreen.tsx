import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../firebase/Config2';



export default function EditarScreen() {

  const [datos, setdatos] = useState<Compra[]>([]);

  type Compra = {
    id: number;
    Pedido: string;
    Marca: string;
    Cantidad: number;
    Estado: string;
    Total: number;
  };

  async function leer() {
    const { data, error } = await supabase.from('Respuestos').select();
    if (error) {
      console.error('Error al leer:', error);
      return;
    }
    setdatos(data as Compra[]);
  }

  useEffect(() => {
    leer();
  }, []);

  async function cambiarEstado(id: number, nuevoEstado: string) {

    Alert.alert(
      'Confirmar cambio',
      '¿Desea confirmar el cambio de estado?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            const { error } = await supabase
              .from('Respuestos')
              .update({ Estado: nuevoEstado })
              .eq('id', id);

            if (error) {
              Alert.alert('Error', 'No se pudo actualizar el estado.');
              console.error(error);
            } else {
              Alert.alert('Éxito', 'Estado actualizado correctamente.');
              leer();
            }
          },
        },
      ]
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Compras</Text>

      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const esCompletado = item.Estado === 'Completado';
          return (
            <View style={styles.card}>
              <Text style={styles.item}><Text style={styles.label}>Pedido:</Text> {item.Pedido}</Text>
              <Text style={styles.item}><Text style={styles.label}>ID:</Text> {item.id}</Text>
              <Text style={styles.item}><Text style={styles.label}>Marca:</Text> {item.Marca}</Text>
              <Text style={styles.item}><Text style={styles.label}>Cantidad:</Text> {item.Cantidad}</Text>
              <Text style={styles.item}><Text style={styles.label}>Estado:</Text> {item.Estado}</Text>
              <Text style={styles.item}><Text style={styles.label}>Total:</Text> ${item.Total}</Text>

              <TouchableOpacity
                style={[
                  styles.estadoButton,
                  esCompletado ? styles.estadoCompletado : styles.estadoPendiente
                ]}
                onPress={() => cambiarEstado(item.id, 'Completado')}
                disabled={esCompletado}
              >
                <Text style={styles.estadoButtonText}>
                  {esCompletado ? 'Estado: Completado' : 'Estado: Pendiente'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2a38',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff33',
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  estadoButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  estadoPendiente: {
    backgroundColor: '#e74c3c33',
    borderColor: '#e74c3c',
    borderWidth: 1,
  },
  estadoCompletado: {
    backgroundColor: '#2ecc7133',
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  estadoButtonText: {
    color: '#2c3e50',
    fontWeight: 'bold',
  },
});

