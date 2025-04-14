import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

export default function ModalInformation({
    isVisible,
    setVisible,
    image,
    title = "Route Details",
    distance = "5.2 km",
    duration = "15 mins",
    stops = [], // Array of stops e.g., ["Palacio", "Parque Tomás Garrido"]
    onStartNavigation // Callback for button
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
                    <Text style={styles.modalTitle}>{title}</Text>

                    {/* Distance/Duration Row */}
                    <View style={styles.infoCard}>
                        {/* Left Side: Image */}
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: image }} // Wrap in { uri: 'URL' }
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Right Side: Information */}
                        <View style={styles.infoContainer}>
                            <View style={styles.infoRow}>
                                <Ionicons name="location" size={20} color="#2196F3" />
                                <Text style={styles.label}>Distance:</Text>
                                <Text style={styles.value}>{distance}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="time" size={20} color="#FFA000" />
                                <Text style={styles.label}>Duration:</Text>
                                <Text style={styles.value}>{duration}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Stops List */}
                    <ScrollView style={styles.stopsContainer}>
                        <Text style={styles.sectionTitle}>Stops</Text>
                        {stops.map((stop, index) => (
                            <View key={index} style={styles.stopItem}>
                                <View style={styles.stopBullet} />
                                <Text style={styles.stopText}>{stop}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={onStartNavigation}
                    >
                        <Text style={styles.actionButtonText}>Start Navigation</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
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
        backgroundColor: 'transparent',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 30,
        maxHeight: '80%', // Limit height for scroll
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    infoCard: {
        flexDirection: 'row', // Horizontal layout
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center', // Center vertically
    },
    imageContainer: {
        marginRight: 16, // Spacing between image and info
    },
    cardImage: {
        width: 80, // Fixed width
        height: 80, // Fixed height
        borderRadius: 8, // Rounded corners for the image
    },
    infoContainer: {
        flex: 1, // Takes remaining space
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },


    label: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
        marginRight: 16,
        width: 80,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 16,
    },
    stopsContainer: {
        marginBottom: 16,
        maxHeight: 150, // Scrollable area
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 12,
    },
    stopItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    stopBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2196F3',
        marginRight: 12,
    },
    stopText: {
        fontSize: 15,
        color: '#555',
    },
    actionButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    closeButton: {
        padding: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#2196F3',
        fontWeight: '600',
        fontSize: 16,
    },
});