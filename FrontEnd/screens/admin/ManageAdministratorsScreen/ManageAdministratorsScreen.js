import React from 'react'
import { View, Text, SectionList, TouchableOpacity, TextInput, 
        Image, Linking, Platform, LogBox, Alert } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './ManageAdministratorsScreenStyleSheet'
import global_styles from '../../../styles'
import BackArrow from '../../../components/BackArrow/BackArrow'

import Navigator from '../../../Navigator'
import AdminService from '../../../services/AdminService'

// Ignore harmless warning about redundant ScrollView.
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const ManageAdministratorsScreen = () => {

    const [admins, setAdmins] = React.useState({})
    const [textInput, changeTextInput] = React.useState("")

    React.useEffect(() => {
        async function fetchData() {
            setAdmins(await AdminService.instance.getAdmins())
        }

        fetchData()
    }, [])

    const getSections = () => { 
        return Object.keys(admins).map((section) => { return {title: section, data: admins[section]} }) 
    }

    const renderItem =({item}) => {
        const askToCallAdmin = () => {
            let phone_number = Platform.OS == 'android' ? `tel:${item.phone}` : `telprompt:${item.phone}`

            Linking.canOpenURL(phone_number)
                .then(supported => {
                    if (!supported) {
                        alert("Teléfono desactivado. Verifique su dispositivo.")
                    } else {
                        return Linking.openURL(phone_number); 
                    }
                })
                .catch(() => alert("Ha ocurrido un error."));
        }

        const askToRemoveAdmin = () => {
            Alert.alert(
                `¿Seguro que desea remover los privilegios administrativos de ${item.full_name}?`, '',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    }, 
                    {
                        text: 'Remover',
                        onPress: async () => {
                            if(await AdminService.instance.removeAdmin(item._id))
                                setAdmins(await AdminService.instance.getAdmins())
                            
                            else 
                                alert("Ha ocurrido un error. Por favor intente de nuevo.")
                        }
                    }
                ]
            )
        }

        return (
            <TouchableOpacity
                onPress={askToCallAdmin}
                onLongPress={askToRemoveAdmin}
            >
                <Text style={styles.item}>{item.full_name}</Text>
            </TouchableOpacity>
        )
    }

    const askToAddAdmin = () => {
        if(!textInput)
            alert("Entrada vacía.")

        else {
            Alert.alert(
                `¿Seguro que desea darle privilegios administrativos a ${textInput}?`, '',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
                            if(await AdminService.instance.addAdmin(textInput)){
                                changeTextInput("")
                                setAdmins(await AdminService.instance.getAdmins()) 
                            }

                            else 
                                alert("Usuario no existe en la base de datos.")
                        }
                    }
                ]
            )
        }
    }

    return (
        <KeyboardAwareScrollView>
            <BackArrow onTouch={Navigator.instance.goToMenu}/>
            
            <Text style={styles.header}>Administradores de AgroBox</Text>

            <View style={styles.sectionContainer}>
                <SectionList
                        sections={getSections()}
                        renderItem={renderItem}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    />  
            </View>

            <Text style={styles.subheader}>Añadir Administrador Nuevo:</Text>

            <View style={[styles.searchContainer, global_styles.shadow]}>
                <TextInput 
                    onChangeText = {(text) => changeTextInput(text)}
                    value={textInput}
                    style={styles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.iconContainer} onPress={askToAddAdmin}>
                    <Image style={styles.icon} source={require('../../../assets/icons/Search.png')}/>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ManageAdministratorsScreen