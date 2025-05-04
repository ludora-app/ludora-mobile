import { Accordion, AccordionItem, Box } from '@chillUI';

import SessionFilterAccodionSort from './session-filter-accodion-items/session-filter-accodion-sort.component';
import SessionFilterAccodionDistance from './session-filter-accodion-items/session-filter-accodion-distance.component';
import SessionFilterAccodionSchedules from './session-filter-accodion-items/session-filter-accodion-schedules.component';
import SessionFilterAccodionAvailability from './session-filter-accodion-items/session-filter-accodion-availibility.component';

const sessionFilterAccordionList = [
  {
    component: SessionFilterAccodionSort,
    title: 'TRIER PAR',
  },
  {
    component: SessionFilterAccodionDistance,
    title: 'PROXIMITÉ',
  },
  {
    component: SessionFilterAccodionSchedules,
    title: 'HORAIRES',
  },
  {
    component: SessionFilterAccodionAvailability,
    title: 'DISPONIBILITÉ',
  },
];

export default function SessionFilterAccordionList() {
  return (
    <Accordion compact containerClassName="mt-5">
      {sessionFilterAccordionList.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          <Box className="mt-1">
            <item.component />
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
