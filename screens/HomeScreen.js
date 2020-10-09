import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoCatchPhrase}>
                <Image source={require('../assets/logo_aos.png')} />
                <Text>Allez, On Sort !</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        width: '100 %',
    },
    logoCatchPhrase: {
        alignItems: 'center',
    }
})