import React from 'react'
import { ScrollView, View, Image, Text, TextInput } from 'react-native'

import styles from './EditProductScreenStyleSheet'
import global_styles from '../../styles'

import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

import { goToProductManagement } from '../../Navigator'
import MediaUploader from '../../components/MediaUploader/MediaUploader'

const ProductScreen = (props) => {
    let _isNewProduct = props.params == "new", 
        _product = _isNewProduct ? {
            product_name: "",
            product_category: "",
            product_quantity_stock: "",
            product_units: "",
            product_price: ""
        } : props.params

    const [productData, changeProductData] = React.useState(_product)
    
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
                        placeholder = { _isNewProduct ? 'ejemplo: Brocoli' : productData.product_name}
                        onChangeText = { (text) => changeProductData({...productData, product_name: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Catálogo del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewProduct ? 'ejemplo: Vegetales': productData.product_category}
                        onChangeText = { (text) => changeProductData({...productData, product_category: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Cantidad del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 3': String(productData.product_quantity_stock)}
                        onChangeText = { (text) => changeProductData({...productData, product_quantity_stock: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Unidad de Cantidad</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder = { _isNewProduct ? 'ejemplo: lbs' : productData.product_units}
                        onChangeText = { (text) => changeProductData({...productData, product_units: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio del Producto (Por unidad)</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 2.49' : String(productData.product_price)}
                        onChangeText = { (text) => changeProductData({...productData, product_price: text}) }
                    />
                </View>
            </View>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button text="Guardar" onTouch={() => alert(JSON.stringify(productData))}/>
            </View>

        </ScrollView>
    )    
}

export default ProductScreen