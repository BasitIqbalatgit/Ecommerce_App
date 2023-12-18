import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Pressable, ToastAndroid } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { removeItemById } from "../features/firebase/cart";
import CartContext from "../features/context/cartContext";

const CartItem = ({ title, image, price, brand, qty, id }) => {
  const { setCartItems } = useContext(CartContext);

  const removeItem = async () => {
    const res = await removeItemById(id);
    if (res.success === true) {
      ToastAndroid.show("Removed Successfully", ToastAndroid.BOTTOM);
      setCartItems(res.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.extraBold}>Qty: {qty}</Text>
          <Text style={styles.extraBold}>${price}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Pressable onPress={removeItem} style={styles.removeButton}>
            <MaterialIcons name="delete-outline" size={20} style={styles.removeIcon} />
            <Text>Remove</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
  imageContainer: {
    padding: 8,
  },
  image: {
    borderRadius: 100,
    height: 80,
    width: 80,
  },
  detailsContainer: {
    flex: 1,
    width: '50%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  brand: {
    fontSize: 12,
  },
  extraBold: {
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
  },
  removeButton: {
    flexDirection: 'row',
    marginRight: 2,
  },
  removeIcon: {
    marginRight: 2,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});

export default CartItem;
