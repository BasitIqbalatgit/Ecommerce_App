import React, { useContext } from "react";
import { Text, View, Image, Pressable, ToastAndroid, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import User from "../../assets/user.png";
import AuthContext from "../features/context/authContext";
import { logout } from "../features/firebase/UserAuth";

const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success === true) {
      ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image source={User} style={styles.image} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser?.name}</Text>
              <Text style={styles.userEmail}>{currentUser?.email}</Text>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.loginText}>Login to view your Profile!</Text>
            </View>
          )}
        </View>
      </View>
      {isLoggedIn && (
        <View style={styles.logoutContainer}>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
    justifyContent: "space-between",
  },
  profileContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    border: 1,
    borderColor: "#A3A3A3",
    borderRadius: 8,
    overflow: "hidden",
  },
  imageBorder: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "cover",
  },
  detailsContainer: {
    marginTop: 6,
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#A3A3A3",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    width: "100%",
    padding: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default ProfileScreen;
