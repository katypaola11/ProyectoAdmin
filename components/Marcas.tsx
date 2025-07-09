import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Marcas(props:any) {


    function mostrar(data:any) {
        Alert.alert("Informacion",  + data.marca + "  " + data.precio)

    }



    return (
        <TouchableOpacity onPress={() => mostrar(props.info)} style={styles.btn}>

            
            <Text style={styles.txt}>{props.info.nombre}</Text>
            <Image style={styles.img} source={{uri:props.info.imagen}}></Image>
            <Text style={styles.txt}>{props.info.descripcion}  </Text>
            <Text style={styles.txt}>{props.info.precio}  </Text>
            <Text style={styles.txt}>{props.info.stock}  </Text>

            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    txt:{
        fontSize:30

    },
    btn:{
        borderRadius: 10

    },
    img:{
        height: 100,
        width:100
    }
})