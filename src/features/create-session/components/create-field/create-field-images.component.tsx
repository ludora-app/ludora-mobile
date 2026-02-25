import { useEffect, useState } from 'react'
import { useTranslate } from '@tolgee/react'
import { Box, Icon, Image, String } from '@ludo/ui'
import { Pressable, ScrollView } from 'react-native'
import { useController, UseControllerProps } from 'react-hook-form'

import COLORS from '@/constants/colors.contstants'
import { usePickImage } from '@/hooks/image-picker.hook'

import { CreateFieldSchema } from '../../schemas/create-field.schema'

const MAX_IMAGES = 5

export type FieldImage = {
  name: string
  file: string
  order: number
}

type CreateFieldImagesProps = UseControllerProps<CreateFieldSchema>

export default function CreateFieldImages(props: CreateFieldImagesProps) {
  const { control, name } = props
  const { t } = useTranslate()
  const { field: { onChange: onChangeImages }, fieldState: { error } } = useController({ control, name })
  const { handlePickImage, images: pickedImages } = usePickImage()
  const [images, setImages] = useState<FieldImage[]>([])

  useEffect(() => {
    if (pickedImages && pickedImages.length > 0) {
      setImages(prev => {
        const newImages: FieldImage[] = pickedImages.map((img, index) => ({
          file: img.uri,
          name: img.fileName ?? `image-${Date.now()}`,
          order: prev.length + index,
        }))
        const merged = [...prev, ...newImages].slice(0, MAX_IMAGES)
        const next = merged.map((img, i) => ({ ...img, order: i }))
        onChangeImages(next)
        return next
      })
    }
  }, [pickedImages, onChangeImages])

  const handleAddImage = () => {
    if (images.length >= MAX_IMAGES) return
    handlePickImage({ isCamera: false, isMultiple: true })
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const filtered = prev.filter((_, i) => i !== index)
      const next = filtered.map((img, i) => ({ ...img, order: i }))
      onChangeImages(next)
      return next
    })
  }

  return (
    <Box className="gap-1">
      <String variant="body-sm">
        {t('common.photos')} ({images.length}/{MAX_IMAGES})
      </String>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {images.map((img, index) => (
          <Box key={`${img.file}-${img.order}`} className="relative size-20 rounded-lg overflow-hidden">
            <Image source={{ uri: img.file }} className="size-full" contentFit="cover" />
            <Pressable
              onPress={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 z-10 size-6 items-center justify-center rounded-full bg-black/60"
            >
              <Icon name="close-circle-regular" size="xs" color="#FFF" />
            </Pressable>
          </Box>
        ))}
        {images.length < MAX_IMAGES && (
          <Pressable
            onPress={handleAddImage}
            className="size-20 items-center justify-center rounded-lg border border-dashed border-muted bg-background"
          >
            <Icon name="add-circle-regular" size="lg" color={COLORS.muted} />
          </Pressable>
        )}
      </ScrollView>
      {error?.message && (
        <String variant="body-xs" colorVariant="error" className="mt-1">
          {t(error.message)}
        </String>
      )}
    </Box>
  )
}
