import { View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Colors";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import BusinessCard from "./BusinessCard";

export default function BusinessList() {
  const [busList, setBusList] = useState([]);

  const GetBusList = async () => {
    setBusList([]);

    const q = query(collection(db, "BusinessList"), limit(10));

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setBusList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  useEffect(() => {
    GetBusList();
    return () => {};
  }, []);

  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View all
        </Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={busList}
        renderItem={({ item, index }) => (
          <BusinessCard business={item} key={index} />
        )}
      />
    </View>
  );
}
