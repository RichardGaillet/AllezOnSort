import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoCatchPhrase}>
                <Image
                    accessibilityLabel={'Logo AOS'}
                    source={require('../assets/logo_aos.png')}
                />
                <Text>Allez, On Sort !</Text>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button
                        accessibilityLabel={'Se connecter'}
                        onPress={() => { alert('Se connecter') }}
                        title={'Se connecter'}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        accessibilityLabel={'S\'inscrire'}
                        onPress={() => { alert('S\'inscrire') }}
                        title={'S\'inscrire'}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        padding: 8,
    },
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