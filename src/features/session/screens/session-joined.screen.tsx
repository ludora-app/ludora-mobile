import { Button, Icon, String, Wrapper } from '@ludo/ui';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

export default function SessionJoinedScreen() {
  return (
    <>
      <HeaderGoBack />
      <Wrapper fill className="items-center justify-center gap-4">
        <Icon name="ludo-fight" className="size-36" />
        <String variant="title-1" font="primaryBold">
          Prêt(e) pour le combat !
        </String>
        <String className="text-center">
          Vous avez rejoint le match ! Discutez dès à présent avec les autres joueurs pour découvrir votre équipe et les
          règles du match.
        </String>
        <Button title="Echanger avec les joueurs" />
        <Button title="Retourner à l’accueil" variant="outlined" className="bg-white" />
      </Wrapper>
    </>
  );
}
