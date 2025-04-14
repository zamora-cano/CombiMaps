import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalRoutes({
    isVisible,
    setVisible,
    routes = [], // Array de rutas cercanas
    onRouteSelect // Callback cuando seleccionan una ruta
}) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Title */}
                    <Text style={styles.modalTitle}>Rutas disponibles</Text>
                    
                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Routes List */}
                    <ScrollView style={styles.routesContainer}>
                        {routes.map((route, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.routeCard}
                                onPress={() => onRouteSelect(route)}
                            >
                                {/* Route Image */}
                                <Image
                                    source={{ uri: route.image }}
                                    style={styles.routeImage}
                                    resizeMode="cover"
                                />
                                
                                {/* Route Info */}
                                <View style={styles.routeInfo}>
                                    <Text style={styles.routeName}>{route.name}</Text>
                                    
                                    <View style={styles.infoRow}>
                                        <Ionicons name="location" size={16} color="#2196F3" />
                                        <Text style={styles.routeDetail}>{route.distance}</Text>
                                    </View>
                                    
                                    <View style={styles.infoRow}>
                                        <Ionicons name="time" size={16} color="#FFA000" />
                                        <Text style={styles.routeDetail}>{route.duration}</Text>
                                    </View>
                                    
                                    <View style={styles.stopsPreview}>
                                        {route.stops.slice(0, 2).map((stop, i) => (
                                            <Text key={i} style={styles.stopText}>• {stop}</Text>
                                        ))}
                                        {route.stops.length > 2 && (
                                            <Text style={styles.moreStops}>+{route.stops.length - 2} más</Text>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginBottom: 16,
    },
    routesContainer: {
        marginBottom: 16,
    },
    routeCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    routeImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    routeInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    routeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    routeDetail: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    stopsPreview: {
        marginTop: 6,
    },
    stopText: {
        fontSize: 13,
        color: '#555',
    },
    moreStops: {
        fontSize: 12,
        color: '#2196F3',
        marginTop: 2,
    },
    closeButton: {
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    closeButtonText: {
        color: '#2196F3',
        fontWeight: '600',
        fontSize: 16,
    },
});