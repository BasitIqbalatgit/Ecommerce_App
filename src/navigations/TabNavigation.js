import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigation, CartStackNavigator, OrderStackNavigator, ProfileStackNavigator } from "./StackNavigaton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const TabNavigator =()=>{
    return(
        <Tab.Navigator 
       
        screenOptions={{
  headerShown: false,
  tabBarShowLabel: false,  // Fix the typo here
  tabBarActiveTintColor: "black",
  tabBarInactiveTintColor: "gray",
}}

        >
            <Tab.Screen name="home" component={MainStackNavigation} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="cart" component={CartStackNavigator} 
                options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="shopping-cart" size={size} color={color} />
                )
                }}
            />
            <Tab.Screen name="order" component={OrderStackNavigator} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialIcons name="list-alt" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="profile" component={ProfileStackNavigator} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialIcons name="account-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;