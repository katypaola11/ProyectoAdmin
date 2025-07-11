import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Marcas from '../components/Marcas';
import datos from '../assets/data/repuestos.json';

const secciones = [
  { titulo: 'TOYOTA', data: datos.Toyota },
  { titulo: 'CHEVROLET', data: datos.Chevrolet },
  { titulo: 'HYUNDAI', data: datos.Hyundai },
];

export default function LeerRepuestosScreen() {
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Repuestos Disponibles</Text>
          <View style={styles.headerLine} />
          <Text style={styles.subHeaderText}>Calidad garantizada</Text>
        </View>
      }
      data={secciones}
      keyExtractor={(item) => item.titulo}
      renderItem={({ item }) => (
        <View style={styles.brandSection}>
          <View style={styles.brandHeader}>
            <Text style={styles.brandTitle}>{item.titulo}</Text>
            <View style={styles.brandAccent} />
          </View>
          <View style={styles.listContainer}>
            {item.data.map((rep, index) => (
              <Marcas key={index} info={rep} />
            ))}
          </View>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1a1a1a',
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2c2c2c',
  },
});





