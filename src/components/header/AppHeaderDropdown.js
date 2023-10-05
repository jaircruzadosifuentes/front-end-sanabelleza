import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { fuDevolverDatosUsuario, fuLimpiarSesiones } from 'src/utils/utils'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const AppHeaderDropdown = () => {
  let navigate = useNavigate();

    // Function to clear complete cache data
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  const handleCerrarSesion = (e) => {
    fuLimpiarSesiones();
    clearCacheData();
    navigate('/');
  }
  const handleRedirectPerfil = (e) => {
    navigate(`/u/${JSON.parse(fuDevolverDatosUsuario()).userName}`);
  }
  const handleRedirectSetting = (e) => {
    navigate('/settings');
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <CAvatar src={`../../images/avatars/${JSON.parse(fuDevolverDatosUsuario()).profileImage}`} size="md" />
        </StyledBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{`${JSON.parse(fuDevolverDatosUsuario()).names} ${JSON.parse(fuDevolverDatosUsuario()).surnames}`}</CDropdownHeader>
        <CDropdownItem href="#">
          {/* <CIcon icon={cilBell} className="me-2" /> */}
          <NotificationsIcon />&nbsp;
          Notificaciones
          <CBadge color="info" className="ms-2">
            
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          {/* <CIcon icon={cilEnvelopeOpen} className="me-2" /> */}
          <ChatIcon />&nbsp;
          Mensajes
          <CBadge color="success" className="ms-2">
            
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={handleRedirectPerfil} style={{ cursor: 'pointer' }} >
          {/* <CIcon icon={cilUser} className="me-2" /> */}
          <PersonIcon />&nbsp;
          Perfil
        </CDropdownItem>
        <CDropdownItem onClick={handleRedirectSetting} style={{ cursor: 'pointer' }}>
          {/* <CIcon icon={cilSettings} className="me-2" /> */}
          <SettingsSuggestIcon />&nbsp;
          Configuraciones
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleCerrarSesion} style={{ cursor: 'pointer' }}>
          {/* <CIcon icon={cilLockLocked} className="me-2" /> */}
          <LogoutIcon />&nbsp;
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
