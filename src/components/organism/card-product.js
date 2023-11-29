import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import PropTypes from "prop-types";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GREEN } from 'src/config/config';
import { formatDecimales } from 'src/utils/utils';

export default function CardProduct({
  product = {},
  onHandleClick
}) {
  return (
    <div className='col-md-4 mt-3'>
      <Card sx={{ maxWidth: '100%' }} style={{cursor: 'pointer'}} onClick={onHandleClick}>
        <CardMedia
          component="img"
          height="100%"
          image={product.imagen}
          alt={product.name}
        />
        <CardContent>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <span style={{color: COLOR_BLUE_MAB}}>
                Precio: S/.{formatDecimales(product.precio)}
              </span>
            </div>
            <div className='col-md-12 text-center'>
              <strong>{product.name}</strong>
            </div>
            <div className='col-md-12 text-center'>
              <span style={{color: parseFloat(product.stockSale) <= 0 ? COLOR_BUTTON_MAB: COLOR_GREEN}}>
                Stock en Venta: {`${product.stockSale}`} unidades
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
CardProduct.propTypes = {
  product: PropTypes.object,
  onHandleClick: PropTypes.func,
};
