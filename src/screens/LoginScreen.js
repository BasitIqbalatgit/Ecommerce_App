import React , {useState,useEffect,useContext} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing"
import {  loginWithEmailAndPassword,  } from '../features/firebase/UserAuth';
import AuthContext from "../features/context/authContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);
  

  const handleLogin = async () => {
    if (email && password) {
      const res = await loginWithEmailAndPassword(email, password);
      if (res.success === true) {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        console.log("Name:",res.user?.name)
        if(res.user?.name === "Admin"){
          console.log("navigation to admin panel")
            navigation.navigate("Drawer")
        }else{
        navigation.navigate("Tab");
        }
      }
    }
  };
  

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary, 
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back, you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 24,
          }}
        >
          <AppTextInput placeholder="Email" name="email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                keyboardType="email-address"
                 />
          <AppTextInput placeholder="Password" name="password"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true}/>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary, 
              alignSelf: "flex-end",
            }}
          >
            Forgot your password?
          </Text>
        </View>

        <TouchableOpacity
         onPress={handleLogin}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary, 
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary, 
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary, 
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text, 
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create a new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical:  Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray, 
                borderRadius: Spacing/2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text} 
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray, 
                borderRadius: Spacing/2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.text} 
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray, 
                borderRadius: Spacing/2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text} 
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
