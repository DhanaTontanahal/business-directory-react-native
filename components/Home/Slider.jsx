import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";

export default function Slider() {
  //   console.log("Slider");

  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
    return () => {};
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    //console.log("getting");
    const q = query(collection(db, "Sliders"));
    const querySnapShot = await getDocs(q);
    // console.log(querySnapShot);
    querySnapShot.forEach((doc) => {
      //console.log(doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  //   console.log(sliderList);
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>

      <FlatList
        style={{ paddingLeft: 20 }}
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              marginRight: 15,
              borderRadius: 15,
            }}
          />
        )}
      />
    </View>
  );
}
