import React, { useContext, useEffect, useState } from "react";
import { Text, View, Pressable, Image, ToastAndroid,Platform ,ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductContext from "../features/context/productContext";
import CartContext from "../features/context/cartContext";
import { getProductById } from "../features/firebase/Product";
import { addToCart } from "../features/firebase/cart";

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext);
  const { setCartItems } = useContext(CartContext);
  const id = route.params.productId;

  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty((prev) => prev + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const addItemToCart = async () => {
    const res = await addToCart(id, qty);
    if (res.success) {
      if (Platform.OS === 'android') {
      ToastAndroid.show("Item added to cart", ToastAndroid.BOTTOM);
      }
      setCartItems(res.data);
    }
  };

  const fetchProductById = async (productId) => {
    const result = await getProductById(productId);
    setCurrentProduct(result);
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "black", width: "100%" }}>
        <Pressable
          onPress={goBack}
          style={{
            marginTop: 2,
            position: "absolute",
            zIndex: 10,
            top: 4,
            justifyContent: "center",
            alignItems: "center",
            height: 10,
            width: 10,
            marginHorizontal: 4,
            borderRadius: 999,
            backgroundColor: "black",
          }}
        >
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
        <Image source={{ uri: product?.image }} style={{ resizeMode: "cover", height: 470 }} />
      </View>

      <View style={{ borderRadius: 30, backgroundColor: "white", marginTop: -25, padding: 5, paddingHorizontal: 16 }}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{product?.title}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>{product?.brand}</Text>
            </View>
            <View style={{marginTop: 30 }}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Pressable
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: "#cfcfcf",
                    borderWidth: 1,
                    borderColor: "#cfcfcf",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                  onPress={decrement}
                >
                  <Text style={{ fontWeight: "bold" }}>-</Text>
                </Pressable>
                <Text style={{ backgroundColor: "white", paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "#cfcfcf" }}>{qty}</Text>
                <Pressable
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: "#cfcfcf",
                    borderWidth: 1,
                    borderColor: "#cfcfcf",
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  onPress={increment}
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 24,  height: "53%" }}>
            <Text style={{ fontWeight: "bold", marginBottom: 3 }}>Description</Text>
            <ScrollView style={{ flex: 1 }}>
              <Text style={{ color: "gray", fontSize: 12 }}>{product?.description}</Text>
            </ScrollView>
            <View style={{ width: "100%", backgroundColor:"transparent" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <View>
                  <Text style={{ color: "gray", marginBottom: -4 }}>Total Price</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>${product?.price}</Text>
                </View>
                <Pressable onPress={addItemToCart} style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 30 }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>Add to Cart</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
