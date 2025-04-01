import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import MapView, { UrlTile, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { decode } from '@mapbox/polyline';

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    // Coordenadas de origen y destino
    const origin = { latitude: 18.006511, longitude: -92.937120 };
    const destination = { latitude: 18.000890, longitude: -92.941312 };

    useEffect(() => {
        const getLocationAndRoute = async () => {
            try {
                // Verificar permisos de ubicación
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permiso de ubicación denegado');
                    return;
                }

                // Obtener ubicación actual
                const currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(currentLocation);

                // Obtener la ruta
                await fetchRoute();
            } catch (error) {
                setErrorMsg(`Error: ${error.message}`);
            }
        };

        const fetchRoute = async () => {
            try {
                // Usando el servicio OSRM para obtener la ruta
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=polyline`
                );
                const json = await response.json();

                if (json.routes && json.routes[0]) {
                    const points = decode(json.routes[0].geometry);
                    const coords = points.map(point => ({
                        latitude: point[0],
                        longitude: point[1],
                    }));
                    setRouteCoordinates(coords);
                }
            } catch (error) {
                console.error('Error al obtener la ruta:', error);
            }
        };

        getLocationAndRoute();
    }, []);

    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text>Mapa no disponible en versión web</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Obteniendo ubicación y ruta...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                />

                {/* Marcador de origen */}
                <Marker
                    coordinate={origin}
                    title="Punto de inicio"
                    pinColor="green"
                />

                {/* Marcador de destino */}
                <Marker
                    coordinate={destination}
                    title="Punto de destino"
                    pinColor="red"
                />

                {/* Línea de ruta */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#0000FF"
                        strokeWidth={4}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
});