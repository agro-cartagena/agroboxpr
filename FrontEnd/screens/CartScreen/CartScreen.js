import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import BoxCard from '../../components/BoxCard/BoxCard'
import PlusMinus from '../../components/PlusMinus/PlusMinus'

import CartService from '../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../styles'

import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'

import goToCheckout from '../../Navigator'

const CartScreen = (props) => {
    let cart = []

    const [cartData, setCartData] = React.useState([
        // box_content,
        // cart_total_price:"",
    ])
   
    React.useEffect(() => {
        async function fetchData() {
            // console.log( await CartService.instance.getCart())
            setCartData(await CartService.instance.getCart())
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
// console.log(JSON.stringify(cartData))
    // const changeBoxQuantity = (box_id, newQuantity) => {
    //     if (newQuantity <= 0)
    //         delete cartData
            
    //     else
    //         boxData.box_content[product_id] = newQuantity
    // }

    const decreaseBoxQuantity = (box) => {
        // let //box_content = [box.box_content],
            // box_key = box.box_name,
            // quantity = box.quantity
        console.log(box.box_name + box.quantity);

        if (typeof box.quantity != "undefined") {
            if (box.quantity < 1)
                delete box.box_name
            else
                box.quantity -= 1

            setCartData({
                ...cartData,
                box_price: Number((cartData.box_price -= box.box_price).toFixed(2)),
                // quantity: box.quantity
            })
        }
    }
    
    const increaseBoxQuantity = (box) => {
        console.log(box.box_name + box.quantity);

        if (typeof box.quantity != "undefined") {
            if (box.quantity < 100)
                box.quantity += 1
                
            setCartData({
                ...cartData,
                box_price: Number((cartData.box_price -= box.box_price).toFixed(2)),
                // quantity: box.quantity
            })
        }
    }

    const loadCart = async () => {
         cartData.forEach(element => { 
            // alert(JSON.stringify(item))            
            cart.push(
                <View style={styles.itemContainer} key={element.box_id}>
                    <View key={element.box_name} style={styles.cardContainer}>
                        <BoxCard
                            id={element.box_id}
                            name={element.box_name}
                            
                        // image={item.box_image} //change
                        />
                    </View>

                    <View style={styles.plusminus}>
                        <PlusMinus
                            onMinus={() => {decreaseBoxQuantity(element)}}
                            //if (element.quantity > 1) setCartData({ ...element, quantity: element.quantity -= 1 }) 
                            //if(cartData.quantity > 1) setCartData({...cartData, quantity: cartData.quantity -= 1})}
                            onPlus={() => { increaseBoxQuantity(element) }}
                            //if (element.quantity < 100) setCartData({ ...element, quantity: element.quantity += 1 })
                            placeholder={element.quantity}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}> = ${element.box_price * element.quantity}</Text>
                
                </View>


                // Need to wrap BoxCard in a View and
                // add another View for price, quantity, and total
            ) 
         })
        // });
    }

    loadCart()

    return(
        <ScrollView>
            <Logo/>

            <View style={styles.cartContainer}>
                {cart}
            </View>

            <Text style={[global_styles.text, styles.text]}>Total de compra: 
                <Text style={{fontWeight: 'bold', color: '#EAC71D'}}> ${80}</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => goToCheckout()}
                    text="Pagar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen