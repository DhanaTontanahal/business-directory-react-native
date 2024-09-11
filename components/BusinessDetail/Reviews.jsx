import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { doc } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const [userInput, setUserInput] = useState();
  const { user } = useUser();
  const onSubmit = async () => {
    try {
      const docRef = doc(db, "BusinessList", business?.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName,
          userImage: user?.imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      ToastAndroid.show("Comment added successfully", ToastAndroid.BOTTOM);
    } catch (error) {
      console.error("Error adding comment: ", error);
      ToastAndroid.show("Failed to add comment", ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>

      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          onChangeText={(value) => setUserInput(value)}
          numberOfLines={4}
          placeholder="Write your comment"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          onPress={() => onSubmit()}
          disabled={!userInput}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-reg",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{ height: 50, width: 50, borderRadius: 99 }}
            />
            <View style={{ display: "flex", gap: 5 }}>
              <Text style={{ fontFamily: "outfit-medium" }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
