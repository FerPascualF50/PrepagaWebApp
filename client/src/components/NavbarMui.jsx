import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from '../components/styles/nav_bar.module.css'
import  AvatarMenu  from './AvatarMenu';


const drawerWidth = 240;
const navItems = [
  { name: 'HOME', route: '/' },
  { name: 'CENTROS', route: '/centers' },
  { name: 'PLANES', route: '/plans' },
  { name: 'CONSULTAS', route: '/faq' },
  { name: 'CONTACTO', route: '/contact' }
];

function DrawerAppBar(props) {
 
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>Vita +</Typography>
      <Divider />
      <List>{navItems.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText secondary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar >
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' }, color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#fff' } }}> Vita + </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff', boxShadow: 'none' }}>
                <Link className={styles.link} to={item.route}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          <Button sx={{ color: '#fff', backgroundColor: '#ff5862', '&:hover': { backgroundColor: '#ff5862' } }}>
            <Link className={styles.link} to='/login'>Mi Cuenta</Link>
          </Button>
          <AvatarMenu />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
          {drawer}
        </Drawer>
      </nav>
      <Box >
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;