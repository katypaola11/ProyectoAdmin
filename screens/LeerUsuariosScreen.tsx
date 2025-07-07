import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../firebase/Config2'

export default function LeerUsuariosScreen() {
  const [datos, setdatos] = useState([])


  async function leer() {

    const { data, error } = await supabase
      .from('Usuarios')
      .select()
    //console.log(data);
    setdatos(data as any)

  }

  useEffect(() => {
    leer()
    //console.log(datos); 
  }, [])

  type Usuario = {
    cedula: String,
    nombre: String,
    apellido: String,
    correo: String,
    Telefono: String,
    dirreccion: String,
    contrasena: String
  }




  return (
    <View>
      <Text>Leer </Text>
      <FlatList
        data={datos}
        renderItem={({ item }: { item: Usuario }) =>
          <View>
            <Text>{item.nombre}</Text>
            <Text>{item.apellido}</Text>
            <Text>{item.correo}</Text>
            <Text>{item.Telefono}</Text>
          </View>
        }
      />
    </View>
  )
}


const styles = StyleSheet.create({})