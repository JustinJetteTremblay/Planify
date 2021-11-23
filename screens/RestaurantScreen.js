import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import EventButton from '../components/EventButton';
import Event from '../components/Event';
import FlatListEvent from '../components/FlatListEvent';
import PlanifyIndicator from "../components/PlanifyIndicator"
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';

const RestaurantScreen = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([])

  //   let initialRegion = {
  //     longitude: -73.8423519855052,
  //     latitude: 45.642249982790126,
  //     latitudeDelta: 0.05,
  //     longitudeDelta: 0.05
  // }

  const resto = route.params.resto

  //const resto = FetchNearestRestaurantFromGoogle(initialRegion)

  /*--aller chercher tout les festivals--*/
  const getRestaurants = async () => {
    const db = firebase.firestore();
    const response = db.collection('Restaurants');
    const data = await response.get();

    let R = []
    data.docs.forEach(item => {
      R.push(item.data())
    })
    setRestaurants(R)
  }

  useEffect(() => {
    setRestaurants(null)
    getRestaurants()
  }, []);

  if (restaurants != null || restaurants != undefined) {
    return (
      <View style={styles.container}>
        <FlatListGoogleEvents data={resto.results} navigation={navigation} />
      </View>)
  }
  else if (route.params != null) {
    //console.log("resto:",route.params.event)
    //const resto = route.params.event
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="black" size="large" />
      </View>
    )
  }
  else if (restaurants == null || restaurants == undefined) {
    return (<ActivityIndicator animating={true} color="black" size="large" />
    )
  }
}

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});