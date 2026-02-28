import { useTranslate } from '@tolgee/react'
import { BoxRow, Button, Link } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { useUserMe } from '@/queries/user-me.query'
import { ShareButton } from '@/components/ui/share-button'

export default function ProfilSection3Me() {
  const { userMeId } = useUserMe()
  const { t } = useTranslate()

  const shareUrl = `https://www.ludora.fr${ROUTES.PROFIL.INDEX_UID(userMeId)}`;

  return (
    <BoxRow className='items-center gap-2'>
      <Link href={ROUTES.PROFIL.EDIT} asChild>
        <Button title={t('profil.edit_my_profile_button_title')} className='flex-2' size="sm" />
      </Link>
      <Link href={ROUTES.MY_FIELDS.INDEX} asChild>
        <Button title={t('profil.see_my_fields_button_title')} className='flex-1' size="sm" variant="outlined" />
      </Link>
      <ShareButton
        message={t('profil.share_my_profile_message', { url: shareUrl })}
        title={t('profil.share_my_profile_title')}
        url={`https://www.ludora.fr${ROUTES.PROFIL.INDEX_UID(userMeId)}`}
        iconButtonProps={{
          className: 'p-2 rounded-full',
          size: 'xs',
        }}
      />
    </BoxRow>
  )
}