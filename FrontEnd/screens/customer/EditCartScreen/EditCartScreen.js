import React from 'react'
import {Text,View, ScrollView} from 'react-native'
import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'

import { goToCart, goToPayment } from '../../../Navigator'
import styles from './EditCartScreenStyleSheet'
import global_styles from '../../../styles'

const EditCartScreen = () => {
    return(
        <ScrollView>
            <View>
                <View style={styles.arrowContainer}>
                    <BackArrow onTouch={goToCart} />
                </View>
                <Text> EditCart is working!</Text>
            </View>
        </ScrollView>
    )
}
export default EditCartScreen