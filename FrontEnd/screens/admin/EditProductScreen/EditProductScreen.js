import React from 'react'
import { View, Text, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './EditProductScreenStyleSheet'
import global_styles from '../../../styles'

import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import Button from '../../../components/Button/Button'

import Navigator from '../../../Navigator'
import MediaUploader from '../../../components/MediaUploader/MediaUploader'
import ProductService from '../../../services/ProductService'

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
    const [productImage, changeProductImage] = React.useState('')
    
    const submitHandler = async () => {
        let result = null

        if(_isNewProduct)
            result = await ProductService.instance.addNewProduct(productData)
        
        else
            result = await ProductService.instance.updateProduct(productData)

        if(result){
            alert("Producto ha sido guardado.")
            Navigator.instance.goToProductManagement()
        }
    }

    const displayButtons = () => {
        const askToRemoveProduct = () => {
            Alert.alert(
                `¿Desea remover ${productData.product_name} del sistema?`, '',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Remover',
                        onPress: async () => {
                            if(await ProductService.instance.removeProduct(productData._id))
                                Navigator.instance.goToProductManagement()
                        }
                    }
                ]
            )
        }

        const getDeleteButton = () => {
            if(!_isNewProduct)
                return (
                    <View style={styles.button}>
                        <Button
                            text="Eliminar"
                            style={{backgroundColor: 'gray'}}
                            onTouch={askToRemoveProduct}
                        />
                    </View>)
        }

        return ( 
            <View style={styles.buttonContainer}>
                {getDeleteButton()}

                <View style={styles.button}>
                    <Button
                        text="Guardar"
                        style={{backgroundColor: '#EAC71D'}}
                        onTouch = {submitHandler}
                    />
                </View>
            </View>)
    }

    return (
        <KeyboardAwareScrollView>
            <BackArrow onTouch={Navigator.instance.goToProductManagement}/>

            <MediaUploader
                media = {productImage}
                setMedia = {changeProductImage}
            />

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
                        onChangeText = { (text) => changeProductData({...productData, product_quantity_stock: Number(text)}) }
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
                        onChangeText = { (text) => changeProductData({...productData, product_price: Number(text)}) }
                    />
                </View>
            </View>

            {/* <View style={[global_styles.container, styles.buttonContainer]}>
                <Button text="Guardar" onTouch={submitHandler}/>
            </View> */}
            {displayButtons()}

        </KeyboardAwareScrollView>
    )    
}

export default ProductScreen