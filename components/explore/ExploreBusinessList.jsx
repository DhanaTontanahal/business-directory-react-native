import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businesslist }) {
  return (
    <FlatList
      data={businesslist}
      renderItem={({ item, index }) => (
        <BusinessListCard key={index} business={item} />
      )}
      ListFooterComponent={<View style={{ height: 400 }} />}
    />
  );
}
