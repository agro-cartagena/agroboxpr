import React from 'react'
import {Text, View, ScrollView, Alert} from 'react-native'
import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'

import { goToCart, goToPayment } from '../../../Navigator'
import styles from './EditCartScreenStyleSheet'
import global_styles from '../../../styles'

import InteractiveProductCard from '../../../components/InteractiveProductCard/InteractiveProductCard'
import CartService from '../../../services/CartService'

// box content is passed through props.params.content LIST OF OBJECTS 
const EditCartScreen = (props) => {
    // const [content, setContent] = React.useState(props.params.box_content)
    const content = props.params.box_content
    const [subTotal, setSubTotal] = React.useState(props.params.box_accumulated_price)
    
    const displayContent = () => {

        const removeProduct = (target_product) => {
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
                            props.params.box_content = content.filter((product) => product._id != target_product._id)
                            // setContent(props.params.box_content)
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
            else 
                product.product_quantity_box += 1

            setSubTotal(Number((Number(props.params.box_accumulated_price) + Number(target_product.product_price)).toFixed(2)))
        }
    
        const decreaseProductQuantity = (target_product) => {
            let product = content.find((item) => item._id == target_product._id)
    
            //Product already exists in content list.
            if(product){
                if(product.product_quantity_box <= 1)
                    removeProduct(product)
    
                else
                    product.product_quantity_box -= 1

                setSubTotal(Number((Number(props.params.box_accumulated_price) - Number(target_product.product_price)).toFixed(2)))
            }       
        }
    
        const changeProductQuantity = (target_product, newQuantity) => {
            let product = content.box_content.find((item) => item._id == target_product._id)

            // Product already exists in content list.
            if(product){
                if(newQuantity == 0){
                    props.params.box_content = content.filter((product) => product._id != target_product._id)
                    // setContent(content.filter((product) => product._id != target_product._id))
                }
                
                else
                    product.product_quantity_box = newQuantity
                // setContent(CartService.instance.getCart())  
            }

            // Product does not yet exist in content list.
            else if (newQuantity > 0){
                content.push({
                    ...target_product,
                    product_quantity_box: newQuantity
                })
            }
            
            setSubTotal(Number(Number(subTotal) + (Number(target_product.product_price) * Number(newQuantity)).toFixed(2)))
        }

        const fetchPlaceholder = (target_product) => {
            let product = content.find((item) => item._id == target_product._id)

            if(product)
                return product.product_quantity_box

            return 0
        }


        return content.map((product) => 
            <View style={styles.card} key={product._id}>
                <InteractiveProductCard
                    product = {product}
                    onPlus = {() => increaseProductQuantity(product)}
                    onMinus = {() => decreaseProductQuantity(product)}
                    onText = {(text) => changeProductQuantity(product, text)}
                    placeholder = {fetchPlaceholder(product)}
                />
            </View>
        )
    }

    return(
        <ScrollView>
            <View>
                <View style={styles.arrowContainer}>
                    <BackArrow onTouch={() => { 
                        goToCart()
                        // setContent([])
                    }} />
                </View>

                <Text style={[styles.text, styles.header]}>Contenido actual de la caja:</Text>

                <View style={styles.cardContainer}>
                    {displayContent()}
                </View>

                <Text style={[styles.text, styles.priceText]}>Total acumulado hasta el momento: ${subTotal}</Text>

                <View style = {styles.buttonContainer}>
                    <Button
                        text="Guardar"
                        onTouch={() => alert(JSON.stringify(props.params.box_content))}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
export default EditCartScreen