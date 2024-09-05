import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businesslist }) {
  return (
    <ScrollView>
      <FlatList
        scrollEnabled
        data={businesslist}
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />

      <View style={{ height: 400 }}></View>
    </ScrollView>
  );
}
