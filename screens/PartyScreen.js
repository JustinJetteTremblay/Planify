import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import GetData from '../utils/GetData';
import * as firebase from 'firebase';
import FlatListEvent from '../components/FlatListEvent';
import PlanifyIndicator from "../components/PlanifyIndicator";
import FlatListGoogleEvents from '../components/FlatListGoogleEvents';

const PartyScreen = ({ navigation,route }) => {
    //Création de la base de données
    const [partys, setPartys] = useState([])
    const barsAndCasino = route.params.barAndCasino

    const getPartys = async () => {
        const db = firebase.firestore();
        const response = db.collection('Partys');
        const data = await response.get();
        let P = []
        data.docs.forEach(item => {
            P.push(item.data())
        })
        setPartys(P)
    }
    useEffect(() => {
        setPartys(null)
        //setIsFetching(true)
        //setFestivals(GetData('Festivals'))
        getPartys()
        //setIsFetching(false)
    }, []);

    if (partys != undefined || partys != null) {
        return (
            <View style={styles.container}>
                <FlatListGoogleEvents data={barsAndCasino.results} navigation={navigation} />
            </View>
        )
    }
    else if (partys == undefined || partys == null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} color="black" size="large" />
            </View>
        )
    }
}
export default PartyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});