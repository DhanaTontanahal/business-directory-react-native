import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { collection, query, getDocs, setDoc, doc } from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add new Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });

    GetCategoryList();
  }, [navigation, GetCategoryList]);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [addre, setAddre] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [cat, setCat] = useState();

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      console.log("Image selection was canceled");
    }
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    try {
      if (!image) {
        throw new Error("Image is not selected");
      }

      const fileName = Date.now().toString() + ".jpg";

      const resp = await fetch(image);
      if (!resp.ok) {
        throw new Error("Failed to fetch the image");
      }

      const blob = await resp.blob();

      const imageRef = ref(storage, "business-app/" + fileName);

      const uploadTask = uploadBytes(imageRef, blob);

      uploadTask
        .then((snapshot) => {
          console.log(
            "File uploaded successfully: ",
            snapshot.metadata.fullPath
          );
        })
        .then((resp) => {
          getDownloadURL(imageRef).then(async (downloadUrl) => {
            console.log(downloadUrl);
            saveBusinessDetail(downloadUrl);
          });
        })
        .catch((error) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const { user, isLoaded } = useUser();
  const saveBusinessDetail = async (imageUrl) => {
    if (!isLoaded || !user) {
      ToastAndroid.show("User information is not loaded", ToastAndroid.LONG);
      return;
    }
    try {
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name: name,
        address: addre,
        contact: contact,
        about: about,
        website: website,
        category: cat,
        user: user?.fullName,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: imageUrl,
      });
      setLoading(false);
      ToastAndroid.show("New business added", ToastAndroid.LONG);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show("Failed to save business details", ToastAndroid.LONG);
    }
  };
  const [ctList, setCtList] = useState([]);
  const GetCategoryList = async () => {
    setCtList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      console.log(doc.data());
      setCtList((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.data().name },
      ]);
    });
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add new Business
      </Text>
      <Text style={{ color: Colors.GRAY, fontFamily: "outfit-reg" }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity onPress={() => onImagePick()} style={{ marginTop: 20 }}>
        {!image ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={require("./../../assets/images/placeholder.png")}
          />
        ) : (
          <Image
            style={{ width: 100, height: 100, borderRadius: 15 }}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setAddre(v)}
          placeholder="Address"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setAbout(v)}
          multiline={true}
          numberOfLines={3}
          placeholder="About"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
            height: 100,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-reg",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        >
          {ctList.length > 0 ? (
            <RNPickerSelect
              onValueChange={(value) => setCat(value)}
              items={ctList}
            />
          ) : (
            <Text>No categories available</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 15,
          backgroundColor: Colors.GRAY,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
