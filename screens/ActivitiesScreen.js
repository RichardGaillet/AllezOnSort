import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { DataTable } from 'react-native-paper';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import { lessThanTen } from '../config/format'
import activities from '../mocks/activities'
import colors from '../config/colors';

export default function ActivitiesScreen({ navigation }) {

    const futureActivitiesArray = () => {
        return (
            activities
                .filter((activity) => activity.timestamp > moment(Date.now()).startOf('day'))
                .sort((a, b) => {
                    if (a.timestamp === b.timestamp) {
                        return a.id - b.id;
                    }
                    return a.timestamp > b.timestamp ? 1 : -1;
                })
                .map((activity, key) => {
                    const { location, organizer, places, registeredList, timestamp, title } = activity
                    const formatRegistered = lessThanTen(registeredList.length)
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
        <View>
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
                {futureActivitiesArray()}
            </ScrollView>
        </View>
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
        color: '#fff'
    },
    dataTableHeader: {
        marginHorizontal: 16,
    },
    dataTableTitle: {
        justifyContent: 'center',
    },
})