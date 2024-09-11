import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButtons from "../../components/BusinessDetail/ActionButtons";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusDetail() {
  //important:this businessid should match with file name
  const { businessid } = useLocalSearchParams();
  const [busDetailInfo, setBusDetailInfo] = useState({});

  const [loading, setLoading] = useState(false);

  const getBusinessDetailById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusDetailInfo({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document exists!");
      }
    } catch (error) {
      console.error("Error fetching business details: ", error);
    } finally {
      setLoading(false); // Stop loading in both success and failure cases
    }
  };

  useEffect(() => {
    if (businessid) {
      getBusinessDetailById();
    }
  }, [businessid]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <>
          <ScrollView>
            <View>
              <Intro business={busDetailInfo} />
              <About business={busDetailInfo} />
            </View>
          </ScrollView>

          {/* Move ActionButtons outside the ScrollView because it uses FlatList */}
          <ActionButtons business={busDetailInfo} />

          {/* Move Reviews outside the ScrollView if it contains a FlatList */}
          <Reviews business={busDetailInfo} />
        </>
      )}
    </View>
  );
}
