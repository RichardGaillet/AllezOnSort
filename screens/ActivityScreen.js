import React, { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Card, Dialog, Divider, List, Paragraph, Portal, Provider, Text, Title } from 'react-native-paper'
import colors from '../config/colors'
import { lessThanTen, shortenText } from '../config/format'

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
    } = activity.route.params.activity

    const RightContent = () => <Avatar.Image style={styles.avatarImage} source={require('../assets/logo_aos.png')} />

    return (
        <Provider>
            <ScrollView>
                <Card>
                    <Card.Cover source={photo ? { uri: photo } : { uri: 'https://picsum.photos/700' }} />
                    <Divider style={styles.divider} />
                    <Card.Title title={title} subtitle={`par ${organizer}`} right={RightContent} />
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>{`le ${timestamp} à ${timestamp}`}</Title>
                        <Divider />
                        <Paragraph>{location}</Paragraph>
                        {locationDetails && <Paragraph>Détails : {locationDetails}</Paragraph>}
                    </Card.Content>
                    {tags.length > 0 && <Card.Content>
                        <Text>{tags.sort().map((tag, key) => <List.Item key={key} title={'#' + shortenText(tag, 32)} />)}</Text>
                    </Card.Content>}
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>Descriptif</Title>
                        <Divider />
                        {description.length > 128 ?
                            <Paragraph onPress={() => showDialog(description)}>{shortenText(description, 128)} suite</Paragraph> :
                            <Paragraph>{description}</Paragraph>
                        }
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Content>
                        <Title>Liste des membres ({lessThanTen(registeredList.length)} / {lessThanTen(places)})</Title>
                        <Divider />
                        <Text>{registeredList.map((name, key) => <List.Item key={key} title={name} />)}</Text>
                    </Card.Content>
                    {registeredWaitingList.length > 0 &&
                        <>
                            <Divider style={styles.divider} />
                            <Card.Content>
                                <Title>Liste d'attente ({lessThanTen(registeredWaitingList.length)})</Title>
                                <Divider />
                                <Text>{registeredWaitingList.map((name, key) => <List.Item key={key} title={name} />)}</Text>
                            </Card.Content>
                        </>}
                    <Divider style={styles.divider} />
                    {comments.length > 0 && <Card.Content>
                        <Title>Commentaires ({comments.length})</Title>
                        {comments.map((comment, key) =>
                            <>
                                <Divider />
                                <View style={styles.commentBox}>
                                    <View style={styles.commentAvatar}>
                                        <Avatar.Image size={48} style={styles.avatarImage} source={comment.avatar ? { uri: comment.avatar } : require('../assets/logo_aos.png')} />
                                        {/* <Avatar.Text size={48} style={styles.avatarImage} label={comment.username ? comment.username.substring(0, 1) + comment.username.substring(comment.username.length - 1) : '?'} /> */}
                                    </View>
                                    <View style={styles.commentText}>
                                        {comment.text.length > 128 ?
                                            <Paragraph onPress={() => showDialog(comment)} key={key}>{shortenText(comment.text, 128)} suite</Paragraph> :
                                            <Paragraph>{comment.text}</Paragraph>
                                        }
                                    </View>
                                </View>
                            </>)}
                    </Card.Content>}
                    {/* <Card.Actions>
                <Button icon="close-outline" mode="contained" onPress={() => console.log('Pressed')} />
                <Button icon="check-outline" mode="contained" onPress={() => console.log(props)} />
            </Card.Actions> */}
                </Card>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <ScrollView>
                            <View style={styles.dialogTitleBox}>
                                <Avatar.Image style={styles.avatarImage} source={textDialog?.avatar ? { uri: textDialog?.avatar } : { uri: photo }} />
                                <Dialog.Title>{textDialog?.username || 'Descriptif'}</Dialog.Title>
                            </View>
                            <Dialog.Content>
                                <Paragraph>{textDialog?.text || textDialog}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    color={colors.secondary}
                                    onPress={hideDialog}
                                    title='Fermer'
                                />
                            </Dialog.Actions>
                        </ScrollView>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    avatarImage: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
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
    dialogTitle: {
        flex: 0.5,
        justifyContent: 'center',
    },
    dialogTitleBox: {
        flexDirection: 'row',
        padding: 8,
    },
    divider: {
        borderColor: colors.secondary,
        borderBottomWidth: 2,
    }
})