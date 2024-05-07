import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link sx={{cursor: 'pointer'}} color="inherit" href="https://www.linkedin.com/in/fernando-pascual-full-stack-developer/" target="_blank">
        Fernando Pascual
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box sx={{ position: 'fixed', bottom: 0,width: '100%', backgroundColor: '#f3f3f3'}} >
      <CssBaseline />
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f3f3f3'}}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}