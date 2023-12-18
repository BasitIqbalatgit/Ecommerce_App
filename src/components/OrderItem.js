import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const OrderItem = ({ orderId, title, image, brand, date, price, qty }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.shadowProp, styles.cardContent]}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.detailText}>Quantity: {qty}</Text>
          <Text style={styles.detailText}>Date: {date}</Text>
          <Text style={styles.detailText}>
            OrderId: <Text style={styles.orderIdText}>#{orderId}</Text>
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#cbd2d9",
  },
  shadowProp: {
    shadowColor: "#111",
    elevation: 6,
    shadowRadius: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    borderRadius: 12,
    height: 80,
    width: 80,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
  },
  brand: {
    fontSize: 12,
    marginTop: 1,
  },
  detailText: {
    fontSize: 12,
    marginTop: 2,
  },
  orderIdText: {
    fontWeight: "bold",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderItem;
