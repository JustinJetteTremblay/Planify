import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import Header from '../components/Header';
import EventButton from '../components/EventButton';
import PlanifyIndicator from '../components/PlanifyIndicator';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LogBox } from 'react-native';
import * as firebase from 'firebase';

LogBox.ignoreLogs(['Setting a timer']);


const calendrier = ({ route, navigation }) => {

  /*-------------------constantes et variables-----------------*/
  const day = new Date().getDay()
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const présent = new Date().toLocaleDateString()

  const [events, setEvents] = useState(null)
  const db = firebase.firestore();

  /*-------------------FONCTIONS-------------------*/
  const timeToString = (time) => {
    const d = new Date(time);
    return d.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!events[strTime]) {
          events[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            events[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(events).forEach((key) => {
        newItems[key] = events[key];
      });
      setEvents(newItems);
    }, 1000);
  };

  function addEventInCalendar(event) {
    console.log("Ajouté dans le calendrier", event)

    try {
      return db.collection('Calendrier').add({
        event: event,
        day: (event.Date.toDate().getDay()),
        year: (event.Date.toDate().getFullYear()),
        month: (event.Date.toDate().getMonth())
      })
    } catch (e) {
      console.log("ERREUR DANS L'AJOUT D'UN EVENT DANS LE CALENDRIER:", e)
    }
  }

  const getEventsFromCalendar = async () => {
    const response = db.collection('Calendrier');
    const data = await response.get();
    let tab = []

    data.docs.forEach(item => {
      tab.push(item.data())
    })

    setEvents(tab)
  }


  useEffect(() => {
    getEventsFromCalendar();
  }, []);

  /*----------------AFFICHAGE------------------*/
  if (route.params != undefined) {
    const event = route.params.event
    const page = route.params.page

    if (events == undefined)
      return (<PlanifyIndicator />)
    else {
      console.log(events)
      return (
        <Agenda
          //items={events}
          items={{ '2021-11-10': [{ name: event.nom }] }}
          
          loadItemsForMonth={loadItems}

          markedDate={events}
          onCalendarToggled={(calendarOpened) => { console.log("calendar:", calendarOpened) }}
          // Callback that gets called on day press
          onDayPress={(day) => { console.log(day, ' pressed') }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day) => { console.log(day, ' changed') }}
          rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
          refreshing={true}
          renderItem={() => {
            return (
              <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'column' }}>

                  {/* titre */}
                  <Text style={styles.titre}>{event.nom}</Text>

                  {/* description */}
                  <View style={{ flexDirection: 'row' }}>
                    <Text>
                      {event.description}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <EventButton navigation={navigation} item={event} nomPage={page} /> */}
                    <TouchableOpacity onPress={() => addEventInCalendar(event)}>
                      <Text>Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )
          }}
        />
      )
    }
  }
  // avec tout les évènements déjà ajouté auparavant
  else if (route.params == undefined)
    return (
      // <SafeAreaView>
      //   <Header title={`${new Date().toLocaleDateString()}`} />
      <Agenda />
      // </SafeAreaView>
    )
}

export default calendrier;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  liste: {
    flexDirection: "column",
    backgroundColor: '#dcdcdc'
  },
  titre: {
    fontSize: 35
  },
  item: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 5,
    margin: '5%',
    flexDirection: 'column'
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
