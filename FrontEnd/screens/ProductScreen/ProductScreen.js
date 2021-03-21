import React from 'react'
import { ScrollView, View, Image, Text, TextInput } from 'react-native'

import styles from './ProductScreenStyleSheet'
import global_styles from '../../styles'

import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

const ProductScreen = (props) => {
    let _isNewProduct, _product

    if(props.params == "new"){
        _isNewProduct = true;
        _product = {
            name: "",
            catalog: "",
            quantity: "",
            units: "",
            price: "",
            image: ""
        }
    }
    else {
        _isNewProduct = false
        _product = props.params
    }

    const [formData, changeFormData] = React.useState(_product)
    
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
                        placeholder = { _isNewProduct ? 'ejemplo: Brocoli' : "viejo"}
                        onChangeText = { (text) => formData.name = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Catálogo del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewProduct ? 'ejemplo: Vegetales': "viejo"}
                        onChangeText = { (text) => formData.catalog = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Cantidad del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 3': "viejo"}
                        onChangeText = { (text) => formData.quantity = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Unidad de Cantidad</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder = { _isNewProduct ? 'ejemplo: lbs' : "viejo"}
                        onChangeText = { (text) => formData.units = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio del Producto (Por unidad)</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 2.49' : "viejo"}
                        onChangeText = { (text) => formData.price = text }
                    />
                </View>
            </View>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button text="Guardar" onTouch={() => alert(JSON.stringify(formData))}/>
            </View>

        </ScrollView>
    )    
}

export default ProductScreen