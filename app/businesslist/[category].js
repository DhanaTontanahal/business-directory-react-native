import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import BusinessCardbyCat from "../../components/Home/BusinessCardbyCat";
import { Colors } from "../../constants/Colors";

export default function BusListByCat() {
  const navigation = useNavigation();

  const { category } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

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
    setBusListByCat([]);
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((element) => {
      //   console.log(element);
      setBusListByCat((prev) => [...prev, element.data()]);
    });
    setLoading(false);
  };

  return (
    <View>
      {busListByCat.length > 0 && !loading ? (
        <FlatList
          onRefresh={getBusList}
          refreshing={loading}
          data={busListByCat}
          renderItem={({ item }) => <BusinessCardbyCat business={item} />}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMARY}
        ></ActivityIndicator>
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
