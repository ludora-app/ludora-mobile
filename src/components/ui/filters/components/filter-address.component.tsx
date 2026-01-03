import { useForm } from 'react-hook-form';
import { Box, FormInput, String } from '@ludo/ui';

export default function FilterAddress() {
  const { control } = useForm();
  return (
    <Box>
      <FormInput control={control} name="address" />
      <String>FilterAddress</String>
    </Box>
  );
}
