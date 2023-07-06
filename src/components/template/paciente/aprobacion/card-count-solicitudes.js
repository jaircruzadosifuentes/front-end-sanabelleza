import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'src/components/atoms';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { COLOR_GREEN } from 'src/utils/constants';
import { COLOR_BUTTON_MAB } from 'src/config/config';

export default function CardCountSolicitudes({
  rows = [],
  handleChangeSelectCardType,
  idSelectTypeCard = 0,
  typeCard = []
}) {
  return (
    <div className=' mt-2 mb-2'>
      <div className=''>
        <div className='row'>
          {
            typeCard.map((p, index) => {
              return (
                <div className='col-md-2 mt-2 mb-4 text-center' key={index}>
                  <Card 
                    sx={{ 
                      maxWidth: 320, 
                      cursor: 'pointer',
                      color: p.value === 'RECHAZADO'? COLOR_BUTTON_MAB: COLOR_GREEN,
                      border: parseInt(idSelectTypeCard) === parseInt(p.id) ? '3px solid': ''
                    }}
                    onClick={(e) =>handleChangeSelectCardType(e, p)}
                    >
                    <CardContent>
                      <Title value={p.value} type={'h4'} />
                      <Typography variant="body2" color="text.secondary">
                        {p.contador} solicitudes
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  );
}
CardCountSolicitudes.propTypes = {
  typeCard: PropTypes.array,
  rows: PropTypes.array,
  handleChangeSelectCardType: PropTypes.func,
  idSelectTypeCard: PropTypes.number,

};