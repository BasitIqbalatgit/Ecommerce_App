import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import DetailScreen from "../screens/DetailScreen";
import ProductListScreen from "../screens/ProductListScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabNavigator from "./TabNavigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import  AdminDrawer  from "./DrawerNavigation";


const Stack = createStackNavigator();

const MainStackNavigation =()=>{
    return(
        <Stack.Navigator initialRouteName="home-screen" screenOptions={{ headerShown:false,}}>
            <Stack.Screen name="home-screen" component={HomeScreen} />
            <Stack.Screen name="detail-screen" component={DetailScreen} />
            <Stack.Screen name="product-screen" component={ProductListScreen} />
        </Stack.Navigator>
    )
}

const StartingStack =()=>{
    return(
        <Stack.Navigator initialRouteName="wellcomeScreen" screenOptions={{ headerShown:false,}}>
            <Stack.Screen name="wellcomeScreen" component={WelcomeScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <Stack.Screen name="Tab" component={TabNavigator}/>
            <Stack.Screen name="Drawer" component={AdminDrawer}/>
        </Stack.Navigator>
    )
}

const CartStackNavigator = ()=>{
    return(
        <Stack.Navigator initialRouteName='cart-screen'
        screenOptions={{
            headerStyle:{
                backgroundColor:"#91c4f8"
            },
            headerShown:false
        }}v>
            <Stack.Screen name="cart-screen" component={CartScreen} />
        </Stack.Navigator>
    )
}

const OrderStackNavigator = ()=>{
    return(
        <Stack.Navigator initialRouteName='order-screen'
        screenOptions={{
            headerStyle:{
                backgroundColor:"#91c4f8"
            },
            headerShown:false
        }}>
            <Stack.Screen name="order-screen" component={OrderScreen} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = ()=>{
    return(
        <Stack.Navigator initialRouteName='profile-screen'
        screenOptions={{
            headerStyle:{
                backgroundColor:"#91c4f8"
            },
            headerShown:false
        }}>
            <Stack.Screen name="profile-screen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}


export {StartingStack,MainStackNavigation, CartStackNavigator, OrderStackNavigator, ProfileStackNavigator};