import { BoxRow, Button } from '@ludo/ui'


export default function ProfilSection3Me() {

  return (
    <BoxRow className='items-center gap-2'>
      <Button title='Voir mes cartes' className='flex-1' size="xs" />
      <Button title='Partager mon profil' className='flex-1' size="xs" />
    </BoxRow>
  )
}