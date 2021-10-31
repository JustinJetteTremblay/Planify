import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, TouchableOpacity, Button } from 'react-native';
import FlastListEvent from "../components/FlatListEvent";
import * as firebase from 'firebase';


const forum = ({ navigation }) => {
  const [ajouts, setAjouts] = useState([])

  const getAjouts = async () => {
    const db = firebase.firestore();
    const response = db.collection('Ajouts');
    const data = await response.get();
    let R = []
    data.docs.forEach(item => {
      R.push(item.data())
    })
    setAjouts(R)
  }
  const deleteEventById = async (id) =>{
    await firebase.firestore().collection("Ajouts").doc(id).delete();

    console.log(id)

    return id;
  }
  function editEvent(titre,description,user) {
    const db = firebase.firestore();
    return db.collection('Ajouts').doc('Un nouvel evenement').set({
        Description:description,
        nom: titre,
        Date: new Date(),
        user: user.uid
    })
}

  useEffect(() => {
    setAjouts(null)
    //setFestivals(GetData('Festivals'))
    getAjouts()
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#5cdb95" }}>
      <View style={{
        backgroundColor: "#5cdb95", height: "7%", borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, paddingHorizontal: 20
      }}>
        <Image
          source={require('../assets/1.png')}
          style={{
            height: 10,
            width: 20,
            marginTop: 50
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, width: "100%" }}>
          {/* Texte d'accueil du forum */}
          <View style={{ width: "50%", backgroundColor: "#5cdb95" }}>
            <Text style={{
              fontSize: 28,
              color: "#edf5e1",
              fontWeight: "bold"
            }}>
              Bienvenue sur le forum de Planify
            </Text>
          </View>
          {/* Image */}
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <Image
              source={require('../assets/CalendarV3.png')}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>

        {/* Bouton pour ajouter un évènement */}
        {/* <TouchableOpacity style={styles.bouton}
          onPress={() => navigation.navigate("AddEventScreen")}>
          <Text>Ajouter un évènement</Text>
        </TouchableOpacity> */}

        {/* Liste de tout les ajouts */}
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <FlastListEvent data={ajouts} navigation={navigation} nomPage="Forum" />
        </View>
      </View>
      <Button title="Ajouter un event" onPress={() => navigation.navigate("AddEventScreen")}></Button>
      <Button title="Edit un event" onPress={() => navigation.navigate("EditEventScreen")}></Button>
      
      <TouchableOpacity style={styles.boutonDelete} onPress={()=> deleteEventById("test")}>
              <Text>🗑️</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bouton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    color: 'white'
  }
});