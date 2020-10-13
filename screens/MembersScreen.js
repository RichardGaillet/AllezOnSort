import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper'
import MasonryList from "react-native-masonry-list"
import members from "../mocks/members.json"
import colors from '../config/colors'

export default function MembersScreen() {

    const images = members
        .map(member => {
            const { personalInformations, username } = member
            const { photo } = personalInformations
            return (
                {
                    accessibilityLabel: `Photo de ${username}`,
                    source: {
                        uri: photo,
                        data: member
                    }
                }
            )
        })

    const [masonryListColumns, setMasonryListColumns] = useState(2)

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key.toString(), value.toString());
            setMasonryListColumns(value);

        } catch (error) {
            console.log("storeData -> error", error)
        }
    };

    const retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key.toString());
            if (value !== null) {
                setMasonryListColumns(Number(value))
            }
        } catch (error) {
            console.log("retrieveData -> error", error)
        }
    };

    // NOTE Gestion du FAB
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    useEffect(() => {
        retrieveData('masonryListColumns')
    }, [])

    return (
        <Provider>
            <MasonryList
                accessible
                accessibilityLabel="Éventail d'images"
                backgroundColor={colors.secondary}
                columns={masonryListColumns}
                images={images}
            />
            <Portal>
                <FAB.Group
                    accessibilityLabel="Modifier le nombre de colonnes"
                    fabStyle={{ backgroundColor: colors.primary }}
                    open={open}
                    icon={open ? `chevron-up` : 'format-columns'}
                    actions={[
                        {
                            accessibilityLabel: "Affichage sur une colonne",
                            icon: 'numeric-1',
                            label: '1 colonne',
                            onPress: () => storeData("masonryListColumns", 1),
                        },
                        {
                            accessibilityLabel: "Affichage sur deux colonnes",
                            icon: 'numeric-2',
                            label: '2 colonnes',
                            onPress: () => storeData("masonryListColumns", 2),
                        },
                        {
                            accessibilityLabel: "Affichage sur trois colonnes",
                            icon: 'numeric-3',
                            label: '3 colonnes',
                            onPress: () => storeData("masonryListColumns", 3),
                        },
                        {
                            accessibilityLabel: "Affichage sur quatre colonnes",
                            icon: 'numeric-4',
                            label: '4 colonnes',
                            onPress: () => storeData("masonryListColumns", 4),
                        },
                        {
                            accessibilityLabel: "Affichage sur cinq colonnes",
                            icon: 'numeric-5',
                            label: '5 colonnes',
                            onPress: () => storeData("masonryListColumns", 5),
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </Provider>
    )
}
