import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../../components/Button/Button'

import global_styles from '../../../styles'
import styles from './ManageInventoryScreenStyleSheet'
import BackArrow from '../../../components/BackArrow/BackArrow'
import Logo from '../../../components/Logo/Logo'

import { goToProductManagement, goToBoxManagement, goToMenu } from '../../../Navigator'

const InventoryManagementScreen = () => {
    return(
        <View style={[global_styles.screen]}>
            <BackArrow onTouch={() => goToMenu()}/>

            <View style={styles.logoContainer}>
                <Logo/>  
            </View>

            <Text style={[global_styles.text, styles.header]}>Manejar Inventario</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        text="Manejar Productos"
                        onTouch={goToProductManagement}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        text="Manejar Cajas"
                        onTouch={goToBoxManagement}
                    />
                </View>
            </View>
        </View>
    )
}

export default InventoryManagementScreen