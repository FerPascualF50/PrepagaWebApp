import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f3f3f3', maxHeight: '68px'}} >
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="footer" sx={{ py: 3, px: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link sx={{ cursor: 'pointer' }} color="inherit" href="https://www.linkedin.com/in/fernando-pascual-full-stack-developer/" target="_blank">
              Fernando Pascual
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}