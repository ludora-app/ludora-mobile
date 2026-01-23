import { AvatarContentProps } from '@/components/chill-ui-library/types';

import { String } from '../../string';
import getUserInitials from '../../../utils/user';
import { useAvatarContext } from '../context/AvatarContext';

export default function AvatarContent(props: AvatarContentProps) {
  const { firstname, lastname, ...rest } = props;
  const { size } = useAvatarContext();

  const initials = firstname ? getUserInitials({ firstname, lastname }) : '';

  return (
    <String font="primaryBold" size={size as any} {...rest}>
      {initials}
    </String>
  );
}
