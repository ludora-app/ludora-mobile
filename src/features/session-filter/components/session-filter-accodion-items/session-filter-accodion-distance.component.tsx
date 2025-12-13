import { Box, Button } from '@chillui/ui';
import React, { useState } from 'react';

export default function SessionFilterAccodionDistance() {
  const [items, setItems] = useState([
    {
      checked: false,
      label: '0-10km',
    },
    {
      checked: false,
      label: '10-20km',
    },
    {
      checked: false,
      label: '20-30km',
    },
    {
      checked: false,
      label: '+ de 30km',
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
