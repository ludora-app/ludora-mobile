import { Stack } from "expo-router";

export default function AppLayout() {
  // const [isFirstLaunch, isConsentDataLandingSeen] = useGlobalPersistedStore(state => [
  //   state.isFirstLaunch,
  //   state.isConsentDataLandingSeen,
  // ]);

  // if (isFirstLaunch) {
  //   return <Redirect href="/onboarding" />;
  // }

  // if (!isConsentDataLandingSeen) {
  //   return <Redirect href="/consent-data" />;
  // }

  // // Only require authentication within the (root) group's layout as users
  // // need to be able to access the auth group and sign in again.
  // if (!token) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   return <Redirect href="/auth" />;
  // }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    ></Stack>
  );
}
