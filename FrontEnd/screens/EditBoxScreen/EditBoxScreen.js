import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'

import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import DropDown from '../../components/DropDown/DropDown'

import InteractiveProductCard from '../../components/InteractiveProductCard/InteractiveProductCard'

import styles from './EditBoxScreenStyleSheet'
import global_styles from '../../styles'
import { goToBoxManagement } from '../../Navigator'

import catalog from '../../db_mockup/product.catalog.db'
import box_content from '../../db_mockup/box.content.db'

const EditBoxScreen = (props) => {
    let _isNewBox = props.params == "new",
        _box = _isNewBox ? {
            box_name: "",
            box_price: "",
            box_content: { }
        } : { ...props.params, box_content: box_content }    // fetch box_content from API

    const [boxData, changeBoxData] = React.useState(_box)

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

        for (category in catalog){
            _dropMenus.push(
                <View key={category} style={styles.dropDownContainer}>
                    <DropDown
                        title={category}
                        list={generateCards(catalog[category])}
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
        if(!_isNewBox)
            return (
                <View style={styles.button}>
                    <Button
                        text="Eliminar"
                        style={ _isNewBox ? {display: 'none'} : {backgroundColor: 'red'} }
                    />
                </View>
            )
    }

    return(
        <ScrollView>
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToBoxManagement}/>
            </View>

            <View style={[styles.imageContainer, styles.radius]}>
                <Image
                    source={require('../../assets/products/Broccoli.jpeg')}
                    style={[styles.productImage, styles.radius]}
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={[global_styles.text, styles.formText]}>Nombre de la Caja</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewBox? 'ejemplo: AgroBox' : boxData.box_name}
                        onChangeText = { (text) => boxData.box_name = text }
                    />
                </View>

                <Text style={[global_styles.text, styles.formText]}>Precio de la Caja</Text>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = { _isNewBox ? 'ejemplo: 45.00': String(boxData.box_price) }
                        onChangeText = { (text) => boxData.box_price = text }
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
                        onTouch={() => alert(JSON.stringify(boxData))}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default EditBoxScreen