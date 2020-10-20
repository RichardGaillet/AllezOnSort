import React, { useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Provider, Text, Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import MasonryList from "react-native-masonry-list"
import members from "../mocks/members.json"
import colors from '../config/colors'

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function MembersScreen() {

    const images = members
        .map(member => {
            const { personalInformations, username } = member
            const { photo } = personalInformations
            return ({ accessibilityLabel: `Photo de ${username}`, source: { uri: photo, data: member } })
        })

    useEffect(() => {
        retrieveData('masonryListColumns')
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

    // NOTE Gestion de Masonry
    const [masonryListColumns, setMasonryListColumns] = useState(2)
    const masonryList = () => {
        return (
            <MasonryList
                accessible
                accessibilityLabel="Éventail d'images"
                columns={masonryListColumns}
                images={images}
                imageContainerStyle={{ borderColor: colors.secondary, borderWidth: 4 }}
                onPressImage={member => showDialog(member)}
            />)
    }

    // NOTE Gestion du FAB
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const fab = () => {
        return (
            <Portal>
                <FAB.Group
                    accessibilityLabel={`Modifier le nombre de colonnes de 1 à 5, il y a ${masonryListColumns} colonnes actuellement`}
                    fabStyle={{ backgroundColor: colors.secondary }}
                    open={open}
                    icon={open ? `chevron-up` : 'view-dashboard-variant'}
                    actions={[
                        {
                            accessibilityLabel: "Affichage sur une colonne",
                            icon: 'numeric-1',
                            label: '1 colonne',
                            onPress: () => storeData("masonryListColumns", 1),
                        },
                        {
                            accessibilityLabel: "Affichage sur deux colonnes",
                            icon: 'numeric-2',
                            label: '2 colonnes',
                            onPress: () => storeData("masonryListColumns", 2),
                        },
                        {
                            accessibilityLabel: "Affichage sur trois colonnes",
                            icon: 'numeric-3',
                            label: '3 colonnes',
                            onPress: () => storeData("masonryListColumns", 3),
                        },
                        {
                            accessibilityLabel: "Affichage sur quatre colonnes",
                            icon: 'numeric-4',
                            label: '4 colonnes',
                            onPress: () => storeData("masonryListColumns", 4),
                        },
                        {
                            accessibilityLabel: "Affichage sur cinq colonnes",
                            icon: 'numeric-5',
                            label: '5 colonnes',
                            onPress: () => storeData("masonryListColumns", 5),
                        },
                    ]}
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
        const { description, lastConnection, personalInformations, username } = member
        return (
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <ScrollView>
                        <Card>
                            <Card.Title title={username} subtitle={`Dernière connexion : ${moment(lastConnection).fromNow()}`} titleStyle={styles.cardTitle} subtitleStyle={styles.cardTitle} style={styles.cardTitle} />
                            <Card.Cover
                                source={{ uri: personalInformations?.photo }}
                                style={{
                                    alignSelf: 'center',
                                    height: masonryDimensions.height * masonryListColumns / 2,
                                    width: masonryDimensions.width * masonryListColumns / 2,
                                }}
                            />
                            <Divider />
                            <Card.Content>
                                {personalInformations?.firstname && <>
                                    <Text style={styles.cardContentText} >Prénom : {personalInformations?.firstname}</Text>
                                </>}
                                {personalInformations?.birthday && <>
                                    <Divider />
                                    <Text style={styles.cardContentText} >Date de naissance : {moment(personalInformations?.birthday).format('LL')}</Text>
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
            {masonryList()}
            {fab()}
            {memberDialog()}
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