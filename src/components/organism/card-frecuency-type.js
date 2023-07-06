import React from "react";
import { COLOR_BLUE } from "src/utils/constants";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function CardFrecuencyType({
  idSelectPacket = 0,
  idSelectFrecuency = 0,
  idPacket = 0,
  idFrecuency = 0,
  description = '',
  disabled = false,
  handleClickItemFrecuency
}) {
  return (
    <>
      {
        disabled ?
          <Card
            sx={{ maxWidth: 120, cursor: 'pointer' }}
            style={{
              border: (parseInt(idFrecuency) === parseInt(idSelectFrecuency)) && (parseInt(idSelectPacket) === parseInt(idPacket)) ? '3px solid' : '',
              color: (parseInt(idSelectPacket) === parseInt(idPacket)) && (parseInt(idFrecuency) === parseInt(idSelectFrecuency)) ? COLOR_BLUE : ''
            }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
                <br />
              </Typography>
            </CardContent>
          </Card> :
          <Card
            sx={{ maxWidth: 120, cursor: 'pointer' }}
            onClick={(e) => handleClickItemFrecuency(e, idFrecuency)}
            style={{
              border: (parseInt(idFrecuency) === parseInt(idSelectFrecuency)) && (parseInt(idSelectPacket) === parseInt(idPacket)) ? '3px solid' : '',
              color: (parseInt(idSelectPacket) === parseInt(idPacket)) && (parseInt(idFrecuency) === parseInt(idSelectFrecuency)) ? COLOR_BLUE : ''
            }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
                <br />
              </Typography>
            </CardContent>
          </Card>
         
      }
    </>
  )
}
CardFrecuencyType.propTypes = {
  disabled: PropTypes.bool,
  handleClickItemFrecuency: PropTypes.func,
  abbreviation: PropTypes.string,
  description: PropTypes.string,
  idSelectPacket: PropTypes.number,
  idSelectFrecuency: PropTypes.number,
  idPacket: PropTypes.number,
  idFrecuency: PropTypes.number,
};