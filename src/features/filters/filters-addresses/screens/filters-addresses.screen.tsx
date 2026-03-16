import { useState } from 'react';
import { WrapperKeyboardAvoidingView } from '@ludo/ui';

import FilterAddressesList from '../components/filter-addresses-list.component';
import FiltersAddressesHeader from '../components/filters-addresses-header.component';
import FiltersAddressesListInput from '../components/filters-addresses-list-input.component';

export default function FiltersAddressesScreen() {
  const [value, setValue] = useState('');

  return (
    <>
      <FiltersAddressesHeader />
      <WrapperKeyboardAvoidingView className="my-5" fill={false}>
        <FiltersAddressesListInput onChange={setValue} />
        <FilterAddressesList inputValue={value} />
      </WrapperKeyboardAvoidingView>
    </>
  );
}
