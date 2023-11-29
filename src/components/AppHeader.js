import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import ChatIcon from '@mui/icons-material/Chat';
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { fuDevolverDatosUsuario } from 'src/utils/utils'
import { useGetAllMsgForId } from 'src/api/hooks/message/message-hooks'
import SidebarLeft from './template/messages/sidebar-left'
import PropTypes from 'prop-types';

const AppHeader = ({
  routes = []
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickMsg = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fromIdParams = parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`)
  const typeUser = `${JSON.parse(fuDevolverDatosUsuario()).typeUser}`
  const fromTypeUser = (`${JSON.parse(fuDevolverDatosUsuario()).typeUser}`)
  const [result, setResult] = useState([]);

  const { messagesForIdUser } = useGetAllMsgForId(fromIdParams, fromTypeUser);
  const [messageId, setMessageId] = useState(0);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickItemMessage = (e, row) => {
    const { messageId, toId } = row;
    setMessageId(messageId);
    navigate(`message/e/${toId}`, {
      state: {
        messageId
      }
    });
  }
  const handleChangeSearchMsg = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = messagesForIdUser.filter((item) => {
      if (item.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <div className='row'>
            <div className='col-md-12'>
              <small>SISB ADMINISTRACIÓN</small>
            </div>
          </div>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to={`${typeUser === 'P' ? '/dashboard-paciente' : '/dashboard'}`} component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              {/* <CIcon icon={cilBell} size="lg" /> */}
              <NotificationsIcon />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink aria-describedby={id} href="#" onClick={handleClickMsg}>
              {/* <CIcon icon={cilEnvelopeOpen} size="lg" /> */}
              <Badge color="primary">
                <ChatIcon />
              </Badge>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb routes={routes}/>
      </CContainer>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}

      >
        <Typography sx={{ p: 2 }} width={'350px'} style={{ overflow: 'scroll' }}>
          <SidebarLeft
            users={result.length > 0 ? result : messagesForIdUser}
            handleClickItemMessage={handleClickItemMessage}
            messageId={messageId}
            isHeader
            handleChangeSearchMsg={handleChangeSearchMsg}
          />
        </Typography>
      </Popover>
    </CHeader>
  )
}
AppHeader.propTypes = {
  routes: PropTypes.array,
};
export default AppHeader
