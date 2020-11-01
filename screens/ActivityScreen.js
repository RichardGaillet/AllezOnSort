import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Button, Card, Chip, Dialog, Divider, List, Paragraph, Portal, Provider, Text, Title } from 'react-native-paper'
import colors from '../config/colors'
import { lessThanTen, shortenText } from '../config/format'
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function ActivityScreen(activity) {

    const [textDialog, setTextDialog] = useState({});
    const [visible, setVisible] = useState(false);

    const showDialog = (text) => {
        setTextDialog(text);
        setVisible(true);
    }

    const hideDialog = () => setVisible(false);

    const {
        comments,
        description,
        location,
        locationDetails,
        organizer,
        photo,
        places,
        registeredList,
        registeredWaitingList,
        tags,
        timestamp,
        title,
        type,
    } = activity.route.params.activity

    let activityType;

    switch (type) {
        case 'aid': activityType = require('../assets/activities/aid.png'); break;
        case 'cinema': activityType = require('../assets/activities/cinema.png'); break;
        case 'culture': activityType = require('../assets/activities/culture.png'); break;
        case 'dance': activityType = require('../assets/activities/dance.png'); break;
        case 'discovery': activityType = require('../assets/activities/discovery.png'); break;
        case 'drink': activityType = require('../assets/activities/drink.png'); break;
        case 'game': activityType = require('../assets/activities/game.png'); break;
        case 'music': activityType = require('../assets/activities/music.png'); break;
        case 'outside': activityType = require('../assets/activities/outside.png'); break;
        case 'relax': activityType = require('../assets/activities/relax.png'); break;
        case 'restaurant': activityType = require('../assets/activities/restaurant.png'); break;
        case 'sojourn': activityType = require('../assets/activities/sojourn.png'); break;
        case 'sport': activityType = require('../assets/activities/sport.png'); break;
        case 'theater': activityType = require('../assets/activities/theater.png'); break;
        default: console.log('Aucune action reçue.'); break;
    }

    const RightContent = () => <Image style={styles.activityTypeImage} source={activityType} />

    return (
        <Provider>
            <ScrollView>
                <Card>
                    <Card.Cover source={photo ? { uri: photo } : { uri: 'https://picsum.photos/700' }} />
                    <Divider style={styles.divider} />
                    <Card.Title title={title} subtitle={`par ${organizer}`} right={RightContent} />
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>{`le ${moment(parseInt(timestamp, 10)).format('ddd DD MMM')} à ${moment(parseInt(timestamp, 10)).format('LT')}`}</Title>
                        <Divider />
                        <Paragraph>Lieu : {location}</Paragraph>
                        {locationDetails && <Paragraph>Détails : {locationDetails}</Paragraph>}
                    </Card.Content>
                    {tags?.length > 0 && <Card.Content>
                        <Divider />
                        <Text>
                            {tags
                                ?.sort()
                                ?.map((tag, key) =>
                                    <List.Item
                                        key={key}
                                        style={styles.listItemChip}
                                        title={
                                            <Chip
                                                style={styles.chipButton}
                                            >
                                                <Text
                                                    style={styles.chipText}
                                                >
                                                    {'#' + shortenText(tag, 32)}
                                                </Text>
                                            </Chip>
                                        } />
                                )}
                        </Text>
                    </Card.Content>}
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>Descriptif</Title>
                        <Divider />
                        {description?.length > 128 ?
                            <Paragraph onPress={() => showDialog(description)}>{shortenText(description, 128)}
                                <Text style={styles.shortenText}> suite</Text>
                            </Paragraph> :
                            <Paragraph>{description}</Paragraph>
                        }
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>Liste des membres ({lessThanTen(registeredList?.length)} / {lessThanTen(places)})</Title>
                        <Divider />
                        <Text>
                            {registeredList
                                ?.sort((a, b) => {
                                    if (a.username === b.username) {
                                        return a.id - b.id;
                                    }
                                    return a.username > b.username ? 1 : -1;
                                })
                                ?.map((registered, key) =>
                                    <List.Item
                                        key={key}
                                        style={styles.listItemChip}
                                        title={
                                            <Chip
                                                avatar={<Image source={{ uri: registered?.avatar }} />}
                                                style={styles.chipButton}
                                            >
                                                <Text
                                                    style={styles.chipText}
                                                >
                                                    {shortenText(registered?.username, 32)}
                                                </Text>
                                            </Chip>
                                        } />
                                )}
                        </Text>
                    </Card.Content>
                    {registeredWaitingList?.length > 0 &&
                        <>
                            <Divider style={styles.divider} />
                            <Card.Content>
                                <Title>Liste d'attente ({lessThanTen(registeredWaitingList?.length)})</Title>
                                <Divider />
                                <Text>
                                    {registeredWaitingList
                                        .sort((a, b) => {
                                            if (a.username === b.username) {
                                                return a.id - b.id;
                                            }
                                            return a.username > b.username ? 1 : -1;
                                        })
                                        .map((registeredWaiting, key) =>
                                            <List.Item
                                                key={key}
                                                style={styles.listItemChip}
                                                title={
                                                    <Chip
                                                        avatar={<Image source={{ uri: registeredWaiting?.avatar }} />}
                                                        style={styles.chipButton}
                                                    >
                                                        <Text
                                                            style={styles.chipText}
                                                        >
                                                            {shortenText(registeredWaiting?.username, 32)}
                                                        </Text>
                                                    </Chip>
                                                } />
                                        )}
                                </Text>
                            </Card.Content>
                        </>}
                    <Divider style={styles.divider} />
                    {comments?.length > 0 && <Card.Content>
                        <Title>Commentaires ({lessThanTen(comments?.length)})</Title>
                        {comments?.map((comment, key) =>
                            <View key={key}>
                                <Divider />
                                <View style={styles.commentBox}>
                                    <View style={styles.commentAvatar}>
                                        <Avatar.Image size={48} style={styles.avatarImage} source={comment?.avatar ? { uri: comment?.avatar } : require('../assets/logo_aos.png')} />
                                    </View>
                                    <View style={styles.commentText}>
                                        {comment?.text.length > 128 ?
                                            <Paragraph onPress={() => showDialog(comment)}>{shortenText(comment?.text, 128)}
                                                <Text style={styles.shortenText}> suite</Text>
                                            </Paragraph> :
                                            <Paragraph>{comment?.text}</Paragraph>
                                        }
                                    </View>
                                </View>
                            </View>)}
                    </Card.Content>}
                </Card>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <ScrollView>
                            <View style={styles.dialogTitleBox}>
                                <Avatar.Image style={styles.descriptionAvatarImage} source={textDialog?.avatar ? { uri: textDialog?.avatar } : { uri: photo }} />
                                <Dialog.Title style={styles.dialogTitle}>{textDialog?.username || 'Descriptif'}</Dialog.Title>
                            </View>
                            <Dialog.Content>
                                <Paragraph>{textDialog?.text || textDialog}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    color={colors.secondary}
                                    icon='close-circle'
                                    mode="contained"
                                    onPress={hideDialog}
                                    style={styles.dialogActionsButton}
                                >Fermer</Button>
                            </Dialog.Actions>
                        </ScrollView>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    activityTypeImage: {
        height: 48,
        marginRight: 12,
        width: 48,
    },
    avatarImage: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    chipButton: {
        backgroundColor: colors.secondary,
    },
    chipText: {
        color: colors.dark,
    },
    commentAvatar: {
        padding: 4,
    },
    commentBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    commentText: {
        flex: 1,
        justifyContent: 'center'
    },
    descriptionAvatarImage: {
        marginLeft: 24,
        marginVertical: 16,
    },
    dialogActionsButton: {
        elevation: 4,
    },
    dialogTitle: {
        color: colors.light,
    },
    dialogTitleBox: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        flexDirection: 'row',
    },
    divider: {
        borderColor: colors.primary,
        borderBottomWidth: 1,
    },
    listItemChip: {
        margin: 0,
        padding: 0,
    },
    shortenText: {
        color: colors.secondary,
        fontWeight: '700',
    }
})