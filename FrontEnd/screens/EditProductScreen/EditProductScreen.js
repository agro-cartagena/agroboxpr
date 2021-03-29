import React from 'react'
import { ScrollView, View, Image, Text, TextInput } from 'react-native'

import styles from './EditProductScreenStyleSheet'
import global_styles from '../../styles'

import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

import { goToProductManagement } from '../../Navigator'

const ProductScreen = (props) => {
    let _isNewProduct = props.params == "new", 
        _product = _isNewProduct ? {
            name: "",
            catalog: "",
            quantity: "",
            units: "",
            price: ""
        } : props.params

    const [formData, changeFormData] = React.useState(_product)
    
    return (
        <ScrollView style={global_styles.screen}>
            <BackArrow onTouch={goToProductManagement}/>

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
                        placeholder = { _isNewProduct ? 'ejemplo: Brocoli' : formData.name}
                        onChangeText = { (text) => formData.name = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Catálogo del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewProduct ? 'ejemplo: Vegetales': formData.catalog}
                        onChangeText = { (text) => formData.catalog = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Cantidad del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 3': String(formData.quantity)}
                        onChangeText = { (text) => formData.quantity = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Unidad de Cantidad</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder = { _isNewProduct ? 'ejemplo: lbs' : formData.units}
                        onChangeText = { (text) => formData.units = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio del Producto (Por unidad)</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 2.49' : String(formData.price)}
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