import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function title({
  value, 
  type,
  arrowBack = false,
  handleBack
}) {
  if(arrowBack) {
    switch (type) {
      case 'h1':
        return(<h1><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h1>);
      case 'h2':
        return(<h2><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h2>);
      case 'h3':
        return(<h3><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h3>);
      case 'h4':
        return(<h4><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h4>);
      case 'h5':
        return(<h5><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h5>);
      case 'h6':
        return(<h6><ArrowBackIosIcon onClick={handleBack} style={{cursor: 'pointer'}} /> {value}</h6>);
      default:
        break;
    }
  } else {
    switch (type) {
      case 'h1':
        return(<h1>{value}</h1>);
      case 'h2':
        return(<h2>{value}</h2>);
      case 'h3':
        return(<h3>{value}</h3>);
      case 'h4':
        return(<h4>{value}</h4>);
      case 'h5':
        return(<h5>{value}</h5>);
      case 'h6':
        return(<h6>{value}</h6>);
      default:
        break;
    }
  }
}
