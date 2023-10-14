import React from "react";
import PropTypes from 'prop-types';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { COLOR_BUTTON_MAB } from "src/config/config";
import { COLOR_GREEN } from "src/utils/constants";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Tooltip from '@mui/material/Tooltip';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PaymentIcon from '@mui/icons-material/Payment';
import ModeIcon from '@mui/icons-material/Mode';
import ChatIcon from '@mui/icons-material/Chat';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

function TypeButton(value) {
  switch (value) {
    case 1:
      return (<SaveAsIcon />);
    case 2:
      return (<CancelIcon />);
    case 3:
      return (<BookmarkAddedIcon />);
    case 4: //Setting
      return (<DisplaySettingsIcon />);
    case 5: //Check
      return (<CheckCircleIcon />);
    case 6:
      return (<AutorenewIcon />)
    case 7:
      return (<AddCircleIcon />)
    case 8:
      return (<ImportExportIcon />)
    case 9:
      return (<SearchIcon />)
    case 10:
      return (<DownloadIcon />)
    case 11:
      return (<WhatsAppIcon />)
    case 12:
      return (<AlternateEmailIcon />)
    case 13:
      return(<CleaningServicesIcon />)
    case 14:
      return(<PaymentIcon />)
    case 15:
      return(<ModeIcon />)
    case 16:
      return(<ChatIcon />)
    case 17:
      return (<DoDisturbOffIcon />)
    default:
      break;
  }
}

export default function ButtonFormControl({
  title = '',
  color = '',
  onClick,
  float = '',
  type = 0,
  disabled = false,
  top = 'mt-1'
}) {
  function colorBackGround() {
    let color = '';
    switch (type) {
      case 1:
        color = COLOR_GREEN;
        break;
      case 2:
        color = COLOR_BUTTON_MAB;
        break;
      case 5:
        color = COLOR_GREEN;
        break;
      default:
        break;
    }
    return color;
  }
  return (
    <>
      <Tooltip title={title}>
        <button disabled={disabled} className={`${color} text-white ${top}`} onClick={onClick} style={{ float: float, backgroundColor: colorBackGround() }}>
          {TypeButton(type)}&nbsp;
          {title}
        </button>
      </Tooltip>
    </>
  )
}
ButtonFormControl.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  float: PropTypes.string,
  top: PropTypes.string,
  type: PropTypes.number
};