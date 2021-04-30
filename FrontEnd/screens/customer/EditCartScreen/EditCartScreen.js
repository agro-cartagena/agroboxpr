import React from 'react'
import {Text, View, ScrollView, Alert} from 'react-native'
import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'

import Navigator from '../../../Navigator'
import styles from './EditCartScreenStyleSheet'
import global_styles from '../../../styles'

import InteractiveProductCard from '../../../components/InteractiveProductCard/InteractiveProductCard'
import CartService from '../../../services/CartService'

// box is passed as parameter through
const EditCartScreen = (props) => {
    const [box, setBox] = React.useState(props.params)
    const [subTotal, setSubTotal] = React.useState(props.params.box_accumulated_price)
    
    const displayContent = () => {

        const askToRemoveProduct = (target_product) => {
            Alert.alert(
                `¿Seguro que desea eliminar ${target_product.product_name} de la orden?`, "",
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: () => {
                            box.box_content = box.box_content.filter((product) => product._id != target_product._id)
                            setSubTotal(Number((subTotal - target_product.product_price).toFixed(2)))
                        }
                    }
                ]
            )
        }

        const increaseProductQuantity = (target_product) => {
            if(target_product.product_quantity_box == target_product.product_quantity_stock){
                alert('Cantidad máxima alcanzada')
                return
            } else {
                target_product.product_quantity_box += 1
                setSubTotal(Number((subTotal + target_product.product_price).toFixed(2)))
            }
        }
    
        const decreaseProductQuantity = (target_product) => {
            if(target_product.product_quantity_box <= 1)
                askToRemoveProduct(target_product)

            else {
                target_product.product_quantity_box -= 1
                setSubTotal(Number((subTotal - target_product.product_price).toFixed(2)))
            }    
        }
    
        const changeProductQuantity = (target_product, newQuantity) => {
            if (!newQuantity)
                return 

            else if(newQuantity <= 0  || isNaN(newQuantity)){
                alert("Cantidad especificada no es aceptada.")
                return
            }

            else if (newQuantity > target_product.product_quantity_stock) {
                alert("Máxima cantidad de producto excedida.")
                return
            }

            else {
                let total = subTotal - (target_product.product_price * target_product.product_quantity_box)

                target_product.product_quantity_box = newQuantity
                total = (total + target_product.product_price * newQuantity).toFixed(2) 
                setSubTotal(Number(total))
            }
        }

        return box.box_content.map((product) => 
            <View style={styles.card} key={product._id}>
                <InteractiveProductCard
                    product = {product}
                    onPlus = {() => increaseProductQuantity(product)}
                    onMinus = {() => decreaseProductQuantity(product)}
                    onText = {(text) => changeProductQuantity(product, text)}
                    placeholder = {product.product_quantity_box}
                />
            </View>
        )
    }

    const askToSaveChanges = () => {
        Alert.alert(
            '¿Desea guardar sus cambios?', '',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }, 
                {
                    text: 'Guardar',
                    onPress: async () => { 
                        box.box_accumulated_price = subTotal
                        if(await CartService.instance.updateCart(box))
                            Navigator.instance.goToCart()
                    }
                }
            ]
        )
    }

    return(
        <ScrollView>
            <View>
                <BackArrow 
                    onTouch={() => { 
                        Navigator.instance.goToCart()
                    }} 
                />

                <Text style={[styles.text, styles.header]}>Contenido actual de la caja:</Text>

                <View style={styles.cardContainer}>
                    {displayContent()}
                </View>

                <Text style={[styles.text, styles.priceText]}>Total acumulado hasta el momento: ${subTotal}</Text>

                <View style = {styles.buttonContainer}>
                    <Button
                        text="Guardar"
                        onTouch={askToSaveChanges}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
export default EditCartScreen