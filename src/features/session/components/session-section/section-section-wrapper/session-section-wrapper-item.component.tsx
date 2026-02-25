
import { Box } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { PropsWithChildren, useMemo } from 'react';

import COLORS from '@/constants/colors.contstants';
import { cn } from '@/components/chill-ui-library';

import { useSessionTeamStore } from '../../../stores/session-team.store';


type SessionSectionWrapperItemProps = {
  className?: string;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: `0px 0px 10px #00000040`,
  },
  shadowLeft: {
    boxShadow: `0px 0px 10px ${COLORS.primary}40`,
  },
  shadowRight: {
    boxShadow: `0px 0px 10px ${COLORS.secondary}40`,
  }
});

export default function SessionSectionWrapperItem(props: PropsWithChildren<SessionSectionWrapperItemProps>) {
  const { children, className } = props;
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const handleShadow = useMemo(() => {
    if (!sideTeam) {
      return styles.shadow;
    }
    if (sideTeam === 'left') {
      return styles.shadowLeft;
    }
    return styles.shadowRight;
  }, [sideTeam]);


  return (
    <Box
      className={cn('rounded-lg p-3', { 'bg-primary/20': sideTeam === 'left', 'bg-secondary/20': sideTeam === 'right' }, className)}
      style={handleShadow}
    >
      {children}
    </Box>
  );
}