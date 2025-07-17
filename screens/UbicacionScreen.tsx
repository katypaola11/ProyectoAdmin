import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Circle, Region } from 'react-native-maps';

export default function UbicacionScreens() {
    const [region, setRegion] = useState<Region>({
        latitude: -0.176,
        longitude: -78.479,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        setRegion({
            latitude: -0.176,
            longitude: -78.479,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion} 
            >
                <Circle
                    center={{ latitude: -0.176, longitude: -78.479 }}
                    radius={100}
                    strokeColor="#0000FF"
                    fillColor="rgba(0, 0, 255, 0.2)"
                    strokeWidth={2}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
});