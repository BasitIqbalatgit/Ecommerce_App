import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/context/orderContext";
import AuthContext from "../features/context/authContext";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
      console.log("res.data", res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {orders?.map((order) => (
            <OrderItem
              key={order.id}
              brand={order.brand}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loginView}>
          <Text style={styles.loginText}>Login to view your Orders!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 5,
    backgroundColor: "white",
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    marginTop: 4,
    paddingTop: 4,
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderScreen;
