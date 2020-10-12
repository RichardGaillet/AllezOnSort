import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper';

import { lessThanTen } from '../config/format'
import activities from '../mocks/activities'

export default function ActivitiesScreen({ navigation }) {

    const activitiesSorted = activities
        .sort((a, b) => {
            if (a.timestamp === b.timestamp) {
                return a.id - b.id;
            }
            return a.timestamp > b.timestamp ? 1 : -1;
        })

    const ActivitiesArray = () => {
        return (
            activitiesSorted
                .map((activity, key) => {
                    const { organizer, places, registeredList, timestamp, title } = activity
                    const formatRegistered = lessThanTen(registeredList.length)
                    const formatPlaces = lessThanTen(places)
                    return (
                        <DataTable.Row key={key} onPress={() => navigation.push('Activity', { activity })
                        }>
                            <DataTable.Cell>{timestamp}</DataTable.Cell>
                            <DataTable.Cell>{title}</DataTable.Cell>
                            <DataTable.Cell>{formatRegistered} / {formatPlaces}</DataTable.Cell>
                            <DataTable.Cell>{organizer}</DataTable.Cell>
                        </DataTable.Row >
                    )
                })
        )
    }

    return (
        <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Type</DataTable.Title>
                    <DataTable.Title>Inscrits</DataTable.Title>
                    <DataTable.Title>Organisateur</DataTable.Title>
                </DataTable.Header>

                {ActivitiesArray()}

            </DataTable>
        </ScrollView>
    )
}