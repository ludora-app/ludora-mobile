import { Icon } from '@chillUI';
import { Tabs } from 'expo-router';

function HomeIcon({ focused }: { focused: boolean }) {
  return <Icon variant="home-solid" color={focused ? 'blue' : 'gray'} />;
}

function WelcomeIcon({ focused }: { focused: boolean }) {
  return <Icon variant="bank-solid" color={focused ? 'blue' : 'gray'} />;
}

function OtherIcon({ focused }: { focused: boolean }) {
  return <Icon variant="star-solid" color={focused ? 'blue' : 'gray'} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          backgroundColor: 'pink',
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: HomeIcon,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="welcome"
        options={{
          tabBarIcon: WelcomeIcon,
          title: 'Bienvenue',
        }}
      />
      <Tabs.Screen
        name="other"
        options={{
          tabBarIcon: OtherIcon,
          title: 'Autre',
        }}
      />
    </Tabs>
  );
}
