
import React, { useState, useEffect } from 'react';
import styles from './styles/hotspotScreen.style';
import Geolocation from '@react-native-community/geolocation';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Alert,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import MapView from "react-native-map-clustering";
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';
///*
import { 
    PROVIDER_GOOGLE, 
    AnimatedRegion, 
    Circle, 
    Marker,
} from 'react-native-maps'
//*/
/*
import MapView, { 
    PROVIDER_GOOGLE, 
    AnimatedRegion, 
    Circle, 
    Marker,
} from 'react-native-maps'
*/

var CURRENT_LONG = null
var CURRENT_LAT = null
var CSUB_LATITUDE = 35.348663592499065
var CSUB_LONGITUDE = -119.10334504077304
const CURR_LAT1 = 35.35032
const CURR_LONG1 = -119.12720333333333

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
    Geolocation.getCurrentPosition(
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
                <Circle
                    key={index}
                    center = {zone.midpoint}
                    radius = {50}
                    strokeWidth = { 1 }
                    strokeColor = { '#ff0000' }
                    fillColor = { 'rgba(230,10,10,0.5)' }
                >
                    
                </Circle>
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
                >
                    {/*
                    <View style={styles.markerRadius}>

                    </View>
                    */}
                </Marker>
            ))
            }
        </View>
        
    );
};


const GetMap = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [curr_lat, setLat] = useState(0.0)
    const [curr_long, setLong] = useState(0.0)
    const [GPSList, setGPSList] = useState([])
    const [zoomLvl, setZoom] = useState(true);
    //*
    const [region, setRegion] = useState({
        latitude: CSUB_LATITUDE,
        longitude: CSUB_LONGITUDE,
        latitudeDelta: 1.05422,
        longitudeDelta: 1.055121,
    });
    //*/
    //*
    const [latDelta, setDelta] = useState(0.005)
    //*/
    var curr_latitude = CSUB_LATITUDE
    var curr_longitude = CSUB_LONGITUDE
    
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                //const location = (position);
                //console.log(location)
                curr_latitude = position.coords.latitude
                curr_longitude = position.coords.longitude
                setLat(curr_latitude)
                setLong(curr_longitude)
                //console.log("Current Longitude1: ", position.coords.longitude)
                //console.log("Current Latitude1: ", position.coords.latitude)
                //console.log("Current Longitude: ", curr_longitude)
                //console.log("Current Latitude: ", curr_latitude)
                retrieveUnsecured('token')
                .then(result => {
                    //console.log("Current Longitude2: ", curr_longitude)
                    //console.log("Current Latitude2: ", curr_latitude)
                    getPostAPIData('/api/hotspot/locations', { "latitude": curr_latitude, "longitude": curr_longitude}, result)
                        //If completed, setData to screen and take off loading screen
                        .then(result => setGPSList(result))
                        .then(() => setLoading(false))
                        .catch(error => {
                            console.error(error);
                        });
                })
                .catch(error => {
                    console.error(error);
                });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        //CSUB_LATITUDE = curr_lat
        //CSUB_LONGITUDE = curr_long
    }, []);
    useEffect(() => {
        //console.log("Current latitudeDelta: ", region.latitudeDelta)
        //console.log("Current longitudeDelta: ", region.longitudeDelta)
        if (region.latitudeDelta >= 0.02 && region.longitudeDelta >= 0.02) {
            setZoom(false)
        }
        else {
            setZoom(true)
        }
    });
    
    if (zoomLvl == true) {
        return (
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <MapView
                        style={styles.map}
                        showsUserLocation ={true}
                        showsMyLocationButton={true}
                        provider={PROVIDER_GOOGLE}
                        showsScale={true}
                        followsUserLocation={false}

                        clusterColor={'#FF0000'}
                        ///*
                        //region={region}
                        //onRegionChangeComplete={region => setRegion(region)}
                        initialRegion={{
                            latitude: curr_lat,
                            longitude: curr_long,
                            latitudeDelta: 0.10,
                            longitudeDelta: 0.10,
                        }}
                        //onUserLocationChange = {location => alert(location.latitude)}
                        onRegionChangeComplete={region => setRegion(region)}
                        >
                        {
                            GPSList.map((zone, index) => (
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
                    </MapView>
                )}
            </View>
        )
    }
    //THIS IS THE DEBUG WALL IF ITS NOT HERE IT WAS PROBABLY HERE AT ONE POINT
    //console.log("Current Longitude: ", curr_long)
    //console.log("Current Latitude:  ", curr_lat)
    //console.log("Current Longitude1: ", curr_longitude)
    //console.log("Current Latitude1:  ", curr_latitude)

    //console.log("Current Latitude: %f", CURRENT_LAT)
    //console.log(`Current GPSList: ${GPSList}`)
    console.log("GPSList: ", JSON.stringify(GPSList))
    //console.log("Current ZoomLvl: ", zoomLvl)
    //console.log("Current latitudeDelta: ", region.latitudeDelta)
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <MapView
                    style={styles.map}
                    showsUserLocation ={true}
                    showsMyLocationButton={true}
                    provider={PROVIDER_GOOGLE}
                    showsScale={true}
                    followsUserLocation={false}

                    clusterColor={'#FF0000'}
                    ///*
                    //region={region}
                    //onRegionChangeComplete={region => setRegion(region)}
                    initialRegion={{
                        latitude: curr_lat,
                        longitude: curr_long,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.10,
                    }}
                    //onUserLocationChange = {location => alert(location.latitude)}
                    onRegionChangeComplete={region => setRegion(region)}
                    //*/
                    //*
                    
                    /*/
                    /*
                    camera={{
                        center: {
                            latitude: curr_lat,
                            longitude: curr_long,
                        },
                        zoom: 10,
                    }}
                    */
                    >
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
                    {
                        GPSList.map((zone, index) => (
                            <Marker
                                pinColor={"#FF0000"}
                                //image={require("../assets/images/VirusPin.png")}
                                key={index}
                                coordinate={{
                                    latitude: zone.midpoint.latitude,
                                    longitude: zone.midpoint.longitude,
                                }}
                            >
                                {/*
                                <View style={styles.markerRadius}>

                                </View>
                                */}
                            </Marker>
                            ))
                    }
                    {/*<DisplayHotspots/>*/}
                    {
                        GPSList.map((zone, index) => (
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
                    {/*
                    <MapView.Circle
                        center = { zones.[0].midpoint }
                        radius = { 50 }
                        strokeWidth = { 1 }
                        strokeColor = { '#ff0000' }
                        fillColor = { 'rgba(230,10,10,0.5)' }
                    />
                    */}
                </MapView>
            )}
        </View>
        
    )
}

const HotspotScreen = () => {
    const [statusBar, setStatusBar] = useState({
        animated: true,
        backgroundColor: '#ff000000',
        translucent: false,
        barStyle: "light-content", 
    });
    const animated = true
    const backgroundColor = '#ff0000'
    const translucent = false
    const barStyle = "light-content"
    //StatusBar.setBackgroundColor('#ff00ff00', true)
    //setStatusBarColor('#ff00ff00')

    return (
        ///*
        <>
            <GetMap name="first" />
            <StatusBar
                animated={animated}
                backgroundColor={backgroundColor}
                translucent={translucent}
                barStyle={barStyle}
            />
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

