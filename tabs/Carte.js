import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import MapView, { Callout, Circle, Polygon, Polyline } from 'react-native-maps';
import Header from '../components/Header';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const API_KEY = "AIzaSyCEY83Y-5Rehs-Ha-2Vklocapm72B1B43M"
let initialRegion = {
    longitude: -122.4324,
    latitude: 37.78825,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}

const carte = ({ route, navigation }) => {

    const [pin, setPin] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324
    })

    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324
    })

    let évènement = route.params

    if (évènement != undefined || évènement != null) {
        let latitudeEvent = évènement.latitude
        let longitudeEvent = évènement.longitude
        let nom = évènement.nom
        let page = évènement.page

        initialRegion.latitude = latitudeEvent
        initialRegion.longitude = longitudeEvent
        const erase = () =>
            évènement = null
        latitudeEvent = null
        longitudeEvent = null
        nom = null
        page = null
        return (
            <View style={{marginTop: 50, flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery = {{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: "AIzaSyBkV0GM6VbShMxLLswTH51otjdO1azKWVg",
                        language: 'en',
                        components: "country:ca",
                        types: "establishment",
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: {flex : 0, position: "absolute", width: "100%",zIndex: 1},
                        listView: {backgroundColor: "white"}
                    }}
                />
                <Header title="carte" />
                <Button title={'⬅️ Retour à ' + nom} à onPress={() => { navigation.navigate(page); erase() }} />
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    provider="google">
                    <MapView.Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} draggable
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}>
                        <Callout>
                            <Text>I'm here</Text>
                        </Callout>
                    </MapView.Marker>
                </MapView>

            </View>
        )
    }
    else if (évènement == undefined || évènement == null) {
        return (
            <View style={{ marginTop: 50, flex: 1 }}>
                 <GooglePlacesAutocomplete
                    fetchDetails={true}
                    placeholder='Search'
                    GooglePlacesDetailsQuery={{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: "AIzaSyBkV0GM6VbShMxLLswTH51otjdO1azKWVg",
                        language: 'en',
                        components: "country:us",
                        types: "establishment",
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: {flex : 0, position: "absolute", width: "100%",zIndex: 1},
                        listView: {backgroundColor: "white"}
                    }}
                />
                <Header title="carte" />
                <MapView
                    style={styles.mapStyle}
                    initialRegion={initialRegion}
                    provider="google">
                    <MapView.Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} draggable
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}>
                        <Callout>
                            <Text>I'm here</Text>
                        </Callout>
                    </MapView.Marker>
                    <Circle center={pin} radius={1000}>

                    </Circle>
                </MapView>
            </View>
        )

    }
}

export default carte;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});