import { Box, String } from '@ludo/ui'

type LegalBulletItemProps = {
  label?: string
  value: string
}

export default function LegalBulletItem({ label, value }: LegalBulletItemProps) {
  return (
    <Box className="flex-row pl-2">
      <String variant="body-sm" className="text-gray-700">• </String>
      <String variant="body-sm" className="text-gray-700 flex-1" useFastText={false}>
        {label ? <String font="primaryBold" variant="body-sm" useFastText={false}>{label}</String> : null} {value}
      </String>
    </Box>
  )
}
