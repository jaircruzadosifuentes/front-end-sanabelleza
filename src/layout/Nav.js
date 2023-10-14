import React, { Fragment } from "react";

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const GetTypeComponent = (name) => {
  const TYPE_COMPONENT = {
    'CNavTitle': CNavTitle,
    'CNavGroup': CNavGroup,
    'CNavItem': CNavItem,
  }
  return TYPE_COMPONENT[name] ;
}

export const GetIconBasedOnComponent = (name) => {
  const ICON_COMPONENTS =  {
    'AppRegistrationIcon': <AppRegistrationIcon />,
    'GroupIcon': <Fragment><GroupIcon />&nbsp;</Fragment>,
    'Inventory2Icon': <Fragment><Inventory2Icon />&nbsp;</Fragment>,
    'PaymentsIcon': <Fragment><PaymentsIcon />&nbsp;</Fragment>,
    'PointOfSaleIcon': <Fragment><PointOfSaleIcon />&nbsp;</Fragment>,
    'SettingsSuggestIcon': <Fragment><SettingsSuggestIcon />&nbsp;</Fragment>,
    'AccountBalanceIcon': <Fragment><AccountBalanceIcon />&nbsp;</Fragment>,
    'AssignmentIcon': <Fragment><AssignmentIcon />&nbsp;</Fragment>,
  }
  const ICON_DEFAULT_COMPONENT = <Fragment><AppRegistrationIcon />&nbsp;</Fragment>
  return ICON_COMPONENTS[name] || ICON_DEFAULT_COMPONENT;
}