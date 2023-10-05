import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Tooltip } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function title({
  value,
  type,
  arrowBack = false,
  handleBack,
  isStaff = false
}) {
  if (arrowBack) {
    switch (type) {
      case 'h1':
        return (<h1><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h1>);
      case 'h2':
        return (<h2><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h2>);
      case 'h3':
        return (<h3><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h3>);
      case 'h4':
        return (<h4><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h4>);
      case 'h5':
        return (<h5><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h5>);
      case 'h6':
        return (<h6><ArrowBackIosIcon onClick={handleBack} style={{ cursor: 'pointer' }} /> {value}</h6>);
      default:
        break;
    }
  } else {
    switch (type) {
      case 'h1':
        return (
          <h1>
            {!value? <Skeleton />: value }&nbsp;
            {
              isStaff ?
                <Tooltip title={`${value}, es parte del equipo.`}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}} width="1.25rem" height="1.25rem" viewBox="0 0 14 14" className="svg-icon medal-profile" fill="currentColor"><path d="M13.6667 7C13.6667 10.6819 10.6819 13.6667 7.00001 13.6667C3.31811 13.6667 0.333344 10.6819 0.333344 7C0.333344 3.3181 3.31811 0.333336 7.00001 0.333336C10.6819 0.333336 13.6667 3.3181 13.6667 7Z" fill="#FFC240"></path><path fillRule="evenodd" clipRule="evenodd" d="M9.73216 5.48493L8.24443 5.48488L7.78463 4.06997C7.53764 3.30994 6.4624 3.30993 6.21541 4.06997L5.75562 5.48488L4.26788 5.48493C3.46873 5.48496 3.13645 6.57035 3.78296 7.0401L4.98655 7.85186L4.52685 9.2668C4.27994 10.0269 5.14982 10.6589 5.79638 10.1892L7.00002 9.31473L8.20366 10.1892C8.85023 10.6589 9.7201 10.0269 9.47319 9.2668L9.0135 7.85186L10.2171 7.19462C10.8636 6.72487 10.5313 5.48496 9.73216 5.48493Z" fill="#6F4C06"></path></svg>
                </Tooltip>
                : ''
            }
          </h1>);
      case 'h2':
        return (<h2>{!value ? <Skeleton />: value}</h2>);
      case 'h3':
        return (<h3>{value}</h3>);
      case 'h4':
        return (<h4>{value}</h4>);
      case 'h5':
        return (<h5>{value}</h5>);
      case 'h6':
        return (<h6>{value}</h6>);
      default:
        break;
    }
  }
}
