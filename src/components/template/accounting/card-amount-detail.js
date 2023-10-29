import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'src/components/atoms';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { formatDecimales } from 'src/utils/utils';

export default function CardAmountDetail({
  rows = [],
  cardId = 0,
  handleChangeSelectCardType
}) {
  return (
    <div className='mt-2 mb-2'>
      <div className='row'>
        {
          rows.map((p, index) => {
            return (
              <div className='col-md-3 mt-2 mb-4 text-center' key={index}>
                <Card 
                  sx={{ 
                    maxWidth: '100%', 
                    cursor: 'pointer',
                    color: `${p.color}`,
                    border: parseInt(cardId) === parseInt(p.cajaChicaMontosId) ? `3px solid ${p.color}`: ''
                  }}
                  onClick={(e) =>handleChangeSelectCardType(e, p)}
                  >
                  <CardContent>
                    <Title value={p.description} type={'h4'} />
                    <Typography variant="body2" color="text.secondary">
                      S/.{formatDecimales(p.amount)}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
CardAmountDetail.propTypes = {
  typeCard: PropTypes.array,
  rows: PropTypes.array,
  handleChangeSelectCardType: PropTypes.func,
  cardId: PropTypes.number,

};