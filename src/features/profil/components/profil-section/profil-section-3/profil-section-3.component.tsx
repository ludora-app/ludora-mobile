
import ProfilSection3Me from './profil-section-3-me.component';
import ProfilSection3User from './profil-section-3-user.component';

interface ProfilSection3Props {
  isMe: boolean;
}

export default function ProfilSection3(props: ProfilSection3Props) {
  const { isMe } = props;
  return (
    isMe ? <ProfilSection3Me /> : <ProfilSection3User />
  )
}