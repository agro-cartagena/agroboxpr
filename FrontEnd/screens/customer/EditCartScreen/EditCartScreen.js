import React from 'react'
import {Text,View, ScrollView} from 'react-native'
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
    const [content, setContent] = React.useState(props.params.box_content)
    
    const displayContent = () => {

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

            CartService.instance.updateCart(props.params.box_id, content)
            setContent(CartService.instance.getCart())
        }
    
        const decreaseProductQuantity = (target_product) => {
            let product = content.find((item) => item._id == target_product._id)
    
            //Product already exists in content list.
            if(product){
                if(product.product_quantity_box <= 1)
                    setContent(content.filter((product) => product._id != target_product._id))
    
                else
                    product.product_quantity_box -= 1

                CartService.instance.updateCart(props.params.box_id, content)
                setContent(CartService.instance.getCart())
            }       
        }
    
        const changeProductQuantity = (target_product, newQuantity) => {
            let product = content.box_content.find((item) => item._id == target_product._id)

            // Product already exists in content list.
            if(product){
                if(newQuantity == 0)
                    setContent(content.filter((product) => product._id != target_product._id))
                
                else
                    product.product_quantity_box = newQuantity
                setContent(CartService.instance.getCart())  
            }

            // Product does not yet exist in content list.
            else if (newQuantity > 0){
                content.push({
                    ...target_product,
                    product_quantity_box: newQuantity
                })
            }

            CartService.instance.updateCart(props.params.box_id, content)
            setContent(CartService.instance.getCart())
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
                    <BackArrow onTouch={goToCart} />
                </View>

                <Text>Contenido actual de la caja:</Text>

                <View style={styles.cardContainer}>
                    {displayContent()}
                </View>
            </View>
        </ScrollView>
    )
}
export default EditCartScreen