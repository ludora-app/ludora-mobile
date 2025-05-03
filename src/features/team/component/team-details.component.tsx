import Avatar from '@/components/chillUI/avatar/Avatar';
import { Box, cn, Icon, String } from '@/components/chillUI';

export interface TeamDetailsProps {
  name: string;
  playersCount: number;
  maxPlayerCount: number;
  players: {
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    rating: number;
    address: string;
  }[];
}

export default function TeamDetails({ maxPlayerCount, name, players, playersCount }: TeamDetailsProps) {
  return (
    <Box className="my-4 rounded-lg p-4">
      <Box className="mb-4 flex flex-row items-center justify-between">
        <Box className="flex flex-row items-center gap-2">
          <Icon variant="user-group-regular" />
          <String weight="medium">Équipe {name}</String>
        </Box>
        <String>
          {playersCount} / {maxPlayerCount} joueurs
        </String>
      </Box>
      <Box className="flex flex-wrap items-center gap-2">
        {players.map((player, index) => (
          <Box key={player.id} className={cn('w-full border-b border-gray px-4 py-2', { 'border-t': index === 0 })}>
            <Box className="flex flex-row items-center gap-2">
              <Avatar
                userData={{
                  firstname: player.firstName,
                  image_url: player.profilePic,
                  lastname: player.lastName,
                }}
                size="md"
              />
              <Box className="flex justify-start">
                <String className="mt-1" weight="medium">
                  {player.firstName} {player.lastName}
                </String>
                <Box className="flex flex-row items-center gap-2">
                  <Box>
                    <String className="mt-1 text-center" variant="gray">
                      {player.address.length > 20 ? `${player.address.substring(0, 25)}...` : player.address}
                    </String>
                  </Box>
                  <Box>
                    <Icon variant="star-regular" color="#FFCC00" />
                  </Box>

                  <String className="mt-1 text-center" variant="gray">
                    {player.rating}
                  </String>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
