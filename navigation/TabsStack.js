import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import calendrier from '../tabs/Calendrier';
import carte from '../tabs/Carte';
import forum from '../tabs/Forum';
import profil from '../tabs/Profil';
import addEvent from '../tabs/addEvent';

/*--TABS--*/
const Tab = createBottomTabNavigator();

const TabsStack = () => {
    return (
        <Tab.Navigator styles={styles.container}>
            <Tab.Screen name="Calendrier" component={calendrier} />
            <Tab.Screen name="Forum" component={forum} />
            <Tab.Screen name="Carte" component={carte} />
            <Tab.Screen name="Profil" component={profil} />
            <Tab.Screen name="addEvent" component={addEvent} />
        </Tab.Navigator>
    )
}

export default TabsStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
