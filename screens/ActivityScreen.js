import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Card, Chip, Divider, List, Paragraph, Text, Title } from 'react-native-paper'
import colors from '../config/colors'
import { lessThanTen, shortenText } from '../config/format'

export default function ActivityScreen(activity) {

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
                    <Title>Descriptif de la sortie</Title>
                    <Divider />
                    <Paragraph>{shortenText(description, 128)}</Paragraph>
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
                            <View style={styles.commentBox} key={key}>
                                <View style={styles.commentAvatar}>
                                    <Avatar.Text size={48} style={styles.avatarImage} label={comment.username ? comment.username.substring(0, 1) + comment.username.substring(comment.username.length - 1) : '?'} />
                                </View>
                                <View style={styles.commentText}>
                                    <Paragraph>{shortenText(comment.text, 128)}</Paragraph>
                                </View>
                            </View>
                        </>)}
                </Card.Content>}
                <Divider style={styles.divider} />
                {/* <Card.Actions>
                <Button icon="close-outline" mode="contained" onPress={() => console.log('Pressed')} />
                <Button icon="check-outline" mode="contained" onPress={() => console.log(props)} />
            </Card.Actions> */}
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    avatarImage: {
        backgroundColor: colors.primary
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
    divider: {
        borderColor: '#fb483e',
        borderBottomWidth: 2,
    }
})