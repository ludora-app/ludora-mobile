import { BottomSheet, Button } from '@chillui/ui';

import SessionFilterAccordionList from '../components/session-filter-accordion-list.component';

export default function SessionFilterScreen() {
  return (
    <BottomSheet
      screen
      scrollView
      title="FILTRER ET TRIER"
      footer={<Button title="Voir les propositions" onPress={() => {}} />}
    >
      <SessionFilterAccordionList />
    </BottomSheet>
  );
}
