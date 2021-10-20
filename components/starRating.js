import React, { useState } from "react";
import { View,Alert } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.score);
  const submit = async (e) => {
    console.log(e)
    let response = await fetch(`http://192.168.42.17:5000/api/produitfinal/rating/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating:e
      }),
    });
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
  };
  return (
    <View>
      {props.id && (
        <AirbnbRating
          count={5}
          reviews={[]}
          defaultRating={rating}
          size={20}
          onFinishRating={(e) => {
            submit(e);
          }}
        />
      )}
    </View>
  );
};
export default StarRating;
