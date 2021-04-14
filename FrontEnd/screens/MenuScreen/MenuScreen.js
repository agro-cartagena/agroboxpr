import React from 'react'
import { View, Text, Alert } from 'react-native'

import styles from './MenuScreenStyleSheet'

import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'

import UserService from '../../services/UserService'

const MenuScreen = () => {

    const [isAuthenticated, setAuth] = React.useState(UserService.instance.isAuthenticated())
    const [isAdmin, setAdmin] = React.useState(UserService.instance.isAdmin())

    const logout = () => {
        Alert.alert(
            "¿Seguro que desea cerrar sesión?", "",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        UserService.instance.logout()
                        setAuth(false)
                    }
                }
            ]
        )
    }

    return(
        <View>
            <View style={styles.logoContainer}>
                <Logo/>
            </View>

            <View style={styles.buttonContainer}>

                <View style={styles.button}>
                    <Button
                        text="Comunícate con Nosotros"
                        style={{backgroundColor: '#801A35500'}}
                    />
                </View>

                <View style={isAuthenticated ? {} : {display: 'none'}}>
                    {/* Admin options */}
                    <View style={isAdmin ? {} : {display: 'none'}}>
                        <View style={styles.button}>
                            <Button
                                text="Manejar Inventario"
                                style={{backgroundColor: '#801A3500'}}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                text="Manejar Administradores"
                                style={{backgroundColor: '#801A3500'}}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                text="Revisar Órdenes Pendientes"
                                style={{backgroundColor: '#801A3500'}}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                text="Revisar Comentarios Pendientes"
                                style={{backgroundColor: '#801A3500'}}
                            />
                        </View>
                    </View>
    
                    <View style={styles.button}>
                        <Button
                            text="Cerrar Sesión"
                            style={{backgroundColor: '#801A3500'}}
                            onTouch={() => logout()}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MenuScreen