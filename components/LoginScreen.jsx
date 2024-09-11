import { View, Text, Image, Touchable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>

      <View style={{ backgroundColor: "#fff", padding: 20, marginTop: -20 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your ultimate
          <Text style={{ color: Colors.PRIMARY }}>Business Directory</Text>
        </Text>

        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            fontFamily: "outfit-reg",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite business near you and post your business in your
          community
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit-reg",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    marginTop: 20,
    borderRadius: 99,
  },
});
