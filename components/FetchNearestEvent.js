import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import MapView, { Callout, Circle, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../components/Header';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
}

export default FetchNearestRestaurantFromGoogle;

const styles = StyleSheet.create({
})