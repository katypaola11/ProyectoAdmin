import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Marcas from '../components/Marcas';
import datos from '../assets/data/repuestos.json'



export default function LeerRepuestosScreen() {
 



  return (
    <View>
      <Text>Lista de Repuestos</Text>
      <FlatList
                data={datos.Toyota}
                renderItem={({ item }) =>
                    <Marcas info={item}/>
                }
            />
            <FlatList
                data={datos.Chevrolet}
                renderItem={({ item }) =>
                    <Marcas info={item}/>
                }
            />
            <FlatList
                data={datos.Hyundai}
                renderItem={({ item }) =>
                    <Marcas info={item}/>
                }
            />
    </View>
  )
}

const styles = StyleSheet.create({})