import React from 'react'
import { View, Text, Alert, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './EditProductScreenStyleSheet'
import global_styles from '../../../styles'
import Loader from '../../../components/Loader/Loader'

import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import Button from '../../../components/Button/Button'

import Navigator from '../../../Navigator'
import MediaUploader from '../../../components/MediaUploader/MediaUploader'
import ProductService from '../../../services/ProductService'

const EditProductScreen = (props) => {
    const _isNewProduct = props.params == "new"

    const [productData, setProductData] = React.useState({})
    const [productImage, setProductImage] = React.useState({})
    const [uploading, setUploading] = React.useState(false)
    
    React.useEffect(() => {
        async function fetchData() {
            let _product = _isNewProduct ? {
                product_name: "",
                product_category: "",
                product_quantity_stock: 0,
                product_units: "",
                product_image: {},
                product_price: 0
            } : { ...props.params }
    
            setProductData(_product)
            setProductImage(_product.product_image)
        }

        fetchData()
    }, [])

    const submitHandler = async () => {
        setUploading(true)

        let result = null
        if(_isNewProduct)
            result = await ProductService.instance.addNewProduct({...productData, product_image: productImage})
        
        else
            result = await ProductService.instance.updateProduct({...productData, product_image: productImage})

        setUploading(false)
        if(result) {
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
                            if(await ProductService.instance.removeProduct(productData._id)) {
                                setUploading(false)
                                Navigator.instance.goToProductManagement()
                            }
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
            <TouchableWithoutFeedback style={styles.loaderOverlay}>
                <Loader
                    loading={uploading}
                />
            </TouchableWithoutFeedback>
            

            <BackArrow onTouch={Navigator.instance.goToProductManagement}/>

            <MediaUploader
                media = {productImage}
                setMedia = {setProductImage}
            />

            <View style={[styles.formContainer]}>
                <Text style={[global_styles.text, styles.formText]}>Nombre del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewProduct ? 'ejemplo: Brocoli' : productData.product_name}
                        value = { productData.product_name}
                        onChangeText = { (text) => setProductData({...productData, product_name: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Catálogo del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewProduct ? 'ejemplo: Vegetales': productData.product_category}
                        value = { productData.product_category}
                        onChangeText = { (text) => setProductData({...productData, product_category: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Cantidad del Producto</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 3': String(productData.product_quantity_stock)}
                        value = { String(productData.product_quantity_stock)}
                        onChangeText = { (text) => setProductData({...productData, product_quantity_stock: Number(text)}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Unidad de Cantidad</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder = { _isNewProduct ? 'ejemplo: lbs' : productData.product_units}
                        value = { productData.product_units}
                        onChangeText = { (text) => setProductData({...productData, product_units: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio del Producto (Por unidad)</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        keyboardType = "numeric"
                        placeholder = { _isNewProduct ? 'ejemplo: 2.49' : String(productData.product_price)}
                        // value = { String(productData.product_price)}
                        onChangeText = { (text) => setProductData({...productData, product_price: Number(text)}) }
                    />
                </View>
            </View>

            {displayButtons()}

        </KeyboardAwareScrollView>
    )    
}

export default EditProductScreen