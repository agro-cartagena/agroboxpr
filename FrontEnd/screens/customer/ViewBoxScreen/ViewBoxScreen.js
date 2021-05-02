import React from 'react';
import { View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../../components/Loader/Loader'

import CachedImage from '../../../components/CachedImage/CachedImage'
import Button from '../../../components/Button/Button'

import styles from './ViewBoxScreenStyleSheet';
import Navigator from '../../../Navigator'

import BoxService from '../../../services/BoxService'
import ProductService from '../../../services/ProductService'
import CartService from '../../../services/CartService'
import ImageService from '../../../services/ImageService'

import InteractiveProductCard from '../../../components/InteractiveProductCard/InteractiveProductCard'
import QuantitySpecifier from '../../../components/QuantitySpecifier/QuantitySpecifier'
import BackArrow from '../../../components/BackArrow/BackArrow'
import DropDown from '../../../components/DropDown/DropDown'

// Route parameters are stored in props.params object
// i.e., alert(props.params.box_name)
const BoxScreen = (props) => {
    let _isBuildYourBox = props.params.box_name.includes("Crea") || props.params.box_name.includes("Build")
    
    const [loading, setLoading] = React.useState(true)
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

            setLoading(false)
        }

        fetchData()
    }, []);

    const askToAddToCart = () => {
        let quantity = boxData.box_quantity
        if(quantity < 1 || quantity > 99)
            alert("Cantidad de cajas debe ser entre 1 a 99 cajas.")

        else if(boxData.box_accumulated_price < boxData.box_price)
            alert('Precio mínimo de caja no alcanzado.')
        
        else
            Alert.alert(
                '¿Desea añadir caja al carrito?', '',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Añadir',
                        onPress: () => {
                            CartService.instance.addToCart({...boxData, box_content: content})
                            alert("Caja ha sido añadida al carrito.")
                            Navigator.instance.goToHome()
                        }
                    }
                ]
            )
    }  

    const askToRemoveProduct = (target_product) => {
        Alert.alert(
            `¿Seguro que desea eliminar ${target_product.product_name} de la lista?`, "",
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        if(content.length == 1)
                            alert("Debe de haber al menos 1 producto en la caja.")
                        
                        else {
                            let total = (boxData.box_accumulated_price - target_product.product_price).toFixed(2)
                            boxData.box_accumulated_price = Number(total)
                            setContent(content.filter((product) => product._id != target_product._id))
                        }   
                    }
                }
            ]
        )
    }

    const increaseProductQuantity = (target_product) => {
        let product = content.find((item) => item._id == target_product._id)
    
        // Product does not yet exist in content list.
        if(! product){
            content.push({
                ...target_product, 
                product_quantity_box: 1
            })
        }

        // Product already exists in content list.
        else {
            if(target_product.product_quantity_box == target_product.product_quantity_stock){
                alert('Máxima cantidad de productos alcanzada.')
                return
            }

            product.product_quantity_box += 1
        }

        let total = (boxData.box_accumulated_price + target_product.product_price).toFixed(2)
        setBoxData({
            ...boxData, 
            box_accumulated_price: Number(total)
        })

    }

    const decreaseProductQuantity = (target_product) => {
        let product = content.find((item) => item._id == target_product._id)
    
        //Product already exists in content list.
        if(product){
            if(product.product_quantity_box == 1)
                askToRemoveProduct(product)

            else {
                product.product_quantity_box -= 1

                let total = (boxData.box_accumulated_price - target_product.product_price).toFixed(2)
                setBoxData({
                    ...boxData,
                    box_accumulated_price: Number(total)
                })
            }   
        }
    }

    const changeProductQuantity = (target_product, newQuantity) => {
        if(!newQuantity)
            return 

        else if(newQuantity < 0  || isNaN(newQuantity)){
            alert("Cantidad especificada no es aceptada.")
            return
        }

        else if (newQuantity > target_product.product_quantity_stock) {
            alert("Máxima cantidad de producto excedida.")
            return
        }

        let product = boxData.box_content.find((item) => item._id == target_product._id),
            total = boxData.box_accumulated_price
        
        // Product already exists in content list.
        if(product){
            total -= target_product.product_price * target_product.product_quantity_box

            if(newQuantity == 0)
                boxData.box_content = boxData.box_content.filter((product) => product._id != target_product._id)
            
            else {
                product.product_quantity_box = newQuantity
                total += target_product.product_price * newQuantity
            }
            
        }

        // Product does not yet exist in content list.
        else if (newQuantity > 0){
            boxData.box_content.push({
                ...target_product,
                product_quantity_box: newQuantity
            })

            total += target_product.product_price * newQuantity
        }

        total = total.toFixed(2)
        setBoxData({
            ...boxData,
            box_accumulated_price: Number(total)
        })
    }

    const fetchPlaceholder = (target_product) => {
        let product = content.find((item) => item._id == target_product._id)

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

    return loading
        ? (
            <Loader
                loading={loading}
            />
        )
        : (
            <KeyboardAwareScrollView>
                
                {/* GO BACK ARROW */}
                <BackArrow onTouch={Navigator.instance.goToHome}/>

                {/* BOX CARD */}
                <Text style={styles.header}>{props.params.box_name}</Text>
                <View style={styles.card}>
                    <View style={styles.cardImage}>
                        <CachedImage
                            source={{uri: ImageService.instance.getURL(props.params.box_image)}}
                            resizeMode='stretch'
                        />
                    </View>

                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>Precio Mínimo: <Text style={{color: 'rgb(252,0,29)'}}>${props.params.box_price}</Text></Text>
                    </View>
                </View>

                {  displayContent() }

                <Text style={styles.text}>Precio acumulado hasta el momento es: $ {boxData.box_accumulated_price}</Text>

                {/* ADD TO CART */}
                <View style={styles.addToCartContainer}>

                    {/* Input field */}
                    <View style={styles.QuantitySpecifierContainer}>
                        <QuantitySpecifier
                            onMinus={() => { if(boxData.box_quantity > 1) setBoxData({ ...boxData, box_quantity: boxData.box_quantity -= 1})}}
                            onPlus={()=>{ if(boxData.box_quantity < 100) setBoxData({ ...boxData, box_quantity: boxData.box_quantity += 1}) }}
                            // onText={(quantity) => { boxData.box_quantity = Number(quantity) }}
                            placeholder={ boxData.box_quantity }
                        />
                    </View>

                    {/* Add Button */}
                    <View style={styles.buttonContainer}>
                        <Button
                            text="Agregar"
                            onTouch={askToAddToCart}
                        />
                    </View>
                </View>

            </KeyboardAwareScrollView>
    )
}

export default BoxScreen