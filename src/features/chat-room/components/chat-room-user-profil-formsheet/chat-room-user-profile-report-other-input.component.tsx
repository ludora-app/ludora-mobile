import React from 'react';
import { Box, FormInput } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { MAX_DESCRIPTION_LENGTH } from '../../schemas/chat-room-user-profil-report-description.schema';

type ChatRoomUserProfileReportOtherInputProps = {
  control: any;
};

export default function ChatRoomUserProfileReportOtherInput(props: ChatRoomUserProfileReportOtherInputProps) {
  const { control } = props;
  const { t } = useTranslate();

  return (
    <Box className="pb-4">
      <FormInput
        label={t('profil.report_other_description_label')}
        control={control}
        name="description"
        placeholder={t('profil.report_other_description_placeholder')}
        multiline
        inputContainerClassName="min-h-24"
        hasLengthCounter
        maxLength={MAX_DESCRIPTION_LENGTH}
        hasErrorTranslation={false}
      />
    </Box>
  );
}
