import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Label, Title } from 'src/components/atoms';
import { COLOR_BLUE } from 'src/utils/constants';
import PropTypes from 'prop-types';
import { COLOR_BUTTON_MAB, COLOR_GREEN } from 'src/config/config';
import { formatDecimales } from 'src/utils/utils';

const listPeriodo = [
  {
    id: 1,
    value: 'DIARIO (TODOS LOS DÍAS)'
  },
  {
    id: 2,
    value: '2 VECES POR SEMANA'
  },
  {
    id: 3,
    value: '3 VECES POR SEMANA'
  },

]

export default function RegisterPackets({
  packetsOrUnitSession = [],
  handleClickItemPackets,
  idSelectPacket = 0,
  handleClickItemPeriodo,
  idFrecuencia = 0
}) {
  return (
    <div className='card mt-2 mb-2'>
      <div className='card-body'>
        <div className='row'>
          <Label title={'FRECUENCIA DE TRATAMIENTO'} isBold />
          {
            packetsOrUnitSession.map((p, index) => {
              return (
                <div className='col-md-3 mt-1 mb-1 text-center' key={index}>
                  <Card sx={{ maxWidth: '100%', cursor: 'pointer', color: parseInt(p.costPerUnit) === 0 && (parseInt(idSelectPacket) === parseInt(p.packetsOrUnitSessionsId)) ? COLOR_GREEN : COLOR_BLUE, border: (parseInt(idSelectPacket) === parseInt(p.packetsOrUnitSessionsId)) ? '3px solid' : '' }} onClick={(e) => handleClickItemPackets(e, p.packetsOrUnitSessionsId)}>
                    <CardContent>
                      <Title value={p.abbreviation} type={'h4'} />
                      <Typography variant="body2" color="text.secondary">
                        {p.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div className='row'>
                        <div className='col-md-6'>
                          <span style={{textDecoration: 'line-through', color: COLOR_BUTTON_MAB}}>S/.{formatDecimales(p.costPerUnit + 10)} c/u sesión</span> <br />
                        </div>
                        <div className='col-md-6'>
                          <span style={{color: COLOR_GREEN}}>S/.{formatDecimales(p.costPerUnit)} c/u  sesión</span> <br />
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                  <br />
                  <div className='row'>
                    {
                      listPeriodo.map(l => {
                        return (
                          <div className='col-md-4 mt-2 text-center' key={l.id}>
                            <Card
                              sx={{ maxWidth: 120, cursor: 'pointer' }}
                              onClick={(e) => handleClickItemPeriodo(e, l.id)}
                              style={{
                                border: (parseInt(l.id) === parseInt(idFrecuencia)) && (parseInt(idSelectPacket) === parseInt(p.packetsOrUnitSessionsId)) ? '3px solid' : '',
                                color: (parseInt(idSelectPacket) === parseInt(p.packetsOrUnitSessionsId)) && (parseInt(l.id) === parseInt(idFrecuencia)) ? COLOR_BLUE : ''
                              }}>
                              <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                  {l.value}
                                  <br />
                                </Typography>
                              </CardContent>
                            </Card>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
       
      </div>
    </div>
  );
}
RegisterPackets.propTypes = {
  packetsOrUnitSession: PropTypes.array,
  handleClickItemPackets: PropTypes.func,
  handleClickItemPeriodo: PropTypes.func,
  idSelectPacket: PropTypes.number,
  idFrecuencia: PropTypes.number,
};