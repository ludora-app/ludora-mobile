import { Stack } from 'expo-router';


export default function ProfilLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: {
          backgroundColor: '#FFF',
        },
        headerShown: false,
        presentation: 'formSheet',
        sheetAllowedDetents: 'fitToContents',
        sheetCornerRadius: 12,
      }}
    />
  );
}


