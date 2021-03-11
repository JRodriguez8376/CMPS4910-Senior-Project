
import * as React from 'react';
import MapView from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import styles from './styles/hotspotScreen.style'

const HotspotScreen = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );

}
export default HotspotScreen;

