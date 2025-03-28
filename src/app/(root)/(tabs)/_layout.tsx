import Icon from "@/components/chillUI/Icon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "pink",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon variant="home-solid" color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="welcome"
        options={{
          title: "Bienvenue",
          tabBarIcon: ({ focused }) => (
            <Icon variant="bank-solid" color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="other"
        options={{
          title: "Autre",
          tabBarIcon: ({ focused }) => (
            <Icon variant="star-solid" color={focused ? "blue" : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
}
