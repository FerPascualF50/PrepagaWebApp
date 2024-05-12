import { Box, Tabs, Tab } from '@mui/material';
import Invoices from './Invoicing';
import ShowInvoices from './ShowInvoices';
import { useState } from 'react';

export default function TabsAdmin() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="FACTURAR" />
        <Tab label="VER FACTURAS" />
      </Tabs>
      <Box>
        {value === 0 && <Invoices />}
        {value === 1 && <ShowInvoices />}
      </Box>
    </Box>
  );
}

