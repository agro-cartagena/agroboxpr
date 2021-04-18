import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import Button from '../../../components/Button/Button'

import DropDown from '../../../components/DropDown/DropDown'
import InteractiveProductCard from '../../../components/InteractiveProductCard/InteractiveProductCard'
import MediaUploader from '../../../components/MediaUploader/MediaUploader'

import styles from './EditBoxScreenStyleSheet'
import global_styles from '../../../styles'
import { goToBoxManagement } from '../../../Navigator'

import ProductService from '../../../services/ProductService'
import BoxService from '../../../services/BoxService'
import CloudinaryService from '../../../services/CloudinaryService'

const EditBoxScreen = (props) => {
    let _isNewBox = props.params == "new"

    const [boxData, setBoxData] = React.useState({})
    const [productCatalog, setProductCatalog] = React.useState({})
    const [boxImage, setBoxImage] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {            
            let _box = _isNewBox ? {
                box_name: '',
                box_price: '',
                box_image: '',
                box_content: []
            } : {
                ...props.params, 
                box_content: await BoxService.instance.getBoxContent()
            }
            setBoxData(_box)
            setBoxImage(_box.box_image)
            setProductCatalog(await ProductService.instance.getProductCatalog())
        }

        fetchData()
    }, [])

    const generateCards = (products) => {
        const increaseProductQuantity = (target_product) => {
            let product = boxData.box_content.find((item) => item._id == target_product._id)
    
            // Product does not yet exist in content list.
            if(! product){
                boxData.box_content.push({
                    ...target_product, 
                    product_quantity_box: 1
                })
            }
    
            // Product already exists in content list.
            else 
                product.product_quantity_box += 1
        }
    
        const decreaseProductQuantity = (target_product) => {
            let product = boxData.box_content.find((item) => item._id == target_product._id)
    
            //Product already exists in content list.
            if(product){
                if(product.product_quantity_box <= 1)
                    boxData.box_content = boxData.box_content.filter((product) => product._id != target_product._id)
    
                else
                    product.product_quantity_box -= 1
            }       
        }
    
        const changeProductQuantity = (target_product, newQuantity) => {
            let product = boxData.box_content.find((item) => item._id == target_product._id)

            // Product already exists in content list.
            if(product){
                if(newQuantity == 0)
                    boxData.box_content = boxData.box_content.filter((product) => product._id != target_product._id)
                
                else
                    product.product_quantity_box = newQuantity
            }

            // Product does not yet exist in content list.
            else if (newQuantity > 0){
                boxData.box_content.push({
                    ...target_product,
                    product_quantity_box: newQuantity
                })
            }
        }

        const fetchPlaceholder = (target_product) => {
            let product = boxData.box_content.find((item) => item._id == target_product._id)

            if(product)
                return product.product_quantity_box

            return 0
        }

        return products.map (product => 
                <View 
                    key={product._id} 
                    style={styles.productCardContainer} 
                >
                    <InteractiveProductCard
                        product={product}
                        onMinus={() => decreaseProductQuantity(product)}
                        onPlus={() => increaseProductQuantity(product)}
                        onText={(text) => changeProductQuantity(product, text)}
                        placeholder = {fetchPlaceholder(product)}
                    />
                </View> 
            )
    }

    const displayDropMenus = () => {
        return Object.keys(productCatalog).map((category) => 
            <View key={category} style={styles.dropDownContainer}>
                <DropDown
                    title={category}
                    list={generateCards(productCatalog[category])}
                />
            </View>
        )
    }

    const displayDeleteButton = () => {
        if(_isNewBox == false){
            // Define function handler that uses service to DELETE here.
            
            return (
                <View style={styles.button}>
                    <Button
                        text="Eliminar"
                        style={ _isNewBox ? {display: 'none'} : {backgroundColor: 'red'} }
                        // onPress={deleteHandler}
                    />
                </View>
            )
        }
    }

    const submitHandler = async () => {

        // let form = new FormData()
        // form.append('file', boxImage)
        // form.append('caption', "Image upload test")

        // let payload = {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/multipart-formdata'
        //     },
        //     body: JSON.stringify(form)
        // }

        // fetch('http:/10.0.0.6:5000/api/image/upload', payload)
        //     .then((response) => {
        //         alert("Resolved")
        //     })
        //     .catch((error) => {
        //         alert("Rejected")
        //     })

        let result = null
        
        if(_isNewBox)
            result = await BoxService.instance.addNewBox({
                ...boxData, 
                box_image: boxImage
            })

        else 
            result = await BoxService.instance.updateBox({
                ...boxData, 
                box_image: boxImage
            })

        if(result){
            alert("Caja ha sido guardada.")
            goToBoxManagement()
        }
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToBoxManagement}/>
            </View>

            <MediaUploader
                media = {boxImage}
                setMedia = {setBoxImage}
            />

            <View style={styles.formContainer}>
                <Text style={[global_styles.text, styles.formText]}>Nombre de la Caja</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewBox? 'ejemplo: AgroBox' : boxData.box_name}
                        value = {boxData.box_name}
                        onChangeText = { (text) => setBoxData({...boxData, box_name: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio de la Caja</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewBox ? 'ejemplo: 45.00': String(boxData.box_price) }
                        value = {boxData.box_price}
                        onChangeText = { (text) => setBoxData({...boxData, box_price: text}) }
                    />
                </View>
            </View>

            <Text style={[global_styles.text, styles.header]}>Contenido:</Text>
            <View style={styles.dropDownContainer}>
                {displayDropMenus()}
            </View>

            <View style={styles.buttonContainer}>
                {displayDeleteButton()}
                <View style={styles.button}>
                    <Button
                        text="Guardar"
                        onTouch={submitHandler}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EditBoxScreen