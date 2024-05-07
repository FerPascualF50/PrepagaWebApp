import { useState } from 'react';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'



const AvatarMenu = () => {
  const isLoggedIn = localStorage.getItem('access_token');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
  }

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  const settings = [
    { name: '     X       ', onClick: () => { } },
    { name: 'Mi perfil', onClick: () => { } },
    { name: 'Dashboard', onClick: () => { } },
    { name: 'Salir', onClick: handleLogout },
  ];
  
  if (isLoggedIn)
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src="/static/images/avatar/2.jpg" alt="Avatar_image" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.name} onClick={setting.onClick}>
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
}

export default AvatarMenu;





