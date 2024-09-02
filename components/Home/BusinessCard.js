import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function BusinessCard({ business }) {
  console.log(business.address);

  return (
    <View
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 200, height: 130, borderRadius: 15 }}
      />

      <View>
        <Text style={{ fontSize: 17, fontFamily: "outfit-bold" }}>
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "outfit-reg",
            color: Colors.GRAY,
          }}
        >
          {business.address}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("./../../assets/images/star.png")}
            style={{ width: 15, height: 15, marginTop: 5 }}
          />
          <Text style={{ fontFamily: "outfit-reg" }}>4.5</Text>
        </View>

        <Text
          style={{
            fontFamily: "outfit",
            backgroundColor: Colors.PRIMARY,
            color: "#fff",
            padding: 3,
            fontSize: 10,
            borderRadius: 5,
          }}
        >
          {business.category}
        </Text>
      </View>
    </View>
  );
}
