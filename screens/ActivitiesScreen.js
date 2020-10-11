import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable, Modal, Portal, Provider } from 'react-native-paper';

import { lessThanTen, lessThanten } from '../config/format'

export default function ActivitiesScreen() {

    const activities = [
        { id: '1', timestamp: 1602412200, title: 'Marche', registered: '4', places: '4', organizer: 'Nickos' },
        { id: '2', timestamp: 1602483200, title: 'Course à pied', registered: '10', places: '12', organizer: 'FBInet59' },
        { id: '3', timestamp: 1602412200, title: 'Jeux de société', registered: '2', places: '6', organizer: 'Arlen' },
    ]

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
                    const { organizer, places, registered, timestamp, title } = activity
                    const formatRegistered = lessThanTen(registered)
                    const formatPlaces = lessThanTen(places)
                    return (
                        <DataTable.Row>
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
                    <DataTable.Title>Sortie</DataTable.Title>
                    <DataTable.Title>Inscrits</DataTable.Title>
                    <DataTable.Title>Organiateur</DataTable.Title>
                </DataTable.Header>

                {ActivitiesArray()}

            </DataTable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cell: {
        color: 'red',
        textAlign: 'center'
    }
})