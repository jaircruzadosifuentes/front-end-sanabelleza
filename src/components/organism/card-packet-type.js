import React, { Fragment } from "react";
import { COLOR_BLUE, COLOR_GREEN } from "src/utils/constants";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Title } from 'src/components/atoms';
import { formatDecimales } from 'src/utils/utils';
import PropTypes from 'prop-types';

export default function CardPacket({
  costPerUnit = 0,
  idSelectPacket = 0,
  idPacket = 0,
  handleClickItemPackets,
  description = '',
  abbreviation = '',
  disabled = false
}) {
  return (
    <>
      {
        disabled ?
          <Card
            sx={{
              maxWidth: 470,
              cursor: 'pointer',
              color: parseInt(costPerUnit) === 0 && (parseInt(idSelectPacket) === parseInt(idPacket)) ? COLOR_GREEN : COLOR_BLUE,
              border: (parseInt(idSelectPacket) === parseInt(idPacket)) ? '3px solid' : ''
            }}
            >
            <CardContent>
              <Title value={abbreviation} type={'h4'} />
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <div className='row'>
                <div className='col-md-12'>
                  <span>Costo por sesión S/.{formatDecimales(costPerUnit)}</span> <br />
                </div>
              </div>
            </CardActions>
          </Card> :
          < Card
            sx={{
              maxWidth: 470,
              cursor: 'pointer',
              color: parseInt(costPerUnit) === 0 && (parseInt(idSelectPacket) === parseInt(idPacket)) ? COLOR_GREEN : COLOR_BLUE,
              border: (parseInt(idSelectPacket) === parseInt(idPacket)) ? '3px solid' : ''
            }}
            onClick={(e) => handleClickItemPackets(e, idPacket)}>
            <CardContent>
              <Title value={abbreviation} type={'h4'} />
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <div className='row'>
                <div className='col-md-12'>
                  <span>Costo por sesión S/.{formatDecimales(costPerUnit)}</span> <br />
                </div>
              </div>
            </CardActions>
          </Card >
      }
    </>
  )
}
CardPacket.propTypes = {
  disabled: PropTypes.bool,
  handleClickItemPackets: PropTypes.func,
  abbreviation: PropTypes.string,
  description: PropTypes.string,
  idSelectPacket: PropTypes.number,
  idPacket: PropTypes.number,
  costPerUnit: PropTypes.number,
};