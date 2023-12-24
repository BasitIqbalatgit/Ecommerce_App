import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './src/navigations/TabNavigation';
import { AuthProvider } from './src/features/context/authContext';
import React, { useEffect, useState } from 'react';
import { ProductProvider } from './src/features/context/productContext';
import { CartProvider } from './src/features/context/cartContext';
import { OrderProvider } from './src/features/context/orderContext';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'; 
import WelcomeScreen from './src/screens/WelcomeScreen';
import { StartingStack } from './src/navigations/StackNavigaton';
import LoginScreen from './src/screens/LoginScreen';
import AddProducts from './src/Admin/AddProducts';

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'poppins-semiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      // Add more fonts if needed
    });
  } catch (error) {
    console.error('Error loading fonts:', error);
  }
};


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(null);  
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [orders, setOrders] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [animationFinished, setAnimationFinished] = useState(false);

  const [fontsLoaded,setFontsLoaded]= useState(false);
  useEffect(() => {
    const load = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    load();
  }, []);
  const handleAnimationFinish = () => {
    setAnimationFinished(true);
   };

  return !fontsLoaded ? (
    <View>
      <Text>This is a text string within a Text component.</Text>
    </View>
  ) : (
    <>
    {!animationFinished ? (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <LottieView
        style={{ width: 250, height: 250 }}
        source={require('./assets/Wellcome.json')}
        autoPlay={true}
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      /></View>
    ) : (
    <AuthProvider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <ProductProvider
        value={{ products, setProducts, currentProduct, setCurrentProduct  }}
      >
        <CartProvider value={{ cartItems, setCartItems }}>

          <OrderProvider value={{ orders, setOrders,orderItems, setOrderItems }}>
            <NavigationContainer>
              <StartingStack />
            </NavigationContainer>

          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>

    )}
    </> 
  );
  }  

export default App