import COLORS from '@/constants/COLORS';
import {
  Avatar,
  Wrapper,
  String,
  Box,
  Icon,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  Separator,
  Button,
} from '@chillUI';

import ContactUserCardList from '../components/contact.user.-card-list.component';

export default function ProfilScreen() {
  return (
    <Wrapper safeAreaView={false} py scrollView>
      <Box className="flex-row items-center gap-2">
        <Avatar
          userData={{ firstname: 'John', image_url: 'https://via.placeholder.com/150', lastname: 'Doe' }}
          size="xl"
        />
        <Box>
          <String size="xl" weight="bold">
            Amir Meberbeche
          </String>
          <String size="lg" variant="gray" weight="semiBold">
            Paris, France
          </String>
          <Box className="flex-row items-center gap-2">
            <Icon variant="star-regular" color={COLORS.secondary} />
            <String>4.8</String>
          </Box>
        </Box>
      </Box>
      <Box className="py-5">
        <String>#Basketball for life 🔥</String>
      </Box>
      <Box className="flex-row gap-2">
        <Badge title="Fair Play" variant="primary" />
        <Badge title="Jeux en équipe" variant="primary" />
        <Badge title="Ponctuel" variant="primary" />
      </Box>
      <Box className="flex-row gap-2 py-5">
        <Card>
          <CardHeader>
            <CardTitle size="sm">Sessions jouées</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary" size="lg" weight="semiBold">
              35
            </String>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle size="sm">Sessions jouées</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary" size="lg" weight="semiBold">
              14
            </String>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle size="sm">Sessions jouées</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary" size="lg" weight="semiBold">
              29
            </String>
          </CardContent>
        </Card>
      </Box>
      <Box className="pb-3 pt-2">
        <String size="lg" weight="bold">
          Sport préféré
        </String>
      </Box>
      <Box className="flex-row gap-2">
        <Card>
          <CardHeader>
            <CardTitle size="sm">Football</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary">Intrmédiaire</String>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle size="sm">Tennis</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary">Débutant</String>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle size="sm">Basketball</CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <String variant="primary">Avancé</String>
          </CardContent>
        </Card>
      </Box>
      <Separator className="my-5" />
      <Box className="flex-row gap-2">
        <Button
          title="Modifier le profil "
          variant="light"
          btnClassName="flex-1 rounded-xl"
          textClassName="text-dark"
        />
        <Button title="Partager le profil" variant="light" btnClassName="flex-1 rounded-xl" textClassName="text-dark" />
        <Button variant="light" btnClassName="size-12 rounded-xl" textClassName="text-dark">
          <Icon variant="user-plus-regular" color={COLORS.primary} />
        </Button>
      </Box>
      <String size="lg" weight="bold" className="mt-5">
        Contact à découvrir
      </String>
      <ContactUserCardList />
    </Wrapper>
  );
}
