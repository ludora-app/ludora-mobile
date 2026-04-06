import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar, Box, Separator, String, Wrapper } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { IS_ANDROID, IS_IOS } from '@/constants/platform.constants';
import QuickActionCard from '@/components/ui/quick-action-card.component';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useReportUser } from '@/features/profil/queries/report-user.query';
import { BoxRowCenterBetween, useToast } from '@/components/chill-ui-library';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';
import { CreateReportDtoReason, FindOneConversationResponseDataType } from '@/api/generated/model';

import ChatRoomUserProfileBlockUser from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-block-user.component';
import ChatRoomUserProfileReportUser from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-report-user.component';
import ChatRoomUserProfileReportReasons from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-report-reasons.component';
import ChatRoomUserProfileReportOtherInput from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-report-other-input.component';
import ChatRoomUserProfileReportConfirmDialog from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-report-confirm-dialog.component';
import ChatRoomUserProfileReportOtherBottomSheet from '../components/chat-room-user-profil-formsheet/chat-room-user-profile-report-other-bottom-sheet.component';
import {
  ChatRoomUserProfileReportDescriptionSchema,
  chatRoomUserProfileReportDescriptionSchema,
} from '../schemas/chat-room-user-profil-report-description.schema';

type FormSheetView = 'actions' | 'report-reasons' | 'report-reasons-other';
type ChatRoomNavigateParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];

const ALREADY_REPORTED_ERROR = 'You already reported this user for this reason';

export default function ChatRoomUserProfileFormsheet() {
  const { bottom } = useSafeArea();
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();

  const params = useLocalSearchParams<RootStackParamList[typeof ROUTES.CHAT_ROOM.USER_PROFILE]>();
  const { firstname, imageUrl, lastname, userId } = params;

  const initialViewParam = params.initialView;
  const resolvedInitialView = initialViewParam === 'report-reasons' ? 'report-reasons' : 'actions';
  const isReportOnlyEntry = resolvedInitialView === 'report-reasons';

  const { isPending: isLoadingReport, mutateAsync: reportUser } = useReportUser();

  const [view, setView] = useState<FormSheetView>(() =>
    resolvedInitialView === 'report-reasons' ? 'report-reasons' : 'actions',
  );
  const [selectedReason, setSelectedReason] = useState<CreateReportDtoReason | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const schema = chatRoomUserProfileReportDescriptionSchema(t);
  const { control, getValues, handleSubmit, resetField } = useForm<ChatRoomUserProfileReportDescriptionSchema>({
    resolver: zodResolver(schema),
  });

  // ─── Header ──────────────────────────────────────────────────────────────────

  const headerTitle = view === 'actions' ? 'profil.actions_header_title' : 'profil.report_header_title';

  const handleGoBack = () => {
    if (view === 'report-reasons') {
      if (!isReportOnlyEntry) {
        setView('actions');
      }
      return;
    }
    if (view === 'report-reasons-other') {
      setView('report-reasons');
      return;
    }
    router.back();
  };

  const headerHasGoBack =
    view === 'actions' || view === 'report-reasons-other' || (view === 'report-reasons' && !isReportOnlyEntry);

  // ─── Actions ─────────────────────────────────────────────────────────────────

  const handleSendPrivateMessage = () => {
    if (!userId) return;
    const chatRoomParams: ChatRoomNavigateParams = {
      imageUrl: imageUrl || '',
      name: [firstname, lastname].filter(Boolean).join(' ') || '',
      receiver: serialize({ firstname: firstname ?? '', lastname: lastname ?? '', userUid: userId }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid: userId,
    };
    if (IS_IOS) {
      router.replace({ params: chatRoomParams, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) });
    } else {
      router.navigate({ params: chatRoomParams, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) });
    }
  };

  const handleViewProfile = () => {
    if (!userId) return;
    if (IS_IOS) {
      router.replace(ROUTES.PROFIL.INDEX_UID(userId));
    } else {
      router.navigate(ROUTES.PROFIL.INDEX_UID(userId));
    }
  };

  const handleSelectReason = (reason: CreateReportDtoReason) => {
    setSelectedReason(reason);
    if (reason !== CreateReportDtoReason.OTHER) {
      resetField('description');
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmReport = async () => {
    if (!selectedReason || !userId) return;
    try {
      await reportUser({
        description: selectedReason === CreateReportDtoReason.OTHER ? getValues('description') : undefined,
        reason: selectedReason,
        reportedUid: userId,
      });
      if (selectedReason === CreateReportDtoReason.OTHER) resetField('description');
      trackEvent({
        data: { reason: selectedReason },
        eventName: ANALYTICS_EVENTS.CHAT_ROOM.CHAT_ROOM_USER_PROFILE_REPORT_USER,
      });
      toast({
        message: t('profil.report_user_success_message', { name: `${firstname} ${lastname}` }),
        variant: 'success',
      });

      if (isReportOnlyEntry) {
        setView('report-reasons');
      } else {
        setView('actions');
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.api_error_detail === ALREADY_REPORTED_ERROR) {
        toast({ allowMultiple: true, message: t('profil.report_already_sent'), variant: 'info' });
        return;
      }
      trackError({ error });
    }
  };

  const handleViewChange = (newView: FormSheetView) => {
    setView(newView);
  };

  return (
    <Box style={{ paddingBottom: IS_ANDROID ? bottom : undefined }}>
      <FormSheetHeader title={t(headerTitle)} hasGoBack={headerHasGoBack} goBackAction={handleGoBack} />

      <Wrapper className="gap-4 py-4">
        {view === 'actions' && (
          <Box className="items-center gap-3 pb-2">
            <Avatar
              size="md"
              data={{
                firstname,
                imageUrl: imageUrl ? { uri: imageUrl } : undefined,
                lastname,
              }}
            />
            <Box>
              <String className="text-base font-semibold">{[firstname, lastname].filter(Boolean).join(' ')}</String>
            </Box>
          </Box>
        )}

        {view === 'actions' && (
          <Box className="gap-4">
            <BoxRowCenterBetween className="gap-2">
              <QuickActionCard
                iconName="message-text-solid"
                label={t('common.message')}
                onPress={handleSendPrivateMessage}
                hasShadow
              />
              <QuickActionCard iconName="user-solid" label={t('common.profil')} onPress={handleViewProfile} hasShadow />
            </BoxRowCenterBetween>
            <Separator />
            <ChatRoomUserProfileBlockUser />
            <ChatRoomUserProfileReportUser onPress={() => handleViewChange('report-reasons')} />
          </Box>
        )}

        {view === 'report-reasons' && (
          <ChatRoomUserProfileReportReasons
            onSelectReason={handleSelectReason}
            onPressOther={() => setView('report-reasons-other')}
          />
        )}

        {view === 'report-reasons-other' && <ChatRoomUserProfileReportOtherInput control={control} />}

        <ChatRoomUserProfileReportConfirmDialog
          firstname={firstname ?? ''}
          lastname={lastname ?? ''}
          reportDescription={getValues('description')}
          selectedReason={selectedReason}
          handleConfirmReport={handleConfirmReport}
          isLoadingReport={isLoadingReport}
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
        />
      </Wrapper>

      {view === 'report-reasons-other' && (
        <ChatRoomUserProfileReportOtherBottomSheet onPress={handleSubmit(() => setShowConfirmDialog(true))} />
      )}
    </Box>
  );
}
