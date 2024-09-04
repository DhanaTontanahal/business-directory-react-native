import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButtons({ business }) {
  const actionBtnMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/call.png"),
      url: "tel:" + business.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("./../../assets/images/web.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: business.website,
    },
  ];

  const openOnPressHandler = (item) => {
    if (item.name == "share") {
      Share.share({
        message: business?.name + "\n Address " + business.address,
      });
      return;
    }
    Linking.openURL(item.url);
  };
  return (
    <View style={{ backgroundColor: "#fff", padding: 20 }}>
      <FlatList
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={actionBtnMenu}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openOnPressHandler(item)}>
            <Image style={{ width: 50, height: 50 }} source={item?.icon} />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
