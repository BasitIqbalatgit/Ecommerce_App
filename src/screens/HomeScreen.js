import React, { useContext, useEffect, useState } from 'react';
import { Pressable, TextInput,StyleSheet, Text, View, Image , ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserLogin from '../../assets/user.png';
import OfferCard from '../components/OfferCard';
import NewArrivalsCard from '../components/NewArrivalsCard';
import AuthenticationModel from '../components/AuthenticationModel';
import AuthContext from '../features/context/authContext';
import ProductContext from '../features/context/productContext';
import { async } from '@firebase/util';
import { getProducts } from '../features/firebase/Product';
import { FlatList } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
const {currentUser, isLoggedIn} = useContext(AuthContext);
const [modelVisible, setModelVisible] =useState(false);
const {products,setProducts} = useContext(ProductContext);

const fetchAllProducts = async ()=>{
  const result = await getProducts();
  setProducts(result);
}

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllProducts();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      key={item.id}
      onPress={() =>
        navigation.navigate("detail-screen", {
          productId: item?.id,
        })
      }
    >
     
       <NewArrivalsCard title={item?.title}
        image={item?.image}
        price={item?.price}
        brand={item?.brand}/>
           
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View style={styles.menuIcon}>
        <MaterialIcons name="menu" size={24} color="#fff" />
        </View>

        {!isLoggedIn && (
        <Pressable style={styles.PressableStyle} onPress={()=>{setModelVisible(true)}}>
          <Image source={UserLogin} style={styles.userImage} />
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        ) }

      </View>
      <View style={{paddingHorizontal:20,
    marginTop:24,}}>
          <Text style={{fontWeight:"bold", fontSize:24}}>Wellcome! {currentUser?.name}</Text>
          <Text style={{fontWeight:"600",fontSize:20,color: '#808080'}}>Our Fashion App</Text>
        </View>

        <View style={{marginTop:24, paddingHorizontal:20}}>
          <View style={styles.search}>
            <View>
            <MaterialIcons name="search" size={24} color={"#111"} />
            </View>
            <TextInput
              placeholder="Search..."
              placeholderTextColor={"#666666"}
              style={{paddingHorizontal:8}}
            />
          </View>
        </View>
        
        <View style={{marginTop:30, padding:20}}>
          <OfferCard />
        </View>

        <View style={{marginTop:16}}>
          <View style={{   flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,}}>
            <Text style={{fontSize: 18,
    fontWeight: 'bold',}}>New Arrivals</Text>
            <Pressable onPress={()=> navigation.navigate("product-screen")}>
              <Text style={{fontSize: 12,
    color: '#888',}}>View all</Text>
            </Pressable>

          </View>

          {
            <FlatList data={products}
            keyExtractor={(product)=>product.id}
            renderItem={renderItem} 
            horizontal={true}
            style={{marginTop:24, marginLeft:30}}
            />
          }
          
        </View>

        <View>
          <AuthenticationModel 
            modelVisible={modelVisible}
            setModelVisible={setModelVisible}
          />
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:20,
    marginTop:24,
    alignItems: 'center',
  },
  menuIcon:{
    justifyContent:"center",
    backgroundColor:"black",
    alignItems:"center",
    borderRadius:25,
    width:40,
    height:40
  },
  PressableStyle:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
    borderWidth:1,
    borderColor: '#CBD5E0'

  }
  ,
  userImage: {
    height: 48,
    width: 48,
  },
  loginText:{
    fontWeight:"bold",
    fontSize:16,
    paddingVertical:8,
    paddingRight:16,
    paddingLeft:8
  },
  search:{
    flexDirection:'row',
    backgroundColor: '#E5E7EB',
    borderRadius:20,
    paddingVertical:8,
    paddingHorizontal:12,
    alignItems:"center"

  }
});

export default HomeScreen;
