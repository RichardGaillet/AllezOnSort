import React, { useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Dialog, Divider, FAB, Portal, Provider, Searchbar, Snackbar, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import MasonryList from "react-native-masonry-list"
import colors from '../config/colors'

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import * as firebase from 'firebase';

export default function MembersScreen() {

    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState([])

    const images = members
        .map(member => {
            const { personalInformations, displayName } = member
            const { photoURL } = personalInformations
            return ({ accessibilityLabel: `Photo de ${displayName}`, source: { uri: photoURL, data: member } })
        })

    useEffect(() => {
        retrieveData('masonryListColumns')
        firebase
            .database()
            .ref("members")
            .limitToFirst(25)
            .once("value")
            .then(snapshot => {
                setMembers(Object.values(snapshot.val()))
                setLoading(false)
            })
    }, [])

    // NOTE Gestion d'AsyncStorage
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key.toString(), value.toString());
            setMasonryListColumns(value);
        } catch (error) { console.log("storeData -> error", error) }
    }
    const retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key.toString());
            if (value !== null) { setMasonryListColumns(Number(value)) }
        } catch (error) { console.log("retrieveData -> error", error) }
    }

    // NOTE Gestion de la barre de recherche
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setSearchQuery(query)
    };

    const onSearchQuery = () => {
        setMembers([])
        const searchArray = []
        firebase
            .database()
            .ref("members")
            .once("value")
            .then(snapshot => {
                snapshot
                    .forEach(childSnapshot => {
                        if (childSnapshot.val().displayName &&
                            childSnapshot.val().displayName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchArray.push(childSnapshot.val())
                        }
                        if (childSnapshot.val().personalInformations.firstName &&
                            childSnapshot.val().personalInformations.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchArray.push(childSnapshot.val())
                        }
                        if (childSnapshot.val().description &&
                            childSnapshot.val().description.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchArray.push(childSnapshot.val())
                        }
                        if (childSnapshot.val().personalInformations.location &&
                            childSnapshot.val().personalInformations.location.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchArray.push(childSnapshot.val())
                        }
                    })
                if (searchArray.length === 0) {
                    setSnackbarMessage(`Aucun résultat ! ❌`)
                    onToggleSnackBar()
                } else {
                    setMembers(searchArray)
                    setSnackbarMessage(`${searchArray.length} membre(s) trouvé(s) ! ✔️`)
                    onToggleSnackBar()
                }
            })
            .catch(error => console.log("onSearchQuery -> error", error))
    }

    // NOTE Gestion de la snackBar
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    // NOTE Gestion de Masonry
    const [masonryListColumns, setMasonryListColumns] = useState(2)

    // NOTE Gestion du FAB
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const fab = () => {

        const fabGroupActions = [
            {
                accessibilityLabel: "Affichage sur une colonne",
                color: masonryListColumns === 1 ? colors.light : colors.dark,
                icon: 'numeric-1',
                label: masonryListColumns === 1 ? null : '1 colonne',
                onPress: () => storeData("masonryListColumns", 1),
                style: masonryListColumns === 1 ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
            },
            {
                accessibilityLabel: "Affichage sur deux colonnes",
                color: masonryListColumns === 2 ? colors.light : colors.dark,
                icon: 'numeric-2',
                label: masonryListColumns === 2 ? null : '2 colonnes',
                onPress: () => storeData("masonryListColumns", 2),
                style: masonryListColumns === 2 ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
            },
            {
                accessibilityLabel: "Affichage sur trois colonnes",
                color: masonryListColumns === 3 ? colors.light : colors.dark,
                icon: 'numeric-3',
                label: masonryListColumns === 3 ? null : '3 colonnes',
                onPress: () => storeData("masonryListColumns", 3),
                style: masonryListColumns === 3 ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
            },
            {
                accessibilityLabel: "Affichage sur quatre colonnes",
                color: masonryListColumns === 4 ? colors.light : colors.dark,
                icon: 'numeric-4',
                label: masonryListColumns === 4 ? null : '4 colonnes',
                onPress: () => storeData("masonryListColumns", 4),
                style: masonryListColumns === 4 ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
            },
            {
                accessibilityLabel: "Affichage sur cinq colonnes",
                color: masonryListColumns === 5 ? colors.light : colors.dark,
                icon: 'numeric-5',
                label: masonryListColumns === 5 ? null : '5 colonnes',
                onPress: () => storeData("masonryListColumns", 5),
                style: masonryListColumns === 5 ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
            }
        ]

        return (
            <Portal>
                <FAB.Group
                    accessibilityLabel={`Modifier le nombre de colonnes de 1 à 5, il y a ${masonryListColumns} colonnes actuellement`}
                    fabStyle={{ backgroundColor: colors.secondary }}
                    open={open}
                    icon={open ? `chevron-up` : 'view-dashboard-variant'}
                    actions={fabGroupActions}
                    onStateChange={onStateChange}
                />
            </Portal>)
    }

    // NOTE Gestion de memberDialog
    const [visible, setVisible] = useState(false);
    const [member, setMember] = useState({})
    const [masonryDimensions, setMasonryDimensions] = useState({})
    const showDialog = (member) => {
        setMember(member.source.data);
        setMasonryDimensions(member.masonryDimensions);
        setVisible(true);
    }
    const hideDialog = () => setVisible(false);
    const memberDialog = () => {
        const { description, lastLoginAt, personalInformations, displayName } = member
        return (
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <ScrollView>
                        <Card>
                            <Card.Title title={displayName} subtitle={`Dernière connexion : ${moment(parseInt(lastLoginAt, 10)).fromNow()}`} titleStyle={styles.cardTitle} subtitleStyle={styles.cardTitle} style={styles.cardTitle} />
                            <Card.Cover
                                source={{ uri: personalInformations?.photoURL }}
                                style={{
                                    alignSelf: 'center',
                                    height: masonryDimensions.height * masonryListColumns / 2,
                                    width: masonryDimensions.width * masonryListColumns / 2,
                                }}
                            />
                            <Divider />
                            <Card.Content>
                                {personalInformations?.firstName && <>
                                    <Text style={styles.cardContentText} >Prénom : {personalInformations?.firstName}</Text>
                                </>}
                                {personalInformations?.birthday && <>
                                    <Divider />
                                    <Text style={styles.cardContentText} >Date de naissance : {moment(parseInt(personalInformations?.birthday, 10)).format('LL')}</Text>
                                </>}
                                {personalInformations?.location && <>
                                    <Divider />
                                    <Text style={styles.cardContentText} >Localisation : {personalInformations?.location}</Text>
                                </>}
                                {description && <>
                                    <Divider />
                                    <Text style={styles.cardContentText} >Description : {description}</Text>
                                </>}
                            </Card.Content>
                            <Card.Actions style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <Button
                                    color={colors.secondary}
                                    icon='close-circle'
                                    mode="contained"
                                    onPress={hideDialog}
                                    style={{ elevation: 4 }}
                                >Fermer</Button>
                            </Card.Actions>
                        </Card>
                    </ScrollView>
                </Dialog >
            </Portal >
        )
    }

    return (
        <Provider>
            {loading ?
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator
                        color={colors.secondary}
                        size={'large'}
                    />
                </ScrollView> :
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <View display='flex' flexDirection='row'>
                        <View flex={1}>
                            <Searchbar
                                clearAccessibilityLabel={"effacer le critère de recherche"}
                                iconColor={searchQuery !== "" ? colors.secondary : colors.primary}
                                onChangeText={onChangeSearch}
                                onIconPress={searchQuery !== "" ? onSearchQuery : null}
                                placeholder="Recherche"
                                searchAccessibilityLabel={searchQuery === "" ? "remplir le critère de recherche sur le champ suivant" : "lancer la recherche"}
                                value={searchQuery}
                            />
                        </View>
                    </View>
                    <MasonryList
                        accessible
                        accessibilityLabel="Éventail d'images"
                        columns={masonryListColumns}
                        images={images}
                        imageContainerStyle={{ borderColor: colors.secondary, borderWidth: 6 / masonryListColumns }}
                        listContainerStyle={{ paddingBottom: 80 }}
                        onPressImage={member => showDialog(member)}
                    />
                </ScrollView>
            }
            {fab()}
            {memberDialog()}
            <Snackbar
                duration={2000}
                onDismiss={onDismissSnackBar}
                visible={snackbarVisible}
                wrapperStyle={{ backgroundColor: colors.light }}
            >
                {snackbarMessage}
            </Snackbar>
        </Provider>
    )
}

const styles = StyleSheet.create({
    cardActionsButtoon: {
        elevation: 4,
    },
    cardContentText: {
        marginVertical: 12
    },
    cardTitle: {
        backgroundColor: colors.primary,
        color: colors.light,
    },
})