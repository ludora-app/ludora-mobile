import { Box, BoxCenter, BoxRow, Icon, Input, Link } from '@ludo/ui';

import { DaysCarousel } from '@/components/ui/days-carousel';
import { ScalePressable } from '@/components/chill-ui-library';

import CreateSessionTitle from '../../../create-session-title-component';

export default function CreateSessionStep2FieldsListHeader() {
  return (
    <Box>
      <CreateSessionTitle title="Trop cool, on fait ça ou et quand ?" />
      {/* <FormInput name="sessionName" label="Nom de la session" control={control} /> */}
      <BoxRow className="items-center gap-2">
        <Box className="flex-1">
          <Input
            inputFieldProps={{ className: 'rounded-full', editable: false, placeholder: 'Rechercher des terrains' }}
            inputContainerClassName="rounded-full"
          />
        </Box>
        <Link href="/filters/filters-fields" asChild>
          <ScalePressable>
            <BoxCenter className="rounded-full bg-primary p-3">
              <Icon name="filter-add-solid" size="md" />
            </BoxCenter>
          </ScalePressable>
        </Link>
      </BoxRow>
      <DaysCarousel className="my-5" />
    </Box>
  );
}
