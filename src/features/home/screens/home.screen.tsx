import { View, Text } from "react-native";
import React from "react";
import { Image } from "@/components/chillUI/image";

export default function HomeScreen() {
  return (
    <View className="w-screen h-screen bg-black justify-center items-center">
      <Image
        source={require("../../../../assets/images/chill.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
