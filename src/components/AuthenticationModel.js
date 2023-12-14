import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useContext, useState, useEffect} from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, logout } from '../features/firebase/UserAuth';

import AuthContext from '../features/context/authContext';

const AuthenticationModel = ({ modelVisible, setModelVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser,setCurrentUser,setIsLoggedIn ,isLoggedIn} = useContext(AuthContext);

  const handleLogin = async() => {
    const res= await loginWithEmailAndPassword(email,password)
    if(res.success===true){
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      setModelVisible(false);
    }
  };
  

  const handleRegister = async() => {
      // setLoading(true)
      const res = await registerWithEmailAndPassword(name,email,password)
      if(res.success===true){
        // setCurrentUser({name,email});
        // setIsLoggedIn(true);
        setModelVisible(false);
      }
  };

  


  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);
 

  return (
    <View style={{ flex: 1, width: 1150 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => {
          setModelVisible(false);
        }}
      >
        {type === "login" ? (
          <Pressable onPress={()=>setModelVisible(false)} 
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 24,
                borderRadius: 10,
              }}
            >
              <Text style={styles.label}>Email: </Text>
              <TextInput
                name="email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                keyboardType="email-address"
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 12 }]}>Password: </Text>
              <TextInput
              
                name="password"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true}
                style={styles.input}
              />

              <TouchableOpacity
              onPress={handleLogin}
                style={{
                  backgroundColor: "black",
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginTop: 26,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 17, justifyContent: "center", flexDirection: 'row', }}>
                <Text>
                  Not a User?
                </Text>
                <Pressable onPress={() => setType("register")}>
                  <Text style={{ fontWeight: "bold" }}>  Register</Text>
                </Pressable>
              </View>
            </View>
            {/* {loading
                &&
                <ActivityIndicator />
              } */}
          </Pressable>
        ) : (
          <Pressable onPress={()=>setModelVisible(false)} 
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 24,
                borderRadius: 10,
              }}
            >
              <Text style={styles.label}>Email: </Text>
              <TextInput placeholder="test@gmail.com"
                name="email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                keyboardType="email-address"
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 12 }]}>User Name: </Text>
              <TextInput placeholder="user"
                name="name"
                value={name}
                onChangeText={(t) => setName(t)}
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 12 }]}>Password: </Text>
              <TextInput placeholder="Minimum 6 characters"
                name="password"
                value={password}
                onChangeText={(t) => setPassword(t)}                
                secureTextEntry={true}
                style={styles.input}
              />


              <TouchableOpacity              
              onPress={handleRegister}
                style={{
                  backgroundColor: "black",
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginTop: 26,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 17, justifyContent: "center", flexDirection: 'row', }}>
                <Text>
                  Already a User?
                </Text>
                <Pressable onPress={() => setType("login")}>
                  <Text style={{ fontWeight: "bold" }}>  Login  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 12,

  },
});

export default AuthenticationModel;
