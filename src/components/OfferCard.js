import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Suit from '../../assets/suit.png';

const OfferCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>50% Off</Text>
        <Text style={styles.subtitle}>On everything today</Text>
        <Text style={styles.code}>With code: FSCREATION</Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Now</Text>
        </Pressable>
      </View>
      <View>
        <Image source={Suit} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: 250,
    paddingVertical: 2,
    marginRight: 6,
    maxHeight: 160,
    overflow: 'hidden',
    backgroundColor: '#c7c7c7',
    borderRadius: 20,
  },
  textContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent:"space-between"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 18,
  },
  code: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    backgroundColor: 'black',
    width: 80,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginVertical: 6,
  },
  image: {
    resizeMode: 'contain',
    height: 150,
    width: 55,
  },
});

export default OfferCard;
