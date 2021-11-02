import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView, TouchableNativeFeedback } from 'react-native';
import * as firebase from 'firebase';

import EventButton from './EventButton';

const deleteEventById = async (id) => {
    await firebase.firestore().collection("Ajouts").doc(id).delete();

    console.log(id)

    return id;
}
function editEvent(id,titre,description,user) {
    const db = firebase.firestore();
    return db.collection('Ajouts').doc(id).set({
        Description:description,
        nom: titre,
        Date: new Date(),
        user: user.uid
    })
}

const Event = ({ item, navigation, nomPage }) => {
    /*--variables--*/
    let localisation = ""
    let description = ""

    console.log("ALLO")

    if (item.localisation != null || item.localisation != undefined)
        localisation = item.localisation
    if (item.Description != null || item.Description != undefined)
        description = item.Description

    return (
        <ScrollView style={styles.item}>
            <View style={{ flexDirection: 'column', zIndex: 1 }}>
                {/* titre */}
                <View style={{ flexDirection: 'row', zIndex: 1 }}>
                    <Text style={styles.titre}>{item.nom}</Text>
                    {/* Bouton pour lenlever' */}
                    <TouchableOpacity style={styles.boutonDelete} onPress={() => deleteEventById(item.nom)} >
                        <Text>🗑️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boutonEdit}  onPress={() => navigation.navigate("EditEventScreen", {id: item.nom})}>
                        <Text>✎</Text>
                    </TouchableOpacity>
                </View>
                {/* description */}
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        {description}
                    </Text>
                </View>
                <EventButton navigation={navigation} item={item} nomPage={nomPage} />
            </View>
        </ScrollView>
    )
}

const FlatListEvent = ({ data, navigation, nomPage }) => {
    const D = data
    console.log(data)
    if (D != null || D != undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.liste}>
                    <FlatList
                        data={D}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Event item={item} navigation={navigation} nomPage={nomPage} />
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }
    else if (data == null || data == undefined) {
        return (
            <View style={styles.container}>
                <Text>AUCUNS ÉVÈNEMENTS TROUVÉS</Text>
            </View>
        )
    }
}

export default FlatListEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    liste: {
        flexDirection: "column",
    },
    titre: {
        fontSize: 35
    },
    item: {
        borderColor: 'black',
        margin: '5%',
        flexDirection: 'row',
    },
    boutonDelete: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 45,
        color: 'white',
        alignItems: 'center'
    },
    boutonEdit: {
        backgroundColor: "yellow",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 45,
        color: 'white',
        alignItems: 'center'
    }
})