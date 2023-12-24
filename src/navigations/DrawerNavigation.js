import { createDrawerNavigator } from "@react-navigation/drawer";
import AddProducts from "../Admin/AddProducts";
import TabNavigator from "./TabNavigation";

const Drawer = createDrawerNavigator();

const AdminDrawer = ({navigation}) => {
  

  return (
    <Drawer.Navigator screenOptions={{ headerTitle: "Admin Panel" }}>
      <Drawer.Screen name="AddProduct" component={AddProducts} />
      <Drawer.Screen
        name="Tab"
        component={TabNavigator}
        options={{ drawerLabel: 'User Mode' }}
      />
      
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
