
import React, { useState, useEffect } from 'react';
import styles from './styles/hotspotScreen.style'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Alert,
} from 'react-native';
import MapView, { 
    PROVIDER_GOOGLE, 
    AnimatedRegion, 
    Circle, 
    Marker,
} from 'react-native-maps'

var CURRENT_aLONG = null
var CURRENT_LAT = null
const CSUB_LATITUDE = 35.348663592499065
const CSUB_LONGITUDE = -110.10334504077304

//Will probably need to get Google Maps API key when exporting out.
///*
var zones = [
    {
        midpoint: { latitude: 35.351088000000004, longitude: -119.127028 },
        radius: 8.483078140256435,
        density: 1
    },
    {
        midpoint: { latitude: 35.350198500000005, longitude: -119.101993 },
        radius: 3.3,
        density: 2
    },
    {
        midpoint: { latitude: 35.34909, longitude: -119.116793 },
        radius: 3.3,
        density: 2
    },
    {
        midpoint: { latitude: 35.369432, longitude: -119.026122 },
        radius: 3.3,
        density: 2
    },
    {
        midpoint: { latitude: 35.343078, longitude: -119.055861 },
        radius: 3.3,
        density: 2
    }
]

const FindCoordinates = () => {
    const [data, setData] = useState([]);
    const location = null
    navigator.geolocation.getCurrentPosition(
        position => {
            let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 5,
                longitudeDelta: 5,
            };
            print(region)
            const location = (position);
            console.log(location)
            CURRENT_LONG = location.coords.longitude
            //CURRENT_LAT = location.coords.latitude
            //console.log("Current Longitude: %f", location.coords.longitude)
            //console.log("Current Latitude: %f", location.coords.latitude)
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        
        
    );
    console.log(location)
    return location
};

const DisplayHotspots = (props) => {

    return (
        <View>
            {
            zones.map((zone, index) => (
                <MapView.Circle
                    key={index}
                    center = {zone.midpoint}
                    radius = {50}
                    strokeWidth = { 1 }
                    strokeColor = { '#ff0000' }
                    fillColor = { 'rgba(230,10,10,0.5)' }
                >
                    
                </MapView.Circle>
            ))
            }
            {
            zones.map((zone, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: zone.midpoint.latitude,
                        longitude: zone.midpoint.longitude,
                    }}
                />
            ))
            }
        </View>
        
    );
};


const GetMap = (props) => {
    //console.log(FindCoordinates())
    const [curr_longitude, setLong] = useState(0)
    const [curr_latitude, setLat] = useState(0)
    navigator.geolocation.getCurrentPosition(
        position => {
            //const location = (position);
            //console.log(location)
            setLong(position.coords.longitude)
            setLat(position.coords.latitude)
            //CURRENT_LONG = location.coords.longitude
            //CURRENT_LAT = location.coords.latitude
            //console.log("Current Longitude: %f", location.coords.longitude)
            //console.log("Current Latitude: %f", location.coords.latitude)
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        
        
    );

    //console.log("Current Longitude: %f", curr_longitude)
    //console.log("Current Latitude: %f", curr_latitude)

    //console.log("Current Latitude: %f", CURRENT_LAT)
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation = { true }
                provider={PROVIDER_GOOGLE}
                showsScale = {true}
                followsUserLocation = {true}
                initialRegion={{
                    latitude: CSUB_LATITUDE,
                    longitude: CSUB_LONGITUDE,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0121,
                }}
                region={{
                    latitude: curr_latitude,
                    longitude: curr_longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                {/*
                <MapView.Marker
                coordinate={{
                    latitude: curr_latitude,
                    longitude: curr_longitude,
                }}
                >
                    <View style={styles.userRadius}>
                        <View style={styles.userMarker}/>
                    </View>
                </MapView.Marker>
                */}
                <DisplayHotspots/>
                {
                    zones.map((zone, index) => (
                        <Circle
                        key={index}
                            center = {zone.midpoint}
                            radius = {50}
                            strokeWidth = { 1 }
                            strokeColor = { '#ff0000' }
                            fillColor = { 'rgba(230,10,10,0.5)' }
                        />
                    ))
                }
                <MapView.Circle
                    center = { zones.[0].midpoint }
                    radius = { 50 }
                    strokeWidth = { 1 }
                    strokeColor = { '#ff0000' }
                    fillColor = { 'rgba(230,10,10,0.5)' }
                />
            </MapView>
        </View>
        
    )
}

const HotspotScreen = () => {


    return (
        <>
            <GetMap name="first" />
        </>
        /*
        <View style={styles.container}>
            
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: CSUB_LATITUDE,
                    longitude: CSUB_LONGITUDE,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0121,
                }}
            />
            
            
            <Button
                onPress={() => Alert.alert('Simple Button pressed')}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
        */
    );

}
export default HotspotScreen;

