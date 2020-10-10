import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function CustomButton({ accessibilityHint, disabled, onPress, title }) {

    return (
        <TouchableOpacity
            accessibilityLabel={`Bouton - ${title}`}
            accessibilityHint={disabled ? accessibilityHint : null}
            onPress={onPress}
            style={disabled ? styles.customButtonContainerDiabled : styles.customButtonContainer}
        >
            <Text style={disabled ? styles.customButtonTextDisabled : styles.customButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
    customButtonContainer: {
        elevation: 4,
        backgroundColor: "#fb483e",
        borderRadius: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    customButtonContainerDiabled: {
        backgroundColor: "#dfdfdf",
        borderRadius: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    customButtonText: {
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    customButtonTextDisabled: {
        color: "#a2a2a2",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})