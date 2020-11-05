import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Chip, Snackbar, Text, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { v4 as uuid } from 'uuid';
import colors from '../config/colors';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import * as firebase from 'firebase';

export default function NewActivityScreen({ navigation }) {

    const user = firebase.auth().currentUser;
    const { displayName, photoURL, uid } = user

    const [title, setTitle] = useState("");
    const responsible = {
        displayName,
        photoURL: photoURL || 'https://d1wp6m56sqw74a.cloudfront.net/~assets/b2b3f798006979019644446d70d47151',
        uid
    };
    const [activityTypeSelected, setActivityTypeSelected] = useState("");
    const [beginsAt, setTimestamp] = useState("");
    const [location, setLocation] = useState("");
    const [locationDetails, setLocationDetails] = useState("");
    const [tags, setTags] = useState("")
    const [tagsArray, setTagsArray] = useState([])
    const [description, setDescription] = useState("");
    const [places, setPlaces] = useState("");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setTimestamp(+moment(date))
        hideDatePicker();
    };

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    const activitiesType = [
        { title: "Boire un verre", text: 'drink', avatar: require('../assets/activities/drink.png') },
        { title: "Cinéma", text: 'cinema', avatar: require('../assets/activities/cinema.png') },
        { title: "Culture", text: 'culture', avatar: require('../assets/activities/culture.png') },
        { title: "Danser", text: 'dance', avatar: require('../assets/activities/dance.png') },
        { title: "Découverte", text: 'discovery', avatar: require('../assets/activities/discovery.png') },
        { title: "Détente", text: 'relax', avatar: require('../assets/activities/relax.png') },
        { title: "Entraide", text: 'aid', avatar: require('../assets/activities/aid.png') },
        { title: "Jeux", text: 'game', avatar: require('../assets/activities/game.png') },
        { title: "Musique", text: 'music', avatar: require('../assets/activities/music.png') },
        { title: "Plein air", text: 'outside', avatar: require('../assets/activities/outside.png') },
        { title: "Repas", text: 'restaurant', avatar: require('../assets/activities/restaurant.png') },
        { title: "Séjour", text: 'sojourn', avatar: require('../assets/activities/sojourn.png') },
        { title: "Sport", text: 'sport', avatar: require('../assets/activities/sport.png') },
        { title: "Théâtre", text: 'theater', avatar: require('../assets/activities/theater.png') }
    ]

    const handleAddActivitiy = () => {
        firebase.database()
            .ref('activities/' + uuid())
            .set({
                createdAt: +moment(),
                editableUpTo: parseInt(beginsAt, 10),
                updatedAt: +moment(),
                title: title,
                responsible: responsible,
                type: activityTypeSelected,
                beginsAt: parseInt(beginsAt, 10),
                beginsAtHr: moment(parseInt(beginsAt, 10)).format('ddd DD MMM YYYY - HH:mm'),
                location: location,
                locationDetails: locationDetails,
                description: description,
                places: parseInt(places, 10),
                tags: tagsArray
                // NOTE Add tags
            }, error => {
                if (error) {
                    setSnackbarMessage("Une erreur est survenue ! ❌")
                    onToggleSnackBar()
                } else {
                    setSnackbarMessage("L'activité a bien été créée ! ✔️")
                    onToggleSnackBar()
                    setTimeout(() => { navigation.navigate('Home') }, 3000)
                }
            });
    }

    const onTagsArray = () => {
        setTagsArray(tags.split(" "))
    }

    return (
        <View style={{ justifyContent: 'center', padding: 16 }}>
            <ScrollView>
                <View style={{ marginVertical: 4 }}>
                    <Text>
                        {activitiesType.map((activity, key) =>
                            <View style={{ padding: 2 }} key={key}>
                                <Chip
                                    accessibilityLabel={activity.title}
                                    avatar={<Image source={activity.avatar} />}
                                    key={key}
                                    mode={'outlined'}
                                    onPress={() => setActivityTypeSelected(activity.text)}
                                    selected={activityTypeSelected === activity.text ? true : false}
                                    selectedColor={colors.secondary}
                                    style={activityTypeSelected === activity.text ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary, elevation: 4 }}
                                    textStyle={colors.dark}
                                ><Text style={activityTypeSelected === activity.text ? { color: colors.light } : { color: colors.dark }}>{activity.title}</Text></Chip>
                            </View>
                        )}
                    </Text>
                </View>
                <TextInput
                    label="Titre"
                    onChangeText={title => setTitle(title)}
                    value={title}
                    color={colors.light}
                    dense
                    // error
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 3,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Date et heure"
                    onFocus={showDatePicker}
                    value={
                        beginsAt ?
                            "le " + moment(parseInt(beginsAt, 10)).format('ddd DD MMM YYYY à HH:mm') :
                            null
                    }
                    color={colors.secondary}
                    dense
                    // error
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Lieu"
                    onChangeText={location => setLocation(location)}
                    value={location}
                    color={colors.secondary}
                    dense
                    // error
                    right={true}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Détails"
                    onChangeText={locationDetails => setLocationDetails(locationDetails)}
                    value={locationDetails}
                    color={colors.secondary}
                    dense
                    // error
                    multiline
                    numberOfLines={3}
                    right={true}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    autoCapitalize='none'
                    label="Tags"
                    onBlur={onTagsArray}
                    onFocus={() => {
                        setSnackbarMessage("separerlesmots parunespace")
                        onToggleSnackBar()
                    }}
                    onChangeText={tags => setTags(tags)}
                    value={tags}
                    color={colors.secondary}
                    dense
                    // error
                    multiline
                    numberOfLines={3}
                    right={true}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    textTransform={'lowercase'}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Descriptif"
                    onChangeText={description => setDescription(description)}
                    value={description}
                    color={colors.secondary}
                    dense
                    multiline
                    numberOfLines={3}
                    // error
                    right={true}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Nombre de places"
                    onChangeText={places => setPlaces(places)}
                    value={places}
                    color={colors.secondary}
                    dense
                    // error
                    right={true}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
                    keyboardType={'numeric'}
                />
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon='plus-circle'
                        mode="contained"
                        onPress={handleAddActivitiy}
                        style={{ elevation: 4 }}
                    >
                        Ajouter une actiité
                    </Button>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    minimumDate={new Date()}
                    minuteInterval={5}
                    mode="datetime"
                    onCancel={hideDatePicker}
                    onConfirm={handleConfirm}
                />
            </ScrollView>
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
    button: {
        color: colors.dark,
        paddingVertical: 4,
    },
})