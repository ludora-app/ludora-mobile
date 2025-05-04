import { useState } from 'react';
import { Box, Checkbox, String } from '@chillUI';

export default function SessionFilterAccodionSort() {
  const [items, setItems] = useState([
    {
      checked: false,
      label: 'Prix : croissant',
    },
    {
      checked: false,
      label: 'Prix : décroissant',
    },
    {
      checked: true,
      label: 'partinance',
    },
    {
      checked: false,
      label: 'Favoris',
    },
  ]);
  const handleToggle = (index: number) => {
    setItems(prev => prev.map((item, i) => ({ ...item, checked: i === index })));
  };

  return (
    <Box className="flex flex-col gap-2">
      {items.map((item, index) => (
        <Box className="flex flex-row items-center gap-2" key={index}>
          <Checkbox type="rounded" checked={item.checked} onChange={() => handleToggle(index)} showIcon={false} />
          <String>{item.label}</String>
        </Box>
      ))}
    </Box>
  );
}
