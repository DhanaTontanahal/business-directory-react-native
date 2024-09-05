import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [catList, setCatList] = useState([]);
  const router = useRouter();
  const GetCategoryList = async () => {
    setCatList([]);
    //console.log("GetCategoryList");
    const q = query(collection(db, "Category"));
    //console.log(q);
    const querySnapShot = await getDocs(q);
    // console.log("here");
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setCatList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    // console.log("get cat list");
    GetCategoryList();
    return () => {};
  }, []);

  const onCategoryPress = (c) => {
    if (!explore) {
      router.push("/businesslist/" + c.name);
    } else {
      onCategorySelect(c.name);
    }
    // console.log(c);
  };
  return (
    <View>
      {!explore && (
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
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
            Category
          </Text>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
            View all
          </Text>
        </View>
      )}

      <FlatList
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={catList}
        renderItem={({ item }) => (
          <CategoryItem
            onCategoryPress={(c) => onCategoryPress(c)}
            category={item}
          />
        )}
      />
    </View>
  );
}
