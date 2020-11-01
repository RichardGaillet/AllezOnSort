import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { ActivityIndicator, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import { lessThanTen } from '../config/format'
import colors from '../config/colors';

import * as firebase from 'firebase';

export default function ActivitiesScreen({ navigation }) {

    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase
            .database()
            .ref("activities")
            .orderByChild('timestamp')
            .startAt(startOfDay())
            .once("value")
            .then(snapshot => {
                setActivities(Object.values(snapshot.val()))
                setLoading(false)
            })
            .catch(() => {
                setActivities(null)
                setLoading(false)
            })
    }, [])

    const futureActivitiesArray = () => {
        return (
            activities
                ?.map((activity, key) => {
                    const { location, organizer, places, registeredList, registeredWaitingList, timestamp, title } = activity
                    const numberOfRegistered = registeredWaitingList ?
                        lessThanTen((registeredList?.length + registeredWaitingList?.length) || 0) :
                        lessThanTen(registeredList?.length || 0)
                    const formatPlaces = lessThanTen(places)
                    return (
                        <TouchableHighlight
                            key={key}
                            onPress={() => navigation.push('Activity', { activity })}
                        >
                            <View style={styles.activityButton}>
                                <DataTable.Row
                                    style={styles.dataTableRow}
                                >
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{moment(timestamp).format('ddd DD MMM')}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{moment(timestamp).format('LT')}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{formatRegistered} / {formatPlaces}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row >
                                <DataTable.Row
                                    style={styles.dataTableRow}
                                >
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{organizer}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{title}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{location}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row >
                            </View>
                        </TouchableHighlight>
                    )
                })
        )
    }

    return (
        <Provider>
            <Portal>
                <DataTable>
                    <DataTable.Header style={styles.dataTableHeader}>
                        <DataTable.Title style={styles.dataTableTitle}>Date</DataTable.Title>
                        <DataTable.Title style={styles.dataTableTitle}>Heure</DataTable.Title>
                        <DataTable.Title style={styles.dataTableTitle}>Inscrits</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Header style={styles.dataTableHeader}>
                        <DataTable.Title style={styles.dataTableTitle}>Organisateur</DataTable.Title>
                        <DataTable.Title style={styles.dataTableTitle}>Type</DataTable.Title>
                        <DataTable.Title style={styles.dataTableTitle}>Lieu</DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <ScrollView>
                    {loading ?
                        <ActivityIndicator
                            color={colors.secondary}
                            size={'large'}
                        /> :
                        futureActivitiesArray()}
                </ScrollView>
                <FAB
                    accessibilityLabel={'Ajouter une activité'}
                    color={colors.dark}
                    icon="plus"
                    onPress={() => navigation.push('NewActivity')}
                    style={styles.fab}
                />
            </Portal>
        </Provider >
    )
}

const styles = StyleSheet.create({
    activityButton: {
        backgroundColor: colors.secondary,
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        borderRadius: 2,
        elevation: 4,
        marginTop: 8,
        marginHorizontal: 16,
    },
    dataTableCell: {
        justifyContent: 'center',
    },
    dataTableCellText: {
        color: colors.dark,
    },
    dataTableHeader: {
        marginHorizontal: 16,
    },
    dataTableTitle: {
        justifyContent: 'center',
    },
    fab: {
        backgroundColor: colors.secondary,
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
})