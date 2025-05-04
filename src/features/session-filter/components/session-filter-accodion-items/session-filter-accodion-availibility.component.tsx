import { Box, Button } from '@chillUI';
import React, { useState } from 'react';

export default function SessionFilterAccodionAvailability() {
  const [items, setItems] = useState([
    {
      checked: false,
      label: 'Lundi',
    },
    {
      checked: false,
      label: 'Mardi',
    },
    {
      checked: false,
      label: 'Mercredi',
    },
    {
      checked: false,
      label: 'Jeudi',
    },
    {
      checked: false,
      label: 'Vendredi',
    },
    {
      checked: false,
      label: 'Samedi',
    },
    {
      checked: false,
      label: 'Dimanche',
    },
  ]);

  const handleToggle = (index: number) => {
    setItems(prev => prev.map((item, i) => ({ ...item, checked: i === index })));
  };
  return (
    <Box className="flex flex-row flex-wrap items-center justify-center gap-3">
      {items.map((item, index) => (
        <Button
          key={index}
          onPress={() => handleToggle(index)}
          variant={item.checked ? 'primary' : 'lightBorder'}
          title={item.label}
          btnClassName="flex-none w-[45%]"
        />
      ))}
    </Box>
  );
}
