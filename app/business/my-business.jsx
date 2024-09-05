import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  where,
  loadBundle,
} from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import BusinessListCard from "../../components/explore/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();

  const navigation = useNavigation();

  const GetUserBusiness = async () => {
    setLoading(true);
    setBusList([]);
    // console.log("*****GetUserBusinessGetUserBusiness*******88");
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );

    const qsnapShot = await getDocs(q);

    qsnapShot.forEach((doc) => {
      //   console.log(doc.data());
      setBusList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });

    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    user && GetUserBusiness();
    return () => {};
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [busList, setBusList] = useState([]);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        My Business
      </Text>

      {busList.length > 0 ? (
        <FlatList
          data={busList}
          onRefresh={GetUserBusiness}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-reg",
            textAlign: "center",
            marginTop: 20,
            fontSize: 20,
            color: Colors.GRAY,
          }}
        >
          No business found
        </Text>
      )}
    </View>
  );
}
