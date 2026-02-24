import { Box, Skeleton } from '@ludo/ui';




export default function ProfilSesion2Skeleton() {
  return (
    <Box className='gap-2'>
      <Skeleton variant="text" size="sm" />
      <Skeleton variant="text" size="sm" />
    </Box>
  )
}