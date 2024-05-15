import { Box, Tabs, Tab } from '@mui/material';
import MyInvoices from '../components/MyInvoices';
import Manage from '../components/Manage';
import { useState } from 'react';
 const TabsUser = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered sx={{paddingTop: '16px'}}>
        <Tab label="MIS FACTURAS" />
        <Tab label="GESTIONAR" />
      </Tabs>
      <Box>
        {value === 0 && <MyInvoices />}
        {value === 1 && <Manage />}
      </Box>
    </Box>
  );
}

export default TabsUser