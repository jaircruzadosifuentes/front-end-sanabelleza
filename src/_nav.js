import React, { Fragment } from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const GetIconBasedOnComponent = (name) => {
  const ICON_COMPONENTS =  {
    'AppRegistrationIcon': <Fragment><AppRegistrationIcon />&nbsp;</Fragment>,
    'GroupIcon': <Fragment><GroupIcon />&nbsp;</Fragment>,
    'Inventory2Icon': <Fragment><Inventory2Icon />&nbsp;</Fragment>,
    'PaymentsIcon': <Fragment><PaymentsIcon />&nbsp;</Fragment>,
    'PointOfSaleIcon': <Fragment><PointOfSaleIcon />&nbsp;</Fragment>,
    'SettingsSuggestIcon': <Fragment><SettingsSuggestIcon />&nbsp;</Fragment>,
  }
  const ICON_DEFAULT_COMPONENT = <Fragment><AppRegistrationIcon />&nbsp;</Fragment>
  return ICON_COMPONENTS[name] || ICON_DEFAULT_COMPONENT;
}
export const GetTypeComponent = (name) => {
  const TYPE_COMPONENT = {
    'CNavTitle': CNavTitle,
    'CNavGroup': CNavGroup,
    'CNavItem': CNavItem,
  }
  const TYPE_DEFAULT_COMPONENT = CNavTitle
  return TYPE_COMPONENT[name] || TYPE_DEFAULT_COMPONENT;
}
const _nav = JSON.parse(localStorage.getItem('lstOptions'));
_nav?.map(m => {
  m.component = GetTypeComponent(m.component)
  m.icon = GetIconBasedOnComponent(m.icon)
  m.items?.map(i => {
    i.component = GetTypeComponent(i.component);
    return null;
  });
  return null;
})
export default _nav
