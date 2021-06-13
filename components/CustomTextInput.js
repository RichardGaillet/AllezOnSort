import React from 'react'
import { TextInput } from 'react-native-paper';
import colors from '../config/colors';

function CustomTextInput(props) {

    const {
        color, disabled, editable, error, keyboard, label, maxLength, multiline,
        numberOfLines, onBlur, onChangeText, onFocus, returnKeyType, right, style, value
    } = props;

    return (
        <TextInput
            color={color || colors.light}
            dense
            disabled={disabled}
            editable={editable}
            error={error}
            keyboardType={keyboard || 'default'}
            label={label}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onFocus={onFocus}
            returnKeyType={returnKeyType}
            right={right}
            style={style}
            value={value}
        />
    )
}

export default CustomTextInput
