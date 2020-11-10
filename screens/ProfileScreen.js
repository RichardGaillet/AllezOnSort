import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Avatar, Button, Snackbar, Text, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import colors from '../config/colors';

import * as firebase from 'firebase';

export default function ProfileScreen() {

    const [loading, setLoading] = useState(true);
    const [member, setMember] = useState({});
    const [createdAt, setCreatedAt] = useState("");
    const [lastLoginAt, setLastLoginAt] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [birthday, setBirthday] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [refresh, setRefresh] = useState(false);

    const user = firebase.auth().currentUser;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const toggleDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const handleConfirm = (date) => {
        setBirthday(+moment(date))
        toggleDatePicker();
    };

    useEffect(() => {
        firebase
            .database()
            .ref("members/" + user?.uid)
            .once("value")
            .then(snapshot => {
                setBirthday(snapshot.val()?.personalInformations?.birthday);
                setCreatedAt(snapshot.val()?.createdAt);
                setDescription(snapshot.val()?.description);
                setDisplayName(snapshot.val()?.displayName);
                setFirstName(snapshot.val()?.personalInformations?.firstName);
                setLastLoginAt(snapshot.val()?.lastLoginAt);
                setLoading(false);
                setLocation(snapshot.val()?.personalInformations?.location);
                setMember(snapshot.val());
                setPhotoURL(snapshot.val()?.personalInformations?.photoURL);
            })
            .catch(() => {
                setMember(null)
                setLoading(false)
            })
    }, [refresh])

    const handleUpdateProfile = () => {
        let body = { ...member };
        body.description = description || null;
        body.displayName = displayName || null;
        body.personalInformations.birthday = birthday || null;
        body.personalInformations.firstName = firstName || null;
        body.personalInformations.location = location || null;

        firebase.database()
            .ref('members/' + user?.uid)
            .set(
                body,
                error => {
                    if (error) {
                        setSnackbarMessage("Une erreur est survenue ! ❌")
                        onToggleSnackBar()
                    } else {
                        setSnackbarMessage("Le profil a bien été mis à jour ! ✔️")
                        onToggleSnackBar()
                        // setRefresh(!refresh)
                        // setTimeout(() => { navigation.navigate('Home') }, 3000)
                    }
                });
    }

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    return (
        <View style={{ justifyContent: 'center', padding: 16 }}>
            <ScrollView
                contentContainerStyle={
                    !member || loading ?
                        { flex: 1, justifyContent: 'center' } :
                        { justifyContent: 'center', paddingBottom: 16 }
                }>
                {loading ?
                    <ActivityIndicator
                        color={colors.secondary}
                        size={'large'}
                    />
                    :
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 8, justifyContent: 'center' }}>
                                {photoURL ?
                                    <Avatar.Image size={96} source={{ uri: photoURL }} /> :
                                    <Avatar.Text
                                        size={96}
                                        label={displayName.substring(0, 1).toUpperCase() + displayName.substring(displayName?.length - 1, displayName?.length).toUpperCase()} />}
                            </View>
                            <View flexDirection={'column'} flex={1} style={{ justifyContent: 'flex-end' }}>
                                <TextInput
                                    color={colors.light}
                                    dense
                                    disabled
                                    // error
                                    label="Créé le"
                                    onChangeText={createdAt => setCreatedAt(createdAt)}
                                    style={{
                                        // backgroundColor: colors.secondary,
                                        // borderBottomColor: colors.primary,
                                        // borderBottomWidth: 3,
                                        marginVertical: 4,
                                    }}
                                    value={moment(parseInt(createdAt, 10)).format('DD/MM/YYYY - HH:mm')}
                                />
                                <TextInput
                                    color={colors.light}
                                    dense
                                    disabled
                                    // error
                                    label="Dernière connexion le"
                                    onChangeText={lastLoginAt => setLastLogindAt(lastLoginAt)}
                                    style={{
                                        // backgroundColor: colors.secondary,
                                        // borderBottomColor: colors.primary,
                                        // borderBottomWidth: 3,
                                        marginVertical: 4,
                                    }}
                                    value={moment(parseInt(lastLoginAt, 10)).format('DD/MM/YYYY - HH:mm')}
                                />
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ color: colors.secondary, fontSize: 10, fontWeight: '700' }}>* champ obligatoire</Text>
                        </View>
                        <TextInput
                            color={colors.light}
                            dense
                            editable={user != null}
                            // error
                            keyboardType={'default'}
                            label="Nom d'utilisateur *"
                            onChangeText={displayName => setDisplayName(displayName)}
                            style={{
                                backgroundColor: colors.secondary,
                                // borderBottomColor: colors.primary,
                                // borderBottomWidth: 3,
                                elevation: 4,
                                marginVertical: 4,
                            }}
                            value={displayName}
                        />
                        <TextInput
                            color={colors.light}
                            editable={user != null}
                            // error
                            dense
                            keyboardType={'default'}
                            label="Prénom"
                            onChangeText={firstName => setFirstName(firstName)}
                            right={firstName ? <TextInput.Icon name='trash-can-outline' onPress={() => setFirstName(null)} /> : ""}
                            style={{
                                backgroundColor: colors.secondary,
                                // borderBottomColor: colors.primary,
                                // borderBottomWidth: 3,
                                elevation: 4,
                                marginVertical: 4,
                            }}
                            value={firstName}
                        />
                        <TextInput
                            color={colors.light}
                            dense
                            editable={user != null}
                            // error
                            keyboardType={'default'}
                            label="Description"
                            multiline
                            numberOfLines={3}
                            onChangeText={description => setDescription(description)}
                            right={description ? <TextInput.Icon name='trash-can-outline' onPress={() => setDescription(null)} /> : ""}
                            style={{
                                backgroundColor: colors.secondary,
                                // borderBottomColor: colors.primary,
                                // borderBottomWidth: 3,
                                elevation: 4,
                                marginVertical: 4,
                            }}
                            value={description}
                        />
                        <TextInput
                            color={colors.light}
                            editable={user != null}
                            // error
                            dense
                            keyboardType={'default'}
                            label="Ville"
                            onChangeText={location => setLocation(location)}
                            right={location ? <TextInput.Icon name='trash-can-outline' onPress={() => setLocation(null)} /> : ""}
                            style={{
                                backgroundColor: colors.secondary,
                                // borderBottomColor: colors.primary,
                                // borderBottomWidth: 3,
                                elevation: 4,
                                marginVertical: 4,
                            }}
                            value={location}
                        />
                        <TextInput
                            color={colors.secondary}
                            dense
                            editable={user != null}
                            // error
                            label="Date de naissance"
                            onFocus={toggleDatePicker}
                            right={birthday ? <TextInput.Icon name='trash-can-outline' onPress={() => setBirthday(null)} /> : ""}
                            style={{
                                backgroundColor: colors.secondary,
                                // borderBottomColor: colors.primary,
                                // borderBottomWidth: 4,
                                elevation: 4,
                                marginVertical: 4,
                            }}
                            value={
                                birthday != null ?
                                    moment(parseInt(birthday, 10)).format('DD/MM/YYYY') :
                                    null
                            }
                        />
                        <View style={styles.button}>
                            <Button
                                color={colors.secondary}
                                compact
                                disabled={false}
                                icon='account-convert'
                                mode="contained"
                                onPress={handleUpdateProfile}
                                style={{ elevation: 4, marginVertical: 4, }}
                            >
                                Mettre à jour
                            </Button>
                        </View>
                    </>
                }
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    maximumDate={+moment().subtract(18, 'years')}
                    mode="date"
                    onCancel={toggleDatePicker}
                    onConfirm={handleConfirm}
                />
            </ScrollView >
            <View>
                <Snackbar
                    duration={5000}
                    onDismiss={onDismissSnackBar}
                    visible={snackbarVisible}
                    wrapperStyle={{ backgroundColor: colors.light }}
                >
                    {snackbarMessage}
                </Snackbar>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
})