import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './src/navigations/TabNavigation';
import { AuthProvider } from './src/features/context/authContext';
import { useState } from 'react';
import { ProductProvider } from './src/features/context/productContext';
import { CartProvider } from './src/features/context/cartContext';
import { OrderProvider } from './src/features/context/orderContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(null);  
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [orders, setOrders] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  return (
    <AuthProvider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <ProductProvider
        value={{ products, setProducts, currentProduct, setCurrentProduct  }}
      >
        <CartProvider value={{ cartItems, setCartItems }}>

          <OrderProvider value={{ orders, setOrders,orderItems, setOrderItems }}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>

          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
    // <View sytle={styles.container}><Text>hi hello</Text></View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
