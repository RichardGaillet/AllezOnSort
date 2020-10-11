import React from 'react'
import { Avatar, Card, Paragraph, Title } from 'react-native-paper'

export default function ActivityScreen(activity) {

    const { timestamp, title, registered, places, organizer } = activity.route.params.activity

    const available = places - registered

    const RightContent = () => <Avatar.Image source={require('../assets/logo_aos.png')} />

    return (
        <Card>
            <Card.Title title={title} subtitle={`par ${organizer}`} right={RightContent} />
            <Card.Content>
                <Title>{`le ${timestamp} à ${timestamp}`}</Title>
                <Paragraph>{`${registered} inscrits sur ${places} places`} - {available === 0 ? 'complet' : `reste ${available} places`}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            {/* <Card.Actions>
                <Button icon="close-outline" mode="contained" onPress={() => console.log('Pressed')} />
                <Button icon="check-outline" mode="contained" onPress={() => console.log(props)} />
            </Card.Actions> */}
        </Card>
    )
}