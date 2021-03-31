import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Card } from 'react-native-elements'
import Button from '../../components/Button/Button'

import styles from './ViewBoxScreenStyleSheet';
import global_styles from '../../styles'
import { goToHome } from '../../Navigator'

import ProductCard from '../../components/ProductCard/ProductCard'
import InteractiveProductCard from '../../components/InteractiveProductCard/InteractiveProductCard'
import BoxService from '../../services/BoxService'
import CartService from '../../services/CartService'

import box_content from '../../db_mockup/box.content.db'
import catalog from '../../db_mockup/product.catalog.db'
import PlusMinus from '../../components/PlusMinus/PlusMinus'
import BackArrow from '../../components/BackArrow/BackArrow'
import DropDown from '../../components/DropDown/DropDown'

// Route parameters are stored in props.params object
// i.e., alert(props.params.box_name)
const BoxScreen = (props) => {
    let _isBuildYourBox = props.params.box_name.includes("Crea")

    // Box Data to be added to Cart. Default value is 1.
    const [boxData, changeBoxData] = React.useState({
        ...props.params,
        box_quantity: 1,
        box_accumulated_price: _isBuildYourBox ? 0 : props.params.box_price,
        box_content: _isBuildYourBox ? {} : box_content  // fetch box_content from API with props.params.box_id
    })

    const verifyQuantity = () => {
        alert(JSON.stringify(boxData.box_content))
        // let quantity = boxData.box_quantity
        // alert(quantity)
        // if(quantity < 1 || quantity > 99)
        //     alert("Cantidad de cajas debe ser entre 1 a 99 cajas.")

        // else{
        //     let item = {
        //         box_id: props.params.box_id,
        //         box_name: props.params.box_name,
        //         box_image: props.params.box_image,
        //         box_price: props.params.box_price,
        //         box_quantity: quantity
        //     }

            // CartService.instance.addToCart(item)
            // alert(JSON.stringify(item))
        // }
    }    

    const increaseProductQuantity = (product) => {
        let box_content = boxData.box_content,
            product_key = product.product_name,
            product_data = box_content[product_key]

        // Product does not yet exist in content list
        if (typeof product_data == "undefined")
            box_content[product_key] = { 
                 ... product,
                 product_quantity_box: 1
            }

        // Product already exists in content list
        else 
            product_data.product_quantity_box += 1

        changeBoxData({
            ...boxData,
            box_accumulated_price: Number((boxData.box_accumulated_price += product.product_price).toFixed(2)),
            box_content: box_content
        })
    }

    const decreaseProductQuantity = (product) => {
        let box_content = boxData.box_content,
            product_key = product.product_name,
            product_data = box_content[product_key]

        //Product exists in content list.
        if (typeof product_data != "undefined"){

            if(product_data.product_quantity_box <= 1)
                delete box_content[product_key]

            else 
                product_data.product_quantity_box -= 1
            

            changeBoxData({
                ...boxData,
                box_accumulated_price: Number((boxData.box_accumulated_price -= product.product_price).toFixed(2)),
                box_content: box_content
            })
        }
    }

    const changeProductQuantity = (product_id, newQuantity) => {
        if (newQuantity <= 0)
            delete boxData.box_content[product_id]
            
        else
            boxData.box_content[product_id] = newQuantity
    }

    const displayPremadeBox = () => {

        const loadProducts = (box_id) => {
            let _products = []
    
            // let products_list = await BoxService.instance.getBoxContentWith(box_id)
            for(product_key in box_content){
                let product = box_content[product_key]

                _products.push(
                    <View style={styles.productCardContainer} key={product_key}>
                        <InteractiveProductCard
                            product={product}
                            onMinus={() => decreaseProductQuantity(product)}
                            onPlus={() => increaseProductQuantity(product)}
                            placeholder={boxData.box_content[product_key].product_quantity_box}
                        />
                    </View>
                )               
            }
    
            return _products
        }

        return (
            <View>
                <Text style={styles.text}>Te incluye:</Text>

                {/* PRODUCT LIST */}
                <View style={styles.productContainer}>
                    {loadProducts(props.params.box_id)}
                </View>
            </View>
        )
    }

    const displayBuildYourBox = () => {

        const loadProductCatalog = (products) => {
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

            // catalog gets fetched from API call
            for (category in catalog){
                _dropMenus.push(
                    <View key={category} style={styles.dropDownContainer}>
                        <DropDown
                            title={category}
                            list={loadProductCatalog(catalog[category])}
                        />
                    </View>
                )           
            }
    
            return _dropMenus
        }

        return (
            <View style={styles.buildContainer}>
                <Text style={styles.text}>Productos Disponibles:</Text>

                {displayDropMenus()}

            </View>
        )
    }

    const displayContent = () => {
        if (_isBuildYourBox)
            return displayBuildYourBox()

        else
            return displayPremadeBox()
    }

    return (
        <KeyboardAwareScrollView>

            {/* GO BACK ARROW */}
            <View style={styles.arrowContainer}> 
                <BackArrow onTouch={goToHome}/>
            </View>

            {/* BOX CARD */}
            <Text style={[styles.text, styles.cardText, styles.cardTitle]}>{props.params.box_name}</Text>
            <Card containerStyle={[styles.card, global_styles.shadow]}>
                {/* <Card.Image source={props.params.box_image}> */}
                <Card.Image 
                    style={styles.imageRadius}
                    source={props.params.box_image}
                    resizeMode="stretch"
                />
                <Text style={[styles.text, styles.cardText]}>Precio Mínimo: <Text style={{color: 'rgb(252,0,29)'}}>${props.params.box_price}</Text></Text>
            </Card>

            {  displayContent() }

            <Text style={styles.text}>Precio acumulado hasta el momento es: $ {boxData.box_accumulated_price}</Text>

            {/* ADD TO CART */}
            <View style={styles.addToCartContainer}>

                {/* Input field */}
                <View style={styles.plusMinusContainer}>
                    <PlusMinus
                        onMinus={() => { if(boxData.box_quantity > 1) changeBoxData({ ...boxData, box_quantity: boxData.box_quantity -= 1})}}
                        onPlus={()=>{ if(boxData.box_quantity < 100) changeBoxData({ ...boxData, box_quantity: boxData.box_quantity += 1}) }}
                        // onText={(quantity) => { boxData.box_quantity = Number(quantity) }}
                        placeholder={ boxData.box_quantity }
                    />
                </View>

                {/* Add Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        onTouch={verifyQuantity}
                        text="Agregar"
                    />
                </View>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default BoxScreen