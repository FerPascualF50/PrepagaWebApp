import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Button, Avatar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import styles from '../components/styles/nav_bar.module.css'
import { useState } from 'react';
import { navItems, navItemsAdmin, navItemsUser } from '../utils/navItems';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice'
import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 160;

function DrawerAppBar(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme();
  // // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedIn = localStorage.getItem('access_token')

  const { user } = useSelector((state) => state.auth)
  let navItemsToRender = navItems
  const roleMappings = {
    admin: navItemsAdmin,
    user: navItemsUser,
  };
  if (isLoggedIn && user?.rol in roleMappings) navItemsToRender = roleMappings[user?.rol]

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await dispatch(logout())
    // await dispatch(deleteInvoice())
    navigate('/')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>Vita +</Typography>
      <Divider />
      <List>
        {navItemsToRender.map((item) => (
          <ListItem disableGutters key={item.name} disablePadding>
            <Link to={item.route} className={styles.link_Drawer}>
              <ListItemText primary={item.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ height: '64px', display: 'flex', justifyContent: 'center' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }} >
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' }, color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#fff' }, whiteSpace: 'nowrap' }}> Vita + </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItemsToRender.map((item) => (
              <Button key={item.name} sx={{ color: '#fff', boxShadow: 'none' }}>
                <Link className={styles.link} to={item.route}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          {!isLoggedIn && (
            <Button size="small" sx={{ display: 'flex', padding: '6px 12px', alignItems: 'center', minWidth: '120px', fontSize: '0.8rem', height: '40px', color: '#fff', backgroundColor: '#ff5862', '&:hover': { backgroundColor: '#ff5862' } }}>
              <Link className={styles.link} to='/login'>Mi Cuenta</Link>
            </Button>
          )}
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Cerrar sesión">
                <IconButton onClick={handleLogout} sx={{ color: '#fff' }}>
                  <Logout />
                </IconButton>
              </Tooltip>
              <Avatar alt="User Avatar" src={user?.avatar} />
            </div>
          )}
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
