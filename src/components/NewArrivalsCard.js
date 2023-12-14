import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Bag from "../../assets/bag.png";
const NewArrivalsCard = ({ title, brand, price, image }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 24,
  },
  image: {
    borderRadius: 10,
    height: 150,
    width: 120,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NewArrivalsCard;
