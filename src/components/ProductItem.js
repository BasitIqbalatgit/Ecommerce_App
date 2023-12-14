import React from "react";
import { Text, View, Image , StyleSheet} from "react-native";
import Bag from "../../assets/bag.png";


const ProductItem = ({ title, brand, image, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.brand}>{brand}</Text>
          </View>
          <View>
            <Text style={styles.price}>Price: ${price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  flexRow:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    
  },
  image: {
    borderRadius: 50,
    height: 90,
    width: 90,
    objectFit:"contain",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 12,
  },
  price: {
    fontSize: 12,
    marginTop: 2,
  },
});


export default ProductItem;
