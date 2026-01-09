import { Box } from '@ludo/ui';
import { ScrollView } from 'react-native-gesture-handler';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import DevToolsClose from '../components/dev-tools-close.component';
import DevToolsSection from '../components/dev-tools-section.component';
import DevToolsLogoutSection from '../components/dev-tools-logout-section.component';
import DevToolsUserLoginSection from '../components/dev-tools-user-login-section.component';
import DevToolsEnvironmentSection from '../components/dev-tools-environment-section.component';

export default function DevToolsScreen() {
  return (
    <>
      <FormSheetHeader />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerClassName="pb-10">
        <Box className="gap-6 px-4 py-4">
          <DevToolsEnvironmentSection />
          <DevToolsUserLoginSection />
          <DevToolsSection />
          <DevToolsLogoutSection />
          <DevToolsClose />
        </Box>
      </ScrollView>
    </>
  );
}
