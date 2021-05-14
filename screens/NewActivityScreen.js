import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, HelperText, Snackbar, Text, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from 'formik';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import activitiesType from '../config/activitiesType';
import colors from '../config/colors';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import * as firebase from 'firebase';

export default function NewActivityScreen({ navigation, route }) {

    const user = firebase.auth().currentUser;
    const { displayName, photoURL, uid } = user

    const responsible = {
        displayName,
        photoURL: photoURL || 'https://d1wp6m56sqw74a.cloudfront.net/~assets/b2b3f798006979019644446d70d47151',
        uid
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => { setDatePickerVisibility(true) };
    const hideDatePicker = () => { setDatePickerVisibility(false) };

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    const handleAddActivitiy = (values) => {
        const { beginsAt, title, type, location, locationDetails, description, places, tags } = values;
        const tagsSplitted = tags && tags.split(" ")
        const uid = uuid();
        firebase.database()
            .ref('activities/' + uid)
            .set({
                beginsAt: parseInt(+moment(beginsAt), 10),
                beginsAtHr: moment(beginsAt).format('ddd DD MMM YYYY - HH:mm').toString(),
                createdAt: +moment(),
                description: description || null,
                editableUpTo: parseInt(+moment(beginsAt), 10),
                location: location,
                locationDetails: locationDetails || null,
                places: parseInt(places, 10),
                responsible: responsible,
                tags: tagsSplitted || null,
                title: title,
                type: type,
                uid: uid,
                updatedAt: +moment(),
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

    const handleUpdateActivitiy = (values) => {
        const { beginsAt, title, type, location, locationDetails, description, places, tags } = values;
        const tagsSplitted = tags && tags.split(" ")
        firebase.database()
            .ref('activities/' + route?.params?.activity?.uid)
            .update({
                beginsAt: parseInt(+moment(beginsAt), 10),
                beginsAtHr: moment(beginsAt).format('ddd DD MMM YYYY - HH:mm').toString(),
                description: description || null,
                editableUpTo: parseInt(+moment(beginsAt), 10),
                location: location,
                locationDetails: locationDetails || null,
                places: parseInt(places, 10),
                tags: tagsSplitted || null,
                title: title,
                type: type,
                updatedAt: +moment(),
            }, error => {
                if (error) {
                    setSnackbarMessage("Une erreur est survenue ! ❌")
                    onToggleSnackBar()
                } else {
                    setSnackbarMessage("L'activité a bien été modifiée ! ✔️")
                    onToggleSnackBar()
                    setTimeout(() => { navigation.navigate('Home') }, 3000)
                }
            });
    }

    const initialValues = {
        beginsAt: route?.params?.activity?.beginsAt || '',
        description: route?.params?.activity?.description || null,
        location: route?.params?.activity?.location || null,
        locationDetails: route?.params?.activity?.locationDetails || null,
        places: route?.params?.activity?.places || 0,
        tags: route?.params?.activity?.tags || null,
        title: route?.params?.activity?.title || null,
        type: route?.params?.activity?.type || null,
    }

    const addActivitySchema = yup.object().shape({
        beginsAt: yup.string()
            .required("Champ obligatoire"),
        description: yup.string()
            .max(512, "Maximum 512 caractères")
            .trim().nullable(),
        location: yup.string()
            .min(1, "Minimum 1 caractère")
            .max(64, "Maximum 64 caractères")
            .trim().ensure().required("Champ obligatoire"),
        locationDetails: yup.string()
            .max(128, "Maximum 128 caractères")
            .trim().nullable(),
        places: yup.number()
            .moreThan(0, "Minimum 1 place")
            .lessThan(12, "Maximum 11 places")
            .required("Champ obligatoire"),
        tags: yup.string()
            .min(3, "Minimum 3 caractères")
            .max(32, "Maximum 32 caractères")
            .lowercase()
            .trim().nullable(),
        title: yup.string()
            .min(3, "Minimum 3 caractères")
            .max(32, "Maximum 32 caractères")
            .trim().ensure().required("Champ obligatoire"),
        type: yup.mixed().oneOf([
            'drink',
            'cinema',
            'culture',
            'dance',
            'discovery',
            'relax',
            'aid',
            'game',
            'music',
            'outside',
            'restaurant',
            'sojourn',
            'sport',
            'theater'],
            "1 choix obligatoire")
            .required("Choisir un type d'acitivté"),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => { route?.params?.activity ? handleUpdateActivitiy(values, actions.resetForm()) : handleAddActivitiy(values, actions.resetForm()) }}
            validationSchema={addActivitySchema}
        >
            {({ handleBlur, handleChange, handleSubmit, setFieldValue, dirty, errors, isSubmitting, isValid, values }) => (
                <View View style={{ justifyContent: 'center', padding: 16 }}>
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
                                            onPress={() => setFieldValue('type', activity?.text)}
                                            selected={values.type === activity.text ? true : false}
                                            selectedColor={colors.secondary}
                                            style={values.type === activity.text ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary, elevation: 4 }}
                                            validateOnBur={true}
                                        >
                                            <Text style={values.type === activity.text ? { color: colors.light } : { color: colors.dark }}>
                                                {activity.title}
                                            </Text>
                                        </Chip>
                                    </View>
                                )}
                            </Text>
                            {errors.type && <HelperText type="error" visible={errors.type}>
                                {errors.type}
                            </HelperText>}
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ color: colors.secondary, fontSize: 10, fontWeight: '700' }}>* champ obligatoire</Text>
                        </View>
                        <View>
                            <TextInput
                                color={colors.light}
                                dense
                                error={errors.title}
                                label='Titre *'
                                keyboardType={'default'}
                                onBlur={handleBlur('title')}
                                onChangeText={handleChange('title')}
                                returnKeyType={'next'}
                                returnKeyLabel={'Suivant'}
                                style={{ marginVertical: 4 }}
                                value={values.title}
                            />
                            {errors.title && <HelperText type="error" visible={errors.title}>
                                {errors.title}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                color={colors.secondary}
                                dense
                                error={errors.beginsAt}
                                keyboardType={'default'}
                                label="Date et heure *"
                                onBlur={handleBlur('beginsAt')}
                                onFocus={showDatePicker}
                                returnKeyType={"next"}
                                style={{ marginVertical: 4 }}
                                value={values.beginsAt ?
                                    "le " + moment(values.beginsAt).format('ddd DD MMM YYYY à HH:mm').toString() :
                                    null}
                            />
                            {errors.beginsAt && <HelperText type="error" visible={errors.beginsAt}>
                                {errors.beginsAt}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                color={colors.secondary}
                                dense
                                error={errors.location}
                                keyboardType={'default'}
                                label="Lieu *"
                                onBlur={handleBlur('location')}
                                onChangeText={handleChange('location')}
                                returnKeyType={"next"}
                                right={true}
                                style={{ marginVertical: 4 }}
                                value={values.location}
                            />
                            {errors.location && <HelperText type="error" visible={errors.location}>
                                {errors.location}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                color={colors.secondary}
                                dense
                                error={errors.locationDetails}
                                keyboardType={'default'}
                                label="Détails"
                                multiline
                                numberOfLines={3}
                                onBlur={handleBlur('locationDetails')}
                                onChangeText={handleChange('locationDetails')}
                                returnKeyType={"next"}
                                right={true}
                                style={{ marginVertical: 4 }}
                                value={values.locationDetails}
                            />
                            {errors.locationDetails && <HelperText type="error" visible={errors.locationDetails}>
                                {errors.locationDetails}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={true}
                                color={colors.secondary}
                                dense
                                error={errors.tags}
                                keyboardType={'default'}
                                label="Tags"
                                multiline
                                onBlur={handleBlur('tags')}
                                onChangeText={handleChange('tags')}
                                onFocus={() => {
                                    setSnackbarMessage("separerlesmots parunespace")
                                    onToggleSnackBar()
                                }}
                                returnKeyType={"next"}
                                right={true}
                                style={{
                                    marginVertical: 4,
                                }}
                                textTransform={'lowercase'}
                                value={values.tags}
                            />
                            {errors.tags && <HelperText type="error" visible={errors.tags}>
                                {errors.tags}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                color={colors.secondary}
                                dense
                                error={errors.description}
                                keyboardType={'default'}
                                label="Descriptif"
                                multiline
                                numberOfLines={3}
                                onBlur={handleBlur('description')}
                                onChangeText={handleChange('description')}
                                returnKeyType={"next"}
                                right={true}
                                style={{
                                    marginVertical: 4,
                                }}
                                value={values.description}
                            />
                            {errors.description && <HelperText type="error" visible={errors.description}>
                                {errors.description}
                            </HelperText>}
                        </View>
                        <View>
                            <TextInput
                                color={colors.secondary}
                                dense
                                error={errors.places}
                                keyboardType={'numeric'}
                                label="Nombre de places *"
                                onBlur={handleBlur('places')}
                                onChangeText={handleChange('places')}
                                returnKeyType={'send'}
                                right={true}
                                style={{
                                    marginVertical: 4,
                                }}
                                value={values.places.toString()}
                            />
                            {errors.places && <HelperText type="error" visible={errors.places}>
                                {errors.places}
                            </HelperText>}
                        </View>
                        <View style={styles.button}>
                            <Button
                                color={colors.secondary}
                                compact
                                disabled={!(isValid && dirty) || isSubmitting}
                                icon='plus-circle'
                                mode="contained"
                                onPress={handleSubmit}
                                style={{ elevation: 4 }}
                            >
                                Ajouter une activité
                            </Button>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            minimumDate={new Date()}
                            minuteInterval={5}
                            mode="datetime"
                            onCancel={hideDatePicker}
                            onConfirm={(date) => { setFieldValue('beginsAt', date) }}
                        />
                    </ScrollView>
                    <View>
                        <Snackbar
                            duration={3000}
                            onDismiss={onDismissSnackBar}
                            style={{ backgroundColor: colors.primary }}
                            visible={snackbarVisible}
                            wrapperStyle={{ backgroundColor: colors.light }}
                        >
                            {snackbarMessage}
                        </Snackbar>
                    </View >
                </View>
            )
            }
        </Formik >
    )
}


const styles = StyleSheet.create({
    button: {
        color: colors.light,
        paddingVertical: 4,
    },
})