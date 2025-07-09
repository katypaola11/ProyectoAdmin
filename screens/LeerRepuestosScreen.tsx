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
          <Text style={styles.headerText}>LISTA DE REPUESTOS</Text>
          <View style={styles.headerLine} />
          <Text style={styles.subHeaderText}>Calidad y Confianza</Text>
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
    backgroundColor: '#F3F4F6', 
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 1.5,
  },
  headerLine: {
    width: 60,
    height: 3,
    backgroundColor: '#3B82F6',
    marginVertical: 10,
    borderRadius: 2,
  },
  subHeaderText: {
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },


  brandSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  brandHeader: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  brandAccent: {
    marginTop: 6,
    width: 35,
    height: 2,
    backgroundColor: '#60A5FA',
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
});


        
  

