import React from 'react'

import { EmptyResult } from '@/components/ui/empty-resulat'

export default function FiltersAddressesListEmpty() {
  return (
    <EmptyResult
      center
      hasRandomTitle
      iconNames={["ludo-sunglass", "ludo-eating-pizza", "ludo-search"]}
      randomOptions={3}
      title="filters-addresses.list_empty_title_v"
      className='mt-14'
    />
  )
}