import React, { useContext, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductContext from '../features/context/productContext';
import ProductItem from '../components/ProductItem';
import { getProducts } from '../features/firebase/Product';

const ProductListScreen = ({ navigation }) => {
  const { products, setProducts } = useContext(ProductContext);

  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Products",
      headerLeft: () => (
        <Pressable onPress={goBack} style={styles.headerLeft}>
          <MaterialIcons name="chevron-left" size={34} color={"#111"} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleAlign: "center",
    });
    fetchAllProducts();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      key={item.id}
      onPress={() =>
        navigation.navigate("detail-screen", {
          productId: item?.id,
        })
      }
    >
      <ProductItem
        title={item?.title}
        image={item?.image}
        price={item?.price}
        brand={item?.brand}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  headerLeft: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginLeft: 10,
    borderRadius: 20,
  },
});

export default ProductListScreen;