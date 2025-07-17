import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase/Config';

export default function MarcaScreen({ navigation }: any) {
  const [datos, setdatos] = useState([]);

  function leer() {
    const productosRef = ref(db, 'users/userId_katy/repuestos');
    onValue(productosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setdatos(lista as any);
      } else {
        setdatos([]);
      }
    });
  }

  function editarRepuesto(item: Repuesto) {
    navigation.navigate('RepuestoEditable', { repuesto: item }); // envía el item como parámetro
    Alert.alert("Editar Repuesto", `Editar: ${item.nombreRepuesto}`, [{ text: "OK" }]);
  }

  useEffect(() => {
    leer();
  }, []);

  type Repuesto = {
    id: string;
    marca: string;
    nombreRepuesto: string;
    imagen: string;
    marcaRepuesto: string;
    descripcion: string;
    precio: string;
    stock: string;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Repuestos New</Text>
        <View style={styles.headerLine} />
        <Text style={styles.subHeaderText}>Listado de repuestos</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Repuesto }) => (
          <View style={styles.brandSection}>
            <View style={styles.brandHeader}>
              <Text style={styles.brandTitle}>{item.marca}</Text>
              <View style={styles.brandAccent} />
            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '600', marginBottom: 6 }}>
                {item.nombreRepuesto}
              </Text>
              <Image
                source={{ uri: item.imagen }}
                style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: '#2c2c2c',
                }}
                resizeMode="cover"
              />
              <Text style={{ color: '#fff', marginBottom: 4 }}>{item.marcaRepuesto}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>{item.descripcion}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>💵 Precio: ${item.precio}</Text>
              <Text style={{ color: '#fff' }}>📦 Stock: {item.stock}</Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editarRepuesto(item)}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    flex: 1,
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#2c2c2c',
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  headerLine: {
    width: 50,
    height: 3,
    backgroundColor: '#4CAF50',
    marginVertical: 10,
    borderRadius: 2,
  },
  subHeaderText: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  brandSection: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  brandHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  brandTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  brandAccent: {
    marginTop: 6,
    width: 35,
    height: 2,
    backgroundColor: '#A5D6A7',
  },

  listContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});



