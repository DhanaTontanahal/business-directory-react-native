import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();

  const { user } = useUser();
  const onDelete = () => {
    Alert.alert(
      "Do you want to delete ?",
      "Do you really want to Delete this business ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    //console.log("delete business");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted", ToastAndroid.LONG);
  };
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
          display: "flex",
          flexDirection: "row",
          marginTop: -20,
          padding: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginTop: -20,
            padding: 20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-bold",
            }}
          >
            {business.name}
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "outfit-reg" }}>
            {business.address}
          </Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress == business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
