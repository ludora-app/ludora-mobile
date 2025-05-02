import { z } from 'zod';
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
        <Box>
          <Button variant="icon" btnClassName="p-5 mt-1">
            <Icon variant="filter-regular" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
