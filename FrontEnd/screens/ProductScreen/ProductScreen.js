import React from 'react'
import { ScrollView, View, Image, Text, TextInput } from 'react-native'

import styles from './ProductScreenStyleSheet'
import global_styles from '../../styles'

import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

const ProductScreen = () => {
    return (
        <ScrollView style={global_styles.screen}>
            <BackArrow/>

            <View style={[styles.imageContainer, styles.radius]}>
                <Image
                    source={require('../../assets/products/Broccoli.jpeg')}
                    style={[styles.productImage, styles.radius]}
                />
            </View>

            <View style={[styles.formContainer]}>
                <Text style={[global_styles.text, styles.formText]}>Nombre del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'ejemplo: Brocoli'

                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Catálogo del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'ejemplo: Vegetales'

                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Cantidad del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = 'ejemplo: 3'
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Unidad de Cantidad</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder = 'ejemplo: lbs'
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = 'ejemplo: 2.49'
                    />
                </View>
            </View>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button text="Guardar"/>
            </View>

        </ScrollView>
    )    
}

export default ProductScreen