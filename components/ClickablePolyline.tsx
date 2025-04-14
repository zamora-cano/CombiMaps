import React from 'react';
import { Polyline, Polygon } from 'react-native-maps';

export default function ClickablePolyline({
    coordinates,
    strokeColor = "#0000FF",
    strokeWidth = 6,
    onPress,
}) {
    // Create a buffer polygon that surrounds the polyline
    const polygonCoords = createBufferAroundPolyline(coordinates, 0.00015);

    return (
        <>
            {/* Visible Polyline */}
            <Polyline
                coordinates={coordinates}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                onPress={onPress}
                tappable={false}
            />

            {/* Invisible Clickable Polygon that surrounds the polyline */}
            <Polygon
                coordinates={polygonCoords}
                fillColor="rgba(0,0,0,0.01)" // Nearly transparent
                strokeColor="rgba(0,0,0,0)" // Fully transparent
            />
        </>
    );
};

// Creates a polygon that surrounds the polyline with a buffer
function createBufferAroundPolyline(coordinates, bufferDistance) {
    if (coordinates.length < 2) return coordinates;

    const bufferedCoords = [];

    // Add points above and below each segment
    for (let i = 0; i < coordinates.length - 1; i++) {
        const start = coordinates[i];
        const end = coordinates[i + 1];

        // Calculate perpendicular vector
        const dx = end.longitude - start.longitude;
        const dy = end.latitude - start.latitude;
        const length = Math.sqrt(dx * dx + dy * dy);

        // Normalize and rotate 90 degrees to get perpendicular vector
        const perpX = -dy / length * bufferDistance;
        const perpY = dx / length * bufferDistance;

        // Add points on both sides of the segment
        bufferedCoords.push({
            latitude: start.latitude + perpY,
            longitude: start.longitude + perpX
        });
    }

    // Now go backwards to close the polygon
    for (let i = coordinates.length - 1; i > 0; i--) {
        const start = coordinates[i];
        const end = coordinates[i - 1];

        const dx = end.longitude - start.longitude;
        const dy = end.latitude - start.latitude;
        const length = Math.sqrt(dx * dx + dy * dy);

        const perpX = -dy / length * bufferDistance;
        const perpY = dx / length * bufferDistance;

        bufferedCoords.push({
            latitude: start.latitude + perpY,
            longitude: start.longitude + perpX
        });
    }

    // Close the polygon if needed
    if (bufferedCoords.length > 0) {
        bufferedCoords.push(bufferedCoords[0]);
    }

    return bufferedCoords;
}