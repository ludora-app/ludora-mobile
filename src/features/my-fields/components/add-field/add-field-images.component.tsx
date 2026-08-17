import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, Icon, Image, String } from '@ludo/ui';
import { Pressable, ScrollView } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import { useController, UseControllerProps } from 'react-hook-form';

import COLORS from '@/constants/colors.contstants';
import { usePickImage } from '@/hooks/image-picker.hook';

import { CreateFieldSchema } from '../../schemas/create-field.schema';

const MAX_IMAGES = 5;

export type FieldImage = {
  uri: string;
  name: string;
  order: number;
  type: string;
};

type AddFieldImagesProps = UseControllerProps<CreateFieldSchema>;

function toFieldImages(pickedImages: ImagePickerAsset[], startOrder: number): FieldImage[] {
  return pickedImages.map((img, index) => ({
    name: img.fileName ?? `image-${startOrder + index}`,
    order: startOrder + index,
    type: img.mimeType ?? 'image/jpeg',
    uri: img.uri,
  }));
}

function mergeImages(prev: FieldImage[], pickedImages: ImagePickerAsset[]): FieldImage[] {
  const merged = [...prev, ...toFieldImages(pickedImages, prev.length)].slice(0, MAX_IMAGES);
  return merged.map((img, i) => ({ ...img, order: i }));
}

export default function AddFieldImages(props: AddFieldImagesProps) {
  const { control, name } = props;
  const { t } = useTranslate();
  const {
    field: { onChange: onChangeImages },
    fieldState: { error },
  } = useController({ control, name });
  const { handlePickImage } = usePickImage();
  const [images, setImages] = useState<FieldImage[]>([]);

  const handleAddImage = async () => {
    if (images.length >= MAX_IMAGES) return;
    const pickedImages = await handlePickImage({ isCamera: false, isMultiple: true });
    if (!pickedImages?.length) return;

    setImages(prev => {
      const next = mergeImages(prev, pickedImages);
      onChangeImages(next);
      return next;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const next = prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i }));
      onChangeImages(next);
      return next;
    });
  };

  return (
    <Box className="gap-1">
      <String variant="body-sm">
        {t('common.photos')} ({images.length}/{MAX_IMAGES})
      </String>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {images.map((img, index) => (
          <Box key={`${img.uri}-${img.order}`} className="relative size-20 overflow-hidden rounded-lg">
            <Image source={{ uri: img.uri }} className="size-full" contentFit="cover" />
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
  );
}
