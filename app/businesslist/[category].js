import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import BusinessCardbyCat from "../../components/Home/BusinessCardbyCat";
import { Colors } from "../../constants/Colors";

export default function BusListByCat() {
  const navigation = useNavigation();

  const { category } = useLocalSearchParams();

  const [busListByCat, setBusListByCat] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusList();
    return () => {};
  }, []);

  const getBusList = async () => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((element) => {
      console.log(element);
      setBusListByCat((prev) => [...prev, element.data()]);
    });
  };

  return (
    <View>
      {busListByCat.length > 0 ? (
        <FlatList
          data={busListByCat}
          renderItem={({ item }) => <BusinessCardbyCat business={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
