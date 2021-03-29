import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import styles from './ProductManagementScreenStyleSheet'
import global_styles from '../../styles'

import DropDown from '../../components/DropDown/DropDown'
import ProductCard from '../../components/ProductCard/ProductCard'
import catalog from '../../db_mockup/product.catalog.db'

import { goToEditProduct, goToInventoryManagement } from '../../Navigator'
import Button from '../../components/Button/Button'
import BackArrow from '../../components/BackArrow/BackArrow'

const InventoryManagementScreen = () => {

    const generateCards = (products) => {
        return products.map (product => 
                <TouchableOpacity 
                    key={product.id} 
                    style={styles.productCardContainer} 
                    onPress={() => goToEditProduct(product)}
                >
                    <ProductCard
                        name={product.name}
                        quantity={product.quantity}
                        units={product.units}
                        uri={product.image}
                    />
                </TouchableOpacity> 
            )
    }

    const displayDropMenus = () => {
        let _dropMenus = []

        for(category in catalog) {
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

    return(
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.arrowContainer}>
                <BackArrow
                    onTouch={goToInventoryManagement}
                />
            </View>
            <Text style={[global_styles.text, styles.header]}>Manejar el Inventario (Productos)</Text>

            <View style={styles.menuContainer}>
                {displayDropMenus()}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text="Añadir Producto Nuevo"
                    onTouch={() => goToEditProduct("new")}
                />
            </View>
        </ScrollView>
    )
}

export default InventoryManagementScreen