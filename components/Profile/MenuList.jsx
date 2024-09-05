import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business-and-trade.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share_1.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "",
    },
  ];
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 15,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                flex: 1,
                fontFamily: "outfit-medium",
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />

      <Text
        style={{
          fontFamily: "outfit-reg",
          fontSize: 16,
          color: Colors.GRAY,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Developed by Dhana Tontanahal @2024
      </Text>
    </View>
  );
}
