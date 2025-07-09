import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../firebase/Config2'

export default function LeerUsuariosScreen() {
  const [datos, setdatos] = useState([])

  async function leer() {
    const { data, error } = await supabase
      .from('Usuarios')
      .select()
    setdatos(data as any)
  }

  useEffect(() => {
    leer()
  }, [])

  type Usuario = {
    cedula: string,
    nombre: string,
    apellido: string,
    correo: string,
    Telefono: string,
    dirreccion: string,
    contrasena: string
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.info}>📧 {item.correo}</Text>
            <Text style={styles.info}>📞 {item.Telefono}</Text>
            <Text style={styles.info}>📍 {item.dirreccion}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
})
