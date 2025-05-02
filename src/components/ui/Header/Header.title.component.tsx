import React from 'react';
import { String } from '@/components/chillUI';

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <String variant="white" weight="bold" size="xl" className="capitalize">
      {title}
    </String>
  );
}
