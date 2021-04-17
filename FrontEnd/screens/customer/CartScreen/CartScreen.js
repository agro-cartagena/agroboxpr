import React from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import BoxCard from '../../../components/BoxCard/BoxCard'
import PlusMinus from '../../../components/PlusMinus/PlusMinus'

import CartService from '../../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../../styles'

import Logo from '../../../components/Logo/Logo'
import Button from '../../../components/Button/Button'

import { goToCheckout, goToEditCart } from '../../../Navigator'

const CartScreen = (props) => {

    const [cartData, setCartData] = React.useState([])
   
    React.useEffect(() => {
        async function fetchData() {
            // console.log( await CartService.instance.getCart())
            const cartInfo = CartService.instance.getCart()
            setCartData(cartInfo)
            // let total_price = {
            //     ...props,
            //     cart_total_price:  props.params.box_price
            // }
            // console.log("---------------------")
            // console.log(await CartService.instance.getCart())
            // setBoxData(box_content)
        }

        fetchData()
    }, []);

    const loadCart = () => {
        const increaseBoxQuantity = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)
    
            if(box.box_quantity <= 99)
                box.box_quantity += 1

        }
    
        const decreaseBoxQuantity = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)
    
            //Product already exists in content list.
            if(box.box_quantity > 1)
                box.box_quantity -= 1

            // else{
                // setCartData(cartData.filter((item) => item._id != target_box._id))
            // }  
        }
    
        const changeBoxQuantity = (target_box, newQuantity) => {
            let box = cartData.find((item) => item._id == target_box._id)

            if(newQuantity < 1){
                box.box_quantity = 1
                alert("Mínima cantidad de cajas es 1.")
            }

            else if (newQuantity > 99) {
                box.box_quantity = 99
                alert("Máxima cantidad de cajas es 99.")
            }

            else 
                box.box_quantity = newQuantity
        }

        const fetchPlaceholder = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)

            if(box)
                return box.box_quantity

            return 0
        }

        return cartData.map((element) => 
            <View style={styles.itemContainer} key={element._id}>
                <TouchableOpacity key={element.box_name} style={styles.cardContainer} onPress={() => goToEditCart({box_id: element._id, box_content: element.box_content})}>
                    <BoxCard
                        id={element._id}
                        name={element.box_name}
                        price={element.box_accumulated_price}
                    // image={item.box_image} //change
                    />
                </TouchableOpacity>

                <View style={styles.plusminus} >
                    <PlusMinus
                        onMinus={() => {decreaseBoxQuantity(element)}}
                        onPlus={() => {increaseBoxQuantity(element)}}
                        onText={(text) => changeBoxQuantity(element, text)}
                        placeholder={fetchPlaceholder(element)}
                    />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> = ${element.box_accumulated_price * element.box_quantity}</Text>

            </View>
        )
    }

    const getTotalPrice = () => {
        let total_price = 0

        cartData.forEach((item) => {total_price += Number(item.box_accumulated_price) * Number(item.box_quantity)})

        return total_price
    }

    return(
        <ScrollView>
            <Logo/>

            <View style={styles.cartContainer}>
                {loadCart()}
            </View>

            <Text style={[global_styles.text, styles.text]}>Total de compra: 
                <Text style={{fontWeight: 'bold', color: '#EAC71D'}}> ${getTotalPrice()}</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    onTouch={goToCheckout}
                    text="Continuar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen