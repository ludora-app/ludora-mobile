// global hooks for the application
// exemple get user Data

import { useGet as useGetUserMe } from "@/api/hooks/sample.hook";

export const useUserMe = () => {
  const { data } = useGetUserMe();

  // do something
  const userData = data.text;

  return userData;
};
