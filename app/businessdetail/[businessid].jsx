import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButtons from "../../components/BusinessDetail/ActionButtons";
import About from "../../components/BusinessDetail/About";

export default function BusDetail() {
  //important:this businessid should match with file name
  const { businessid } = useLocalSearchParams();
  const [busDetailInfo, setBusDetailInfo] = useState({});

  const [loading, setLoading] = useState(false);

  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      /// console.log("docSnap");
      setLoading(false);
      setBusDetailInfo(docSnap.data());
    } else {
      setLoading(true);
      //console.log("===========");
    }
  };

  useEffect(() => {
    getBusinessDetailById();

    return () => {};
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <View>
          <Intro business={busDetailInfo} />
          <ActionButtons business={busDetailInfo} />
          <About business={busDetailInfo} />
        </View>
      )}
    </ScrollView>
  );
}
