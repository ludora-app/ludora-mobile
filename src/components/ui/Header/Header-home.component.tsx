import { z } from 'zod';
import ROUTES from '@/constants/ROUTES';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Icon, FormInput, String } from '@chillUI';

const formSchema = z.object({
  search: z.string().min(1, { message: 'Rechercher une session sportive' }),
});

export default function HeaderHome() {
  const { control } = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <Box>
      <String variant="white" weight="bold" size="xl">
        Bonjour, Thomas 👋{' '}
      </String>
      <String variant="white" weight="semiBold" size="sm">
        Prêt à trouver une session sportive aujourd’hui ?
      </String>
      <Box className="flex-row items-center gap-4">
        <Box className="flex-1">
          <FormInput placeholder="Rechercher une session sportive" name="search" control={control} />
        </Box>
        <Box className="size-14 pt-0.5">
          <Button variant="icon" redirect={ROUTES.SESSION.FILTER}>
            <Icon variant="filter-regular" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
