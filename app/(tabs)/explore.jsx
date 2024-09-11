import { View, Text, TextInput, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import React, { useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/explore/ExploreBusinessList";

export default function explore() {
  const [businesslist, setBusinesslist] = useState([]);

  const GetBusinessByCategory = async (category) => {
    setIsLoading(true);
    setBusinesslist([]);
    // console.log("***");
    // console.log(category);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setBusinesslist((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });

    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          padding: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          marginVertical: 10,
          marginTop: 30,
          borderRadius: 10,
          borderColor: Colors.PRIMARY,
          borderWidth: 1,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          style={{ fontFamily: "outfit-reg", fontSize: 16 }}
          placeholder="Search..."
        ></TextInput>
      </View>

      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />

      {isLoading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      ) : businesslist.length > 0 ? (
        <ExploreBusinessList businesslist={businesslist} />
      ) : (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text
            style={{
              alignItems: "center",
              fontFamily: "outfit-reg",
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            No Business Found
          </Text>
        </View>
      )}
    </View>
  );
}
