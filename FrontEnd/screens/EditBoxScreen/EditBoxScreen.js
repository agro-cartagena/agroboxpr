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

const EditBoxScreen = (props) => {
    let _isNewBox = props.params == "new",
        _box = _isNewBox ? {
            box_name: "",
            box_price: "",
            box_content: { }
        } : props.params

    const [boxData, changeBoxData] = React.useState(_box)

    const generateCards = (products) => {
        return products.map (product => 
                <View 
                    key={product.id} 
                    style={styles.productCardContainer} 
                >
                    <InteractiveProductCard
                        product={product}
                        onMinus={() => decreaseProductQuantity(product.name)}
                        onPlus={() => increaseProductQuantity(product.name)}
                        onText={(text) => changeProductQuantity(product.name, text)}
                        placeholder={boxData.box_content[product.name] || 0}
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

    const increaseProductQuantity = (product_id) => {
        let product_quantity = boxData.box_content[product_id]

        // Product does not yet exist in content list
        if (typeof product_quantity == "undefined")
            boxData.box_content[product_id] = 1
            
        else if (product_quantity == 99)
            alert("Cantidad máxima excedida.")
            
        // Product already exists in content list
        else
            boxData.box_content[product_id] += 1

        alert(JSON.stringify(boxData))
    }

    const decreaseProductQuantity = (product_id) => {
        let product_quantity = boxData.box_content[product_id]

        if (typeof product_quantity != "undefined")
            product_quantity == 1 ? delete boxData.box_content[product_id] : boxData.box_content[product_id] -= 1
        
        alert(JSON.stringify(boxData))
    }

    const changeProductQuantity = (product_id, newQuantity) => {
        boxData.box_content[product_id] = Number(newQuantity)
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
                <Button
                    text="Guardar"
                    onTouch={() => alert(JSON.stringify(boxData))}
                />
            </View>
        </ScrollView>
    )
}

export default EditBoxScreen