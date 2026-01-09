import React from 'react';
import { Box, String } from '@ludo/ui';

type FormSheetHeaderProps = {
  title?: string;
};

export default function FormSheetHeader(props: FormSheetHeaderProps) {
  const { title } = props;
  return (
    <Box collapsable={false}>
      <Box className="mx-auto mt-2 h-1 w-12 rounded-full bg-zinc-400" />
      {title && (
        <Box className="my-3 flex-row items-center justify-center">
          <String font="primaryBold" variant="body-3">
            {title}
          </String>
        </Box>
      )}
    </Box>
  );
}
