import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Marcas from '../components/Marcas';
import datos from '../assets/data/repuestos.json'

export default function LeerRepuestosScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>REPUESTOS PREMIUM</Text>
                <View style={styles.headerLine} />
                <Text style={styles.subHeaderText}>Calidad y Confianza</Text>
            </View>

            <View style={styles.brandSection}>
                <View style={styles.brandHeader}>
                    <Text style={styles.brandTitle}>TOYOTA</Text>
                    <View style={styles.brandAccent} />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={datos.Toyota}
                        renderItem={({ item }) => <Marcas info={item} />}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatList}
                    />
                </View>
            </View>

            <View style={styles.brandSection}>
                <View style={styles.brandHeader}>
                    <Text style={styles.brandTitle}>CHEVROLET</Text>
                    <View style={styles.brandAccent} />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={datos.Chevrolet}
                        renderItem={({ item }) => <Marcas info={item} />}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatList}
                    />
                </View>
            </View>

            <View style={styles.brandSection}>
                <View style={styles.brandHeader}>
                    <Text style={styles.brandTitle}>HYUNDAI</Text>
                    <View style={styles.brandAccent} />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={datos.Hyundai}
                        renderItem={({ item }) => <Marcas info={item} />}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatList}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', 
        paddingHorizontal: 20,
    },
    headerContainer: {
        paddingTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2C5F75', 
        marginBottom: 30,
    },
    headerText: {
        fontSize: 32,
        fontWeight: '100', 
        color: '#1A2332',
        letterSpacing: 4,
        textAlign: 'center',
    },
    headerLine: {
        width: 100,
        height: 2,
        backgroundColor: '#2C5F75',
        marginVertical: 15,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#5A6C7D',
        fontWeight: '300',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    brandSection: {
        marginBottom: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#2C5F75',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E8ECEF',
    },
    brandHeader: {
        backgroundColor: '#2C5F75',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderLeftWidth: 4,
        borderLeftColor: '#D4B068', 
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: '200',
        color: '#FFFFFF',
        letterSpacing: 3,
        marginBottom: 5,
    },
    brandAccent: {
        width: 50,
        height: 1,
        backgroundColor: '#D4B068',
    },
    listContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    flatList: {
        backgroundColor: 'transparent',
    },
})

