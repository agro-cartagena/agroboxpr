import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Card } from 'react-native-elements'
import Button from '../../../components/Button/Button'

import styles from './ViewBoxScreenStyleSheet';
import global_styles from '../../../styles'
import { goToHome } from '../../../Navigator'

import BoxService from '../../../services/BoxService'
import ProductService from '../../../services/ProductService'
import CartService from '../../../services/CartService'

import InteractiveProductCard from '../../../components/InteractiveProductCard/InteractiveProductCard'
import PlusMinus from '../../../components/PlusMinus/PlusMinus'
import BackArrow from '../../../components/BackArrow/BackArrow'
import DropDown from '../../../components/DropDown/DropDown'

// Route parameters are stored in props.params object
// i.e., alert(props.params.box_name)
const BoxScreen = (props) => {
    let _isBuildYourBox = props.params.box_name.includes("Crea")

    const [boxData, setBoxData] = React.useState({})
    const [content, setContent] = React.useState([])
    const [productCatalog, setProductCatalog] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            let _box = {
                ...props.params, 
                box_quantity: 1,
                box_accumulated_price: _isBuildYourBox ? 0 : props.params.box_price,
                box_content: _isBuildYourBox ? [] : await BoxService.instance.getBoxContent(props.params._id)
            }

            setBoxData(_box)
            setContent(_box.box_content)

            if (_isBuildYourBox)
                setProductCatalog(await ProductService.instance.getProductCatalog())
        }

        fetchData()
    }, []);

    const verifyQuantity = () => {
        alert(JSON.stringify(boxData.box_content))
        // let quantity = boxData.box_quantity
        // alert(quantity)
        // if(quantity < 1 || quantity > 99)
        //     alert("Cantidad de cajas debe ser entre 1 a 99 cajas.")

        // else{
        //     let item = {
        //         _id: props.params._id,
        //         box_name: props.params.box_name,
        //         box_image: props.params.box_image,
        //         box_price: props.params.box_price,
        //         box_quantity: quantity
        //     }

            // CartService.instance.addToCart(item)
            // alert(JSON.stringify(item))
        // }
    }    

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

        setBoxData({
            ...boxData, 
            box_accumulated_price: (Number(boxData.box_accumulated_price) + Number(target_product.product_price)).toFixed(2)
        })

    }

    const decreaseProductQuantity = (target_product) => {
        let product = boxData.box_content.find((item) => item._id == target_product._id)
    
        //Product already exists in content list.
        if(product){
            if(product.product_quantity_box <= 1)
                boxData.box_content = boxData.box_content.filter((product) => product._id != target_product._id)

            else
                product.product_quantity_box -= 1

            setBoxData({
                ...boxData,
                box_accumulated_price: (Number(boxData.box_accumulated_price) - Number(target_product.product_price)).toFixed(2)
            })
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

        // setBoxData({
        //     ...boxData,
        //     box_accumulated_price: (Number(boxData.box_accumulated_price) - Number(target_product.product_price)).toFixed(2)
        // })
    }

    const fetchPlaceholder = (target_product) => {
        let product = boxData.box_content.find((item) => item._id == target_product._id)

        if(product)
            return product.product_quantity_box

        return 0
    }

    const displayPremadeBox = () => {
        const loadProducts = () => {    
            return content.map((product) => 
                    <View style={styles.productCardContainer} key={product._id}>
                        <InteractiveProductCard
                            product={product}
                            onMinus={() => decreaseProductQuantity(product)}
                            onPlus={() => increaseProductQuantity(product)}
                            onText={(text) => changeProductQuantity(product, text)}
                            placeholder={fetchPlaceholder(product)}
                        />
                    </View>
                )
        }

        return (
            <View>
                <Text style={styles.text}>Te incluye:</Text>

                {/* PRODUCT LIST */}
                <View style={styles.productContainer}>
                    {loadProducts()}
                </View>
            </View>
        )
    }

    const displayBuildYourBox = () => {
        const loadProductCatalog = (products) => {
            return products.map ((product) => 
                    <View 
                        key={product._id} 
                        style={styles.productCardContainer} 
                    >
                        <InteractiveProductCard
                            product={product}
                            onMinus={() => decreaseProductQuantity(product)}
                            onPlus={() => increaseProductQuantity(product)}
                            onText={(text) => changeProductQuantity(product, text)}
                            placeholder={fetchPlaceholder(product)}
                        />
                    </View> 
                )
        }

        const displayDropMenus = () => {
            return Object.keys(productCatalog).map((category) => 
                <View key={category} style={styles.dropDownContainer}>
                    <DropDown
                        title={category}
                        list={loadProductCatalog(productCatalog[category])}
                    />
                </View>
            )
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
                        onMinus={() => { if(boxData.box_quantity > 1) setBoxData({ ...boxData, box_quantity: boxData.box_quantity -= 1})}}
                        onPlus={()=>{ if(boxData.box_quantity < 100) setBoxData({ ...boxData, box_quantity: boxData.box_quantity += 1}) }}
                        // onText={(quantity) => { boxData.box_quantity = Number(quantity) }}
                        placeholder={ boxData.box_quantity }
                    />
                </View>

                {/* Add Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        onTouch={() => alert(JSON.stringify(boxData.box_content))}
                        text="Agregar"
                    />
                </View>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default BoxScreen