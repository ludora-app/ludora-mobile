import { BoxRow, Button, IconButton } from '@ludo/ui'

export default function ProfilSection3User() {
  return (
    <BoxRow className='items-center gap-2'>
      <Button title='Demande ami' className='flex-1' size="xs" />
      <Button title='Message' className='flex-1' size="xs" />
      <IconButton iconName='card-to-left-solid' rounded="circle" size="sm" />
    </BoxRow>
  )
}