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
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Usuarios</Text>
        <View style={styles.headerDivider} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{datos.length}</Text>
        </View>
      </View>
      
      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.nombre}>
                👤 {item.nombre} {item.apellido}
              </Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📧</Text>
                <Text style={styles.info}>{item.correo}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📞</Text>
                <Text style={styles.info}>{item.Telefono}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.info}>{item.dirreccion}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', 
  },
  header: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#22C55E', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC', 
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#22C55E',
    borderRadius: 2,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#22C55E', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#16A34A', 
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000', 
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E', 
  },
  cardHeader: {
    backgroundColor: '#374151', 
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#22C55E', 
  },
  cardBody: {
    padding: 20,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC', 
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#E2E8F0', 
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
});