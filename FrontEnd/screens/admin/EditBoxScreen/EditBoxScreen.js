import React from 'react'
import { ScrollView, View, Text } from 'react-native'

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
                box_image: {
                    id: '',
                    url: ''
                },
                box_content: { }
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
        return products.map (product => 
                <View 
                    key={product.product_id} 
                    style={styles.productCardContainer} 
                >
                    <InteractiveProductCard
                        product={product}
                        onMinus={() => decreaseProductQuantity(product)}
                        onPlus={() => increaseProductQuantity(product)}
                        onText={(text) => changeProductQuantity(product, text)}
                        placeholder={typeof boxData.box_content[product.product_name]=="undefined" ? 0 : boxData.box_content[product.product_name]['product_quantity_box']}
                    />
                </View> 
            )
    }

    const displayDropMenus = () => {
        let _dropMenus = []

        for (category in productCatalog){
            _dropMenus.push(
                <View key={category} style={styles.dropDownContainer}>
                    <DropDown
                        title={category}
                        list={generateCards(productCatalog[category])}
                    />
                </View>
            )           
        }

        return _dropMenus
    }

    const increaseProductQuantity = (product) => {
        let product_key = product.product_name,
            product_data = boxData.box_content[product_key]

        // Product does not yet exist in content list
        if (typeof product_data == "undefined")
            boxData.box_content[product_key] = {
                ... product,
                product_quantity_box: 1
            }
    
        // Product already exists in content list
        else
            product_data.product_quantity_box += 1
    }

    const decreaseProductQuantity = (product) => {
        let product_key = product.product_name,
            product_data = boxData.box_content[product_key]

        if (typeof product_data != "undefined"){
            if(product_data.product_quantity_box == 1)
                delete boxData.box_content[product_key]

            else
                product_data.product_quantity_box -= 1
        }        
    }

    const changeProductQuantity = (product_id, newQuantity) => {
        if (newQuantity == 0)
            delete boxData.box_content[product_id]
            
        else
            boxData.box_content[product_id] = newQuantity
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
        // Image was changed, hence needs to be uploaded.
        if(boxImage.url != boxData.box_image.url){
            // Previous image existed, hence delete it from cloud
            // if(boxImage.id)
                // await CloudinaryService.instance.deleteImage(boxImage.id)
            

            try {
                let result = await CloudinaryService.instance.uploadImage(boxImage)
                // setBoxImage(result)
            } catch (error) { alert(error.message) }
        }
    }

    return(
        <ScrollView>
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
                        onChangeText = { (text) => setBoxData({...boxData, box_name: text}) }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio de la Caja</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewBox ? 'ejemplo: 45.00': String(boxData.box_price) }
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
        </ScrollView>
    )
}

export default EditBoxScreen