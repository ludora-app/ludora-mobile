import { useState } from 'react';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Button, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { FieldResponseDto } from '@/api/generated/model';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FooterWrapper } from '@/components/ui/footer-wrapper';
import { DialogChoice } from '@/components/ui/dialog/dialog-choice';
import { PreparedSessionValues } from '@/utils/prepared-session.utils';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { usePublishPreparedSession } from '../../queries/publish-prepared-session.query';

type OnBoardingSessionsPreparedFooterProps = {
  field: FieldResponseDto | null;
  isLoading: boolean;
  preparedSession: PreparedSessionValues | null;
};

export const OnBoardingSessionsPreparedFooter = (props: OnBoardingSessionsPreparedFooterProps) => {
  const { field, isLoading, preparedSession } = props;
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isPublishing, publish } = usePublishPreparedSession();
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const handlePublish = async () => {
    if (!field || !preparedSession) return;
    try {
      const sessionUid = await publish({ fieldUid: field.uid, preparedSession });
      trackEvent({
        data: { invited_count: 0, session_uid: sessionUid, sport: preparedSession.sport },
        eventName: ANALYTICS_EVENTS.ONBOARDING.PREPARED_SESSION_PUBLISHED,
      });
      toast({ message: t('on-boarding.sessions.invite.published'), variant: 'success' });
      router.navigate(ROUTES.ON_BOARDING.SESSIONS_INVITE);
    } catch (error) {
      trackEvent({
        data: { error_message: (error as ErrorResponse)?.api_error_detail ?? 'Unknown error', invited_count: 0 },
        eventName: ANALYTICS_EVENTS.ONBOARDING.PREPARED_SESSION_PUBLISH_FAILED,
      });
      trackError({ error, extra: { context: 'OnBoardingSessionsPreparedFooter' } });
    }
  };

  // Without field, the main action becomes choosing where to play
  const handleChooseField = () => router.navigate(ROUTES.ON_BOARDING.SESSIONS_FIELDS);

  const handleDoNotPublish = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.PREPARED_SESSION_NOT_PUBLISHED });
    router.dismissTo(ROUTES.HOME.INDEX);
  };

  return (
    <FooterWrapper className="items-center gap-1" hasBottomSafeArea>
      {field ? (
        <Button
          title={t('on-boarding.sessions.prepared.publish')}
          colorVariant="secondary"
          size="xl"
          isLoading={isLoading || isPublishing}
          onPress={handlePublish}
        />
      ) : (
        <Button
          title={t('on-boarding.sessions.prepared.choose_place')}
          colorVariant="muted"
          size="xl"
          isLoading={isLoading}
          onPress={handleChooseField}
        />
      )}
      <Pressable className="h-12 justify-center" onPress={() => setIsLeaveDialogOpen(true)}>
        <String font="primaryExtraBold" colorVariant="primary" className="underline">
          {t('on-boarding.sessions.go_home')}
        </String>
      </Pressable>
      <DialogChoice
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        title={t('on-boarding.sessions.prepared.leave_title')}
        description={t('on-boarding.sessions.prepared.leave_description')}
        primaryButtonTitle={t('on-boarding.sessions.prepared.leave_continue')}
        secondaryButtonTitle={t('on-boarding.sessions.go_home')}
        onSecondaryPress={handleDoNotPublish}
        source="on-boarding-prepared-session-leave"
      />
    </FooterWrapper>
  );
};
