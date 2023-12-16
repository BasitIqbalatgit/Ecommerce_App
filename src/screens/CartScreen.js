import { Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import TotalSummaryCard from "../components/TotalSummaryCard";
import CartContext from "../features/context/cartContext";
import { getCartItems } from "../features/firebase/cart";
import AuthContext from "../features/context/authContext";

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState();
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const calculateTotalAmount = useCallback(async (data) => {
    const subTotal = await data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(subTotal.toFixed(2));
  }, []);

  const fetchCartItems = useCallback(async () => {
    const res = await getCartItems();
    if (res.success === true) {
      setCartItems(res.data);
      setTotal(res.subTotal); // or use calculateTotalAmount(res.data);
    }
  }, [setCartItems, calculateTotalAmount]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchCartItems();
  }, [currentUser, fetchCartItems]);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", padding: 30, backgroundColor: "white" }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>My Cart</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={{ marginTop: 16 }} showsVerticalScrollIndicator={false}>
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                brand={item.brand}
                qty={item.qty}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Your cart is empty!</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Login to view your Cart!</Text>
        </View>
      )}
      <View>
        <TotalSummaryCard totalPrice={total} />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
