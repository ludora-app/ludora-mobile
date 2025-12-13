import useGetUserLocation from '@/hooks/useGetUserLocation';

interface UserLocationProviderProps {
  children: React.ReactNode;
}

export default function UserLocationProvider({ children }: UserLocationProviderProps) {
  useGetUserLocation();

  return children;
}
