import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable, Modal, Portal, Provider } from 'react-native-paper';

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
                    return (
                        <DataTable.Row>
                            <DataTable.Cell>{activity.timestamp}</DataTable.Cell>
                            <DataTable.Cell>{activity.title}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                                {
                                    activity.registered > 9 ?
                                        activity.registered :
                                        `0${activity.registered}`
                                } / {
                                    activity.places > 9 ?
                                        activity.places :
                                        `0${activity.places}`
                                }</DataTable.Cell>
                            <DataTable.Cell>{activity.organizer}</DataTable.Cell>
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