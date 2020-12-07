import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { ActivityIndicator, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import { lessThanTen, startOfDay } from '../config/format'
import colors from '../config/colors';

import * as firebase from 'firebase';

export default function ActivitiesScreen({ navigation }) {

    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase
            .database()
            .ref("activities")
            .orderByChild('beginsAt')
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
                ?.sort((a, b) => {
                    return a.beginsAt - b.beginsAt;
                })
                ?.map((activity, key) => {
                    if (!activity?.registeredList) {
                        activity.registeredList = []
                    }
                    const { beginsAt, location, responsible, registeredList, places, type } = activity
                    const formatRegisteredList = lessThanTen(registeredList.length)
                    const formatPlaces = lessThanTen(places)

                    let activityType;

                    switch (type) {
                        case 'aid': activityType = "Entraide"; break;
                        case 'cinema': activityType = "Cinéma"; break;
                        case 'culture': activityType = "Culture"; break;
                        case 'dance': activityType = "Danse"; break;
                        case 'discovery': activityType = "Découverte"; break;
                        case 'drink': activityType = "Boire un verre"; break;
                        case 'game': activityType = "Jeux"; break;
                        case 'music': activityType = "Musique"; break;
                        case 'outside': activityType = "Plein air"; break;
                        case 'relax': activityType = "Détente"; break;
                        case 'restaurant': activityType = "Repas"; break;
                        case 'sojourn': activityType = "Séjour"; break;
                        case 'sport': activityType = "Sport"; break;
                        case 'theater': activityType = "Théâtre"; break;
                        default: console.log('Aucune action reçue.'); break;
                    }

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
                                        <Text style={styles.dataTableCellText}>{moment(parseInt(beginsAt, 10)).format('ddd DD MMM')}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{moment(parseInt(beginsAt, 10)).format('LT')}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{formatRegisteredList} / {formatPlaces}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row >
                                <DataTable.Row
                                    style={styles.dataTableRow}
                                >
                                    <DataTable.Cell style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{responsible?.displayName}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        key={key}
                                        style={styles.dataTableCell}>
                                        <Text style={styles.dataTableCellText}>{activityType}</Text>
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
                <ScrollView
                    contentContainerStyle={
                        !activities || loading ?
                            { flex: 1, justifyContent: 'center' } :
                            { justifyContent: 'center', paddingBottom: 80 }
                    }
                >
                    {loading ?
                        <ActivityIndicator
                            color={colors.secondary}
                            size={'large'}
                        />
                        :
                        futureActivitiesArray()
                        ||
                        <Text style={styles.noFutureActivities}>Pas d'activités pour le moment ! 😱</Text>
                    }
                </ScrollView>
                {user !== null && <FAB
                    accessibilityLabel={'Ajouter une activité'}
                    color={colors.dark}
                    icon="plus"
                    onPress={() => navigation.push('NewActivity')}
                    style={styles.fab}
                />}
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
    container: {
        flex: 1,
        paddingBottom: 80,
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
    noFutureActivities: {
        alignSelf: 'center',
        color: colors.dark,
        fontWeight: '700',
    },
})