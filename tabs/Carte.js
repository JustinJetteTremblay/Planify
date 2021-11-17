import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import MapView, { Callout, Circle, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../components/Header';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const API_KEY = "AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U"

const carte = ({ route, navigation }) => {

    let initialRegion = {
        longitude: -73.8423519855052,
        latitude: 45.642249982790126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    }

    let évènement = null
    let latitudeEvent = initialRegion.latitude
    let longitudeEvent = initialRegion.longitude
    let nom = ""
    let page = "HomeScreen"

    let nearestRestaurant = FetchNearestRestaurantFromGoogle(initialRegion);

    if (route.params != undefined) {
        évènement = route.params
        if (route.params.latitude != undefined || route.params.longitude != undefined) {
            latitudeEvent = route.params.latitude
            longitudeEvent = route.params.longitude
        }
        if (route.params.nom != undefined)
            nom = route.params.nom
        if (route.params.page != undefined)
            page = route.params.page
    }
    const [pin, setPin] = useState({ latitude: 45.642249982790126, longitude: -73.8423519855052 })
    const [region, setRegion] = useState({ latitude: 45.642249982790126, longitude: -73.8423519855052 })

    const location = useGeoLocation();
    // const [distancePoint,setDistancePoint] = useState({ distance: )

    //si le user a cliqué sur "Trouver sur la carte"
    if (évènement != undefined || évènement != null) {
        initialRegion.latitude = latitudeEvent
        initialRegion.longitude = longitudeEvent
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => {
                        évènement = null
                        navigation.navigate(page);
                    }}
                        style={styles.boutonRetour}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            Retourner à {nom}
                        </Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    provider="google">
                    <MapView.Marker 
                        coordinate={{ latitude: latitudeEvent, longitude: longitudeEvent }}
                        onPress={()=>console.log("marqueur cliqué")}
                     />
                </MapView>
            </View>
        )

    }
    else if (évènement == undefined || évènement == null) {
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data, details);
                        //console.log(data)
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        })
                        initialRegion.latitude = region.latitude
                        initialRegion.longitude = region.longitude
                        //console.log(nearestRestaurant);
                        //console.log(location.loaded ? JSON.stringify(location): "Location data not available yet")
                        //console.log(location)
                    }}
                    query={{
                        key: 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U',
                        language: 'en',
                        types: 'establishment',
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                        listView: { backgroundColor: "white" }
                    }}
                />
                <MapView
                    style={styles.mapStyle}
                    region={region}
                    showsUserLocation={true}
                    provider='google'>
                    <MapView.Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                        onPress={() => {
                            //console.log("marqueur cliqué",nearestRestaurant)
                            navigation.navigate("RestaurantScreen",{event:nearestRestaurant})
                        }}
                    />
                    <MapView.Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} 
                        onPress={() => console.log("marqueur cliqué")}
                    >
                    </MapView.Marker>
                    <Polyline coordinates={[
                        { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
                        { latitude: region.latitude, longitude: region.longitude }
                    ]} />
                </MapView>
            </View>
        )
    }
}

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }
    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    }

    useEffect(() => {

        if (!('geolocation' in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

    return location
}

/*
modèle: 

FetchNearestFromGoogle(navigation, 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&type=restaurant'+ '&key=' + 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U')

const FetchNearestRestaurantFromGoogle = ({navigation,url}) => {

    const [data, setData] = useState(null);

    const latitude = location.latitude; // you can update it with user's latitude & Longitude
    const longitude = location.longitude;
    let radMetter = 2 * 1000; // Search withing 2 KM radius

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&type=restaurant'+ '&key=' + 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U'

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(url);
            const data = await resp.json();
            setData(data)
        }
        fetchData()
    }, [])

    return data;
}*/

const FetchNearestRestaurantFromGoogle = (location) => {

    const [data, setData] = useState(null);

    const latitude = location.latitude; // you can update it with user's latitude & Longitude
    const longitude = location.longitude;
    let radMetter = 2 * 1000; // Search withing 2 KM radius

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&type=restaurant' + '&key=' + 'AIzaSyA4BtUvJDZEH-CFXNFbjNO-bI5He2Zlm3U'

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(url);
            const data = await resp.json();
            setData(data)
        }
        fetchData()
    }, [])

    return data;
}

export default carte;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    boutonRetour: {
        backgroundColor: "#00a46c",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        color: 'white',
        alignContent: 'center'
    },
    boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
    },
});