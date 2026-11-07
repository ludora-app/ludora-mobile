import { useEffect } from 'react';
import { Box, Button, String } from '@ludo/ui';
import { Dialog, DialogContent } from '@chillui/ui';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

type DialogChoiceProps = {
  description?: string;
  onOpenChange: (open: boolean) => void;
  /** Defaults to closing the dialog. */
  onPrimaryPress?: () => void;
  onSecondaryPress: () => void;
  open: boolean;
  primaryButtonTitle: string;
  secondaryButtonTitle: string;
  /** Analytics source of the dialog. */
  source: string;
  title: string;
};

/** Centered dialog with a title, a text and two stacked choices: the main one in red, the other outlined. */
export const DialogChoice = (props: DialogChoiceProps) => {
  const {
    description,
    onOpenChange,
    onPrimaryPress,
    onSecondaryPress,
    open,
    primaryButtonTitle,
    secondaryButtonTitle,
    source,
    title,
  } = props;
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (open) trackEvent({ data: { source }, eventName: ANALYTICS_EVENTS.DIALOG_CHOICE.DIALOG_CHOICE_OPEN });
  }, [open, source, trackEvent]);

  const handlePrimaryPress = () => {
    onOpenChange(false);
    onPrimaryPress?.();
  };

  const handleSecondaryPress = () => {
    onOpenChange(false);
    onSecondaryPress();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4 rounded-sheet border-0 bg-white px-5 pt-6 pb-5">
        <Box className="gap-2">
          <String variant="title-1" font="secondaryExtraBold" className="text-center">
            {title}
          </String>
          {!!description && (
            <String font="primaryMedium" colorVariant="muted" className="text-center">
              {description}
            </String>
          )}
        </Box>
        <Box className="gap-2">
          <Button title={primaryButtonTitle} colorVariant="secondary" size="md" onPress={handlePrimaryPress} />
          <Button
            title={secondaryButtonTitle}
            variant="outlined"
            colorVariant="muted"
            size="md"
            onPress={handleSecondaryPress}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
