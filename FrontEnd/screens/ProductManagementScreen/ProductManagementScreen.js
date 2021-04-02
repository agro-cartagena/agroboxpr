import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import styles from './ProductManagementScreenStyleSheet'
import global_styles from '../../styles'

import DropDown from '../../components/DropDown/DropDown'
import ProductCard from '../../components/ProductCard/ProductCard'
import ProductService from '../../services/ProductService'

import { goToEditProduct, goToInventoryManagement } from '../../Navigator'
import Button from '../../components/Button/Button'
import BackArrow from '../../components/BackArrow/BackArrow'

const InventoryManagementScreen = () => {

    const [productCatalog, setProductCatalog] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            setProductCatalog(await ProductService.instance.getProductCatalog())
        }

        fetchData()
    }, []);

    const generateCards = (products) => {
        return products.map((product) => 
                <TouchableOpacity 
                    key={product.product_id} 
                    style={styles.productCardContainer} 
                    onPress={() => goToEditProduct(product)}
                >
                    <ProductCard
                        name={product.product_name}
                        quantity={product.product_quantity_stock}
                        units={product.product_units}
                        uri={product.product_image}
                    />
                </TouchableOpacity> 
            )
    }

    const displayDropMenus = () => {
        let _dropMenus = []

        for(category in productCatalog) {
            _dropMenus.push(
                <View key={category} style={styles.dropDownContainer}>
                    <DropDown
                        title={category}
                        list={generateCards(productCatalog[category])}
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