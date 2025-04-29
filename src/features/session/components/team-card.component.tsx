import ROUTES from '@/constants/ROUTES';
import { useRouter } from 'expo-router';
import { Box, Icon, String } from '@/components/chillUI';
import { FlatList, TouchableOpacity } from 'react-native';

export default function TeamCardComponent() {
  const router = useRouter();
  const teams = [
    {
      id: 1,
      maxPlayerCount: 11,
      name: 'A',
      players: [
        {
          id: 100,
          name: 'John Doe',
        },
        {
          id: 101,
          name: 'Jane Doe',
        },
        {
          id: 102,
          name: 'Charles Xavier',
        },
        {
          id: 103,
          name: 'Martian Manhunter',
        },
        {
          id: 104,
          name: 'Bruce Wayne',
        },
      ],
      playersCount: 5,
    },
    {
      id: 2,
      maxPlayerCount: 11,
      name: 'B',
      players: [
        {
          id: 200,
          name: 'Mr Anderson',
        },
        {
          id: 201,
          name: 'Agent Smith',
        },
        {
          id: 202,
          name: 'Yuji Itadori',
        },
        {
          id: 203,
          name: 'Ryomen Sukuna',
        },
        {
          id: 204,
          name: 'Satoru Gojo',
        },
      ],
      playersCount: 5,
    },
  ];
  return (
    <Box>
      <FlatList
        className="flex border border-pink-800 p-2"
        data={teams}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            className="my-2 border border-pink-500"
            onPress={() => router.push(`${ROUTES.SESSION.TEAM}/${teams[index].id}`)}
          >
            <Box className={`flex rounded-lg bg-primary p-4 ${index === 0 ? 'bg-purplePrimary' : 'bg-primary'}`}>
              <Box className="flex flex-1 flex-row items-center justify-between gap-2">
                <String variant="white"> Équipe {item.name}</String>
                <Box className="flex flex-row items-center gap-2">
                  <Icon variant="group" color="white" />
                  <String variant="white">
                    {item.playersCount} / {item.maxPlayerCount}
                  </String>
                </Box>
              </Box>
              <Box className="flex flex-1 flex-row items-center justify-between gap-2">
                <String variant="white">{item.name}</String>
                <String variant="white">
                  {item.playersCount} / {item.maxPlayerCount}
                </String>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  );
}
