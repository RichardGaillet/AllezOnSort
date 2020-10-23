import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Chip, Text, TextInput, TextInputMask } from 'react-native-paper'
import colors from '../config/colors';

export default function NewActivityScreen() {

    const [activityTypeSelected, setActivityTypeSelected] = useState('');
    const [title, setTitle] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [description, setDescription] = useState('');
    const [places, setPlaces] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');

    const activitiesType = [
        { title: 'Boire un verre', text: 'drink', avatar: require('../assets/activities/drink.png') },
        { title: 'Cinéma', text: 'cinema', avatar: require('../assets/activities/cinema.png') },
        { title: 'Culture', text: 'culture', avatar: require('../assets/activities/culture.png') },
        { title: 'Danser', text: 'dance', avatar: require('../assets/activities/dance.png') },
        { title: 'Découverte', text: 'discovery', avatar: require('../assets/activities/discovery.png') },
        { title: 'Détente', text: 'relax', avatar: require('../assets/activities/relax.png') },
        { title: 'Entraide', text: 'aid', avatar: require('../assets/activities/aid.png') },
        { title: 'Jeux', text: 'game', avatar: require('../assets/activities/game.png') },
        { title: 'Musique', text: 'music', avatar: require('../assets/activities/music.png') },
        { title: 'Plein air', text: 'outside', avatar: require('../assets/activities/outside.png') },
        { title: 'Repas', text: 'restaurant', avatar: require('../assets/activities/restaurant.png') },
        { title: 'Séjour', text: 'sojourn', avatar: require('../assets/activities/sojourn.png') },
        { title: 'Sport', text: 'sport', avatar: require('../assets/activities/sport.png') },
        { title: 'Théâtre', text: 'theater', avatar: require('../assets/activities/theater.png') }
    ]

    return (
        <View style={{ justifyContent: 'center', padding: 16 }}>
            <ScrollView>
                <View style={{ marginVertical: 4 }}>
                    <Text>
                        {activitiesType.map(activity =>
                            <View style={{ padding: 2 }}>
                                <Chip
                                    accessibilityLabel={activity.title}
                                    avatar={<Image source={activity.avatar} />}
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
                        backgroundColor: title ? colors.primary : colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 3,
                        color: colors.light,
                        marginVertical: 4,
                    }}
                    keyboardType={'default'}
                />
                <TextInput
                    label="Date et heure"
                    onChangeText={timestamp => setTimestamp(timestamp)}
                    value={timestamp}
                    color={colors.secondary}
                    dense
                    // error
                    placeholder={'12/10/2020 - 16:26'}
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
                    selectionColor={colors.dark}
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
                    onChangeText={details => setDetails(details)}
                    value={details}
                    color={colors.secondary}
                    dense
                    // error
                    multiline
                    numberOfLines={3}
                    right={true}
                    selectionColor={colors.dark}
                    style={{
                        backgroundColor: colors.secondary,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 4,
                        marginVertical: 4,
                    }}
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
                    selectionColor={colors.dark}
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
                    selectionColor={colors.dark}
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
                        onPress={() => alert("Activité en cours d'ajout")}
                        style={{ elevation: 4 }}
                    >
                        Ajouter une actiité
                    </Button>
                </View>
            </ScrollView>
        </View >
    )
}


const styles = StyleSheet.create({
    button: {
        color: colors.dark,
        paddingVertical: 4,
    },
})