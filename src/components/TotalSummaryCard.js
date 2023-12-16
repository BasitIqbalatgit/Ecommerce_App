import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable, ToastAndroid } from "react-native";
import CartContext from "../features/context/cartContext";
import { addToOrders } from "../features/firebase/order";
import OrderContext from "../features/context/orderContext";
import AuthContext from "../features/context/authContext";
import { MaterialIcons } from '@expo/vector-icons';

const TotalSummaryCard = ({ totalPrice }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { setCartItems } = useContext(CartContext);
  const { setOrderItems } = useContext(OrderContext);

  const placeOrder = async () => {
    const res = await addToOrders();
    if (res.success === true) {
      ToastAndroid.show("Order placed successfully!!!", ToastAndroid.BOTTOM);
      setCartItems([]);
      setOrderItems(res.data);
    }
  };

  return (
    <View style={styles.totalSummaryCard}>
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total Price:</Text>
        <Text style={styles.totalAmount}>${totalPrice}</Text>
      </View>
      <Pressable
        onPress={placeOrder}
        style={[styles.placeOrderButton, !isLoggedIn && styles.placeOrderButtonDisabled]}
        disabled={!isLoggedIn}
      >
        <Text style={[styles.placeOrderText, !isLoggedIn && {color:"black"}]}>Place Order</Text>
        {
            !isLoggedIn &&
            (
                <MaterialIcons name="lock" size={8} color="white" />
            )
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  totalSummaryCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 26,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
  },
  placeOrderButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  placeOrderButtonDisabled: {
    backgroundColor: "#888" // Grayish color for the disabled state
  },
  placeOrderText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default TotalSummaryCard;
