import { registerImage } from 'assets';
import { Wrapper, Box, String, Image } from '@/components/chillUI';

export default function RegisterStep2Screen() {
  // const form = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   onSubmit: values => {
  //     console.log(values);
  //   },
  // });
  return (
    <Wrapper>
      <Box className="items-center justify-center gap-4">
        <Image source={registerImage} contentFit="contain" className="h-[40%] w-5/6" />
        <String size="3xl" weight="bold">
          Créer un compte
        </String>
      </Box>
    </Wrapper>
  );
}
