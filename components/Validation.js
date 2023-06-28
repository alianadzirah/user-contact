import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import CountryCode from "rn-weblineindia-country-code";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";

// User data
const userData = {
  userCount: 3,
  userProfile: [
    {
      contactInfo: "60123456789",
      contactType: "M",
      name: "John Smith",
      age: "24",
    },
    {
      contactInfo: "jccs44@haysc.com",
      contactType: "E",
      name: "Jenson",
      age: "31",
    },
    {
      contactInfo: "12123456789",
      contactType: "M",
      name: "John Smith",
      age: "24",
    },
  ],
};

const Validation = () => {
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState(null);
  const [enableCC, setEnableCC] = useState(false);

  const country = ['MY +60', 'US +1', 'AUS +61']

  function openCountryCode() {
    this.props.navigation.navigate("CountryCode", {
      // Pass all props here...
      isFrom: "HomeScreen", // Your routeName
      onChangeValue: (data) => {
        console.log("data ->", data);
      },
    });
  }

  const handleSearch = () => {
    const user = searchUser(contact);
    if (user) {
      setProfile(user);
    } else {
      setProfile(null);
      Alert.alert(
        "Profile not found",
        "Please enter a valid contact information."
      );
    }
  };

  const handleContactChange = (value) => {
    if (!isNaN(+value)) {
      if (value === "" || value === null || value === undefined) {
        setEnableCC(false);
        console.log("numbericc" + value);
      } else {
        console.log("numberic" + value);
        setEnableCC(true);
      }
    } else {
      console.log("alphabet" + value);
      setEnableCC(false);
    }
    setContact(value.trim());
  };

  const searchUser = (contactInfo) => {
    const user = userData.userProfile.find((profile) => {
      if (profile.contactType === "M" && profile.contactInfo === contactInfo) {
        return true;
      } else if (
        profile.contactType === "E" &&
        profile.contactInfo.toLowerCase() === contactInfo.toLowerCase()
      ) {
        return true;
      }
      return false;
    });

    return user;
  };

  return (
    <View>
      <Text>Contact Information:</Text>
      {enableCC ? (
        <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", alignSelf: "center"}}>
          <SelectDropdown
            data={country}
            defaultButtonText="MY +60"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            buttonStyle={{height:50, width:80}}
            buttonTextStyle={{fontSize: 12}}
          />
          <TextInput
            placeholder="Enter mobile number"
            value={contact}
            onChangeText={handleContactChange}
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            style={
              (styles = {
                borderWidth: 1,
                borderColor: "gray",
                padding: 8,
                margin: 10,
                width: 200,
              })
            }
          />
        </View>
      ) : (
        <TextInput
          placeholder="Enter email or mobile number"
          value={contact}
          onChangeText={handleContactChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={
            (styles = {
              borderWidth: 1,
              borderColor: "gray",
              padding: 8,
              margin: 10,
              width: 200,
            })
          }
        />
      )}

      {profile ? (
        <View>
          <Text>Name: {profile.name}</Text>
          <Text>Age: {profile.age}</Text>
        </View>
      ) : null}

      <Button
        title="Search"
        style={{
          backgroundColor: "yellow",
          padding: 20,
        }}
        onPress={handleSearch}
      />
    </View>
  );
};

export default Validation;
