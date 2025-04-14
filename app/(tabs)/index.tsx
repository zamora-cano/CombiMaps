import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import ClickablePolyline from '@components/ClickablePolyline';
import ModalInformation from '@components/ModalInformation';
import ModalRoutes from '@components/ModalRoutes';

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isRoutesModalVisible, setIsRoutesModalVisible] = useState(false);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

    const routes = [
        {
            name: "Gaviotas - Palacio",
            image: "https://scontent.fvsa2-1.fna.fbcdn.net/v/t39.30808-6/463300857_2788089698008070_3989527158679784613_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeETgbRBEL7uyUBnviTnaCFXEfWnidzLEFkR9aeJ3MsQWebMQRu1gAaDQPz8SSIkqMz7-AULh2CGcsqLox64DAiJ&_nc_ohc=2N2EGzxLFY0Q7kNvwGHWUpC&_nc_oc=AdlzEz8CMy-7hUjn6C1sLwK70srU_6flsX00TzDVD3IYpWnlmKzjsk-avrDl_GDAX4d1T38PGU1JjikiaQ1HEAEw&_nc_zt=23&_nc_ht=scontent.fvsa2-1.fna&_nc_gid=z680n9Oy_nocKWVrW7CB7A&oh=00_AfHNPWePJKP9paJwLEuNHfY88_reUfeDdG3Ak0bJEe1cOw&oe=680319EC",
            distance: "7.5 km",
            duration: "1 hora",
            stops: ["Palacio", "Parque Tomás Garrido", "Museo La Venta", "Central", "20-20", "Gaviotas"],
            strokeColor: "#FF0000",
            coordinates: [
                { latitude: 17.994127, longitude: -92.946485 },
                { latitude: 17.999279, longitude: -92.943630 },
                { latitude: 17.997545, longitude: -92.940380 },
                { latitude: 18.001097, longitude: -92.926296 },
                { latitude: 17.996832, longitude: -92.907511 },
                { latitude: 17.997446, longitude: -92.911298 },
                { latitude: 17.997057, longitude: -92.911231 },
                { latitude: 17.996625, longitude: -92.909617 },
                { latitude: 17.994654, longitude: -92.910291 },
                { latitude: 17.994572, longitude: -92.910124 },
                { latitude: 17.985876, longitude: -92.914621 },
                { latitude: 17.982133, longitude: -92.917021 },
                { latitude: 17.978282, longitude: -92.917669 },
                { latitude: 17.977089, longitude: -92.914495 },
                { latitude: 17.977876, longitude: -92.914040 }
            ]
        },
        {
            name: "Campo loma lasaro",
            image: "https://scontent.fvsa2-1.fna.fbcdn.net/v/t39.30808-6/463666357_2792009914282715_3984278258278915083_n.png?_nc_cat=108&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeFbtaTs7qNH1et31n_ENjlTRHrLItLEbz1Eessi0sRvPSwXWK-1snhjXWjarkuObiLRhP5orpJZyCDcu5qqRMy0&_nc_ohc=YjHkqI5QU9AQ7kNvwGlfEHa&_nc_oc=Adlxae4A1IiRPlBZ2ITM2Q3NuX_uzEpJQ5j_T76jduMPuLlbmZjpOnAeLL0ljmsp6aEiV8IWpvs63Dt4l9Uo1vMB&_nc_zt=23&_nc_ht=scontent.fvsa2-1.fna&_nc_gid=8CtTxVYFo4y-M3xx-BEd4Q&oh=00_AfHU7u_OEMeI6UvIYlRB3uFIsubr8UsO6G_h40Auk_Hc5g&oe=6803227F",
            distance: "7.5 km",
            duration: "1 hora",
            stops: ["Palacio", "Parque Tomás Garrido", "Museo La Venta", "Central", "20-20", "Gaviotas"],
            strokeColor: "#0000ff",
            coordinates: [
                { latitude: 17.989500, longitude: -92.949155 },
                { latitude: 17.992605, longitude: -92.945213 },
                { latitude: 17.997545, longitude: -92.940380 },
                { latitude: 18.001097, longitude: -92.926296 },
                { latitude: 17.998040, longitude: -92.915311 },
                { latitude: 17.994908, longitude: -92.916283 },
            ]
        },
        {
            name: "Usumacinta",
            image: "https://www.motoredge.mx/wp-content/uploads/2020/02/22472DCRM.jpg",
            distance: "5.2 km",
            duration: "45 minutos",
            strokeColor: "#00FF00",
            stops: ["Usumacinta", "Parque Tomás Garrido", "Mercado", "Zona Luz", "Catedral"],
            coordinates: [
                { latitude: 17.978792, longitude: -92.931715 },
                { latitude: 17.992142, longitude: -92.944843 },
                { latitude: 17.996934, longitude: -92.940419 },
                { latitude: 18.001866, longitude: -92.934694 },
                { latitude: 18.001607, longitude: -92.929909 },
                { latitude: 18.001393, longitude: -92.928089 },
                { latitude: 18.001460, longitude: -92.926879 },
                { latitude: 18.001368, longitude: -92.927064 },
                { latitude: 18.002807, longitude: -92.926442 }
            ]
        },
    ];

    const calculateDistance = (coord1, coord2) => {
        // Conversión a radianes
        const lat1 = coord1.latitude * Math.PI / 180;
        const lon1 = coord1.longitude * Math.PI / 180;
        const lat2 = coord2.latitude * Math.PI / 180;
        const lon2 = coord2.longitude * Math.PI / 180;

        // Fórmula Haversine
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371000 * c; // Radio de la Tierra en metros
    };

    const distanceToSegment = (point, segmentStart, segmentEnd) => {
        // Convertimos a radianes
        const x = point.longitude * Math.PI / 180;
        const y = point.latitude * Math.PI / 180;
        const x1 = segmentStart.longitude * Math.PI / 180;
        const y1 = segmentStart.latitude * Math.PI / 180;
        const x2 = segmentEnd.longitude * Math.PI / 180;
        const y2 = segmentEnd.latitude * Math.PI / 180;

        // Cálculo de la distancia al segmento
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;

        if (len_sq !== 0) param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        // Distancia entre el punto y el punto más cercano en el segmento
        const dx = x - xx;
        const dy = y - yy;
        return 6371000 * Math.sqrt(dx * dx + dy * dy); // Convertimos a metros
    };

    const findRoutesNearPoint = (point) => {
        const nearbyRoutes = [];
        const MAX_DISTANCE = 30; // Reducimos a 30 metros para mayor precisión

        routes.forEach(route => {
            let isNear = false;

            for (let i = 0; i < route.coordinates.length - 1 && !isNear; i++) {
                const segmentStart = route.coordinates[i];
                const segmentEnd = route.coordinates[i + 1];

                const dist = distanceToSegment(point, segmentStart, segmentEnd);

                if (dist <= MAX_DISTANCE) {
                    nearbyRoutes.push(route);
                    isNear = true;
                }
            }
        });

        return nearbyRoutes;
    };

    const handleMapPress = (e) => {
        const coordinate = e.nativeEvent.coordinate;
        const nearbyRoutes = findRoutesNearPoint(coordinate);
        if (nearbyRoutes.length > 1) {
            // Mostrar modal de rutas múltiples si hay más de una ruta cercana
            setSelectedRoutes(nearbyRoutes);
            setIsRoutesModalVisible(true);
        } else if (nearbyRoutes.length === 1) {
            // Mostrar modal de información si solo hay una ruta cercana
            setSelectedRoute(nearbyRoutes[0]);
            setIsInfoModalVisible(true);
        }
    };

    const handlePolylinePress = (route, event) => {  // Añadimos el parámetro event
        // Marcamos el evento para no abrir el modal de rutas
        
        const modifiedEvent = {
            ...event,
            nativeEvent: {
                ...event.nativeEvent,
                action: 'polyline-press'
            }
        };

        setSelectedRoute(route);
        setIsInfoModalVisible(true);
        return true;  // Retornamos el evento modificado si es necesario
    };

    useEffect(() => {
        const getLocationAndRoute = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Location permission denied');
                    return;
                }

                const currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(currentLocation);
            } catch (error) {
                setErrorMsg(`Error: ${error.message}`);
            }
        };

        getLocationAndRoute();
    }, []);

    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text>Map not available on web version</Text>
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
                <Text style={styles.loadingText}>Getting location and route...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 17.991,
                    longitude: -92.92,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={handleMapPress}

                showsBuildings={false}
                showsCompass={false}
                showsIndoorLevelPicker={false}
                showsIndoors={false}
                showsMyLocationButton={true}
                showsPointsOfInterest={false}
                showsScale={false}
                showsTraffic={false}
                showsUserLocation={true}
                // userInterfaceStyle="dark"
            >
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    zIndex={1}  // Asegura que esté sobre el mapa base

                />

                {routes.map((route, index) => (
                    <ClickablePolyline
                        key={index}
                        coordinates={route.coordinates}
                        strokeColor={route.strokeColor}
                        strokeWidth={6}
                        onPress={(event) => handlePolylinePress(route, event)}  // Pasamos ambos parámetros
                    />
                ))}
            </MapView>

            <ModalRoutes
                isVisible={isRoutesModalVisible}
                setVisible={setIsRoutesModalVisible}
                routes={selectedRoutes}
                onRouteSelect={(route) => {
                    setSelectedRoute(route);
                    setIsRoutesModalVisible(false);
                    setIsInfoModalVisible(true);
                }}
            />

            <ModalInformation
                isVisible={isInfoModalVisible}
                setVisible={setIsInfoModalVisible}
                image={selectedRoute?.image}
                title={selectedRoute?.name}
                distance={selectedRoute?.distance}
                duration={selectedRoute?.duration}
                stops={selectedRoute?.stops || []}
            />
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
        zIndex:-1,
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