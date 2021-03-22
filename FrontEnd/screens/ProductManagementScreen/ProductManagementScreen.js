import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import styles from './ProductManagementScreenStyleSheet'
import global_styles from '../../styles'

import DropDown from '../../components/DropDown/DropDown'
import ProductCard from '../../components/ProductCard/ProductCard'
import catalog from '../../db_mockup/product.catalog.db'

import { goToProduct, goToInventoryManagement } from '../../Navigator'
import Button from '../../components/Button/Button'
import BackArrow from '../../components/BackArrow/BackArrow'

const InventoryManagementScreen = () => {
    let _dropMenus = []

    const generateCards = (products) => {
        let product_cards = []

        products.forEach(product => {
            product_cards.push(
                <TouchableOpacity 
                    key={product.id} 
                    style={styles.productCardContainer} 
                    onPress={() => goToProduct(product)}
                >
                    <ProductCard
                        name={product.name}
                        quantity={product.quantity}
                        units={product.units}
                        uri={product.image}
                    />
                </TouchableOpacity>
            )
        })

        return product_cards
    }

    // catalog gets fetched from back end.
    Object.entries(catalog).forEach((category) => {
        _dropMenus.push(
            <View key={category[0]} style={styles.dropDownContainer}>
                <DropDown
                    title={category[0]}
                    list={generateCards(category[1])}
                />
            </View>
        )
    })

    return(
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.arrowContainer}>
                <BackArrow
                    onTouch={goToInventoryManagement}
                />
            </View>
            <Text style={[global_styles.text, styles.header]}>Manejar el Inventario (Productos)</Text>

            <View style={styles.menuContainer}>
                {_dropMenus}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text="Añadir Producto Nuevo"
                    onTouch={() => goToProduct("new")}
                />
            </View>
        </ScrollView>
    )
}

export default InventoryManagementScreen