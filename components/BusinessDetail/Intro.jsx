import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={40} color="white" />
        </TouchableOpacity>

        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image
        style={{ width: "100%", height: 340 }}
        source={{ uri: business.imageUrl }}
      />

      <View
        style={{
          marginTop: -20,
          padding: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text style={{ fontSize: 26, fontFamily: "outfit-bold" }}>
          {business.name}
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "outfit-reg" }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}
