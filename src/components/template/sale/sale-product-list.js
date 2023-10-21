import React from "react";
import PropTypes from "prop-types";
import { SelectedFormControl } from "src/components/molecules";
import CardProduct from "src/components/organism/card-product";

export default function SaleDetailListProduct({
  typeTransaction = '',
  categories = [],
  handleChangeCategory,
  subCategories = [],
  handleChangeSubCategory,
  products = [],
  onHandleClickItemAddProduct,
}) {
  return (
    <div className="col-md-7">
      <div className="row">
        <SelectedFormControl
          className="col-md-4"
          placeHolder="Seleccione una categoria"
          titleLabel="Categorias:"
          options={categories}
          handleChange={handleChangeCategory}
        />
        <SelectedFormControl
          className="col-md-4"
          placeHolder="Seleccione una sub categoría:"
          titleLabel="Sub Categoria:"
          options={subCategories}
          handleChange={handleChangeSubCategory}
        />
      </div>
      <div className="row">
        {
          products?.length > 0 ? products.map((p, index) => {
            return(
              <CardProduct 
                key={index} 
                product={p}
                onHandleClick={(e) => onHandleClickItemAddProduct(e, p)}
              />
            )
          }):
          <div className="row">
            <div className="col-md-12 mt-4 mb-4" style={{textAlign: 'center', margin: 'auto'}}>
              <span>No hay datos para mostrar.</span>
            </div>
          </div>
        }
          
      </div>
    </div>

  )
}
SaleDetailListProduct.propTypes = {
  typeTransaction: PropTypes.string,
  categories: PropTypes.array,
  products: PropTypes.array,
  subCategories: PropTypes.array,
  handleChangeCategory: PropTypes.func,
  handleChangeSubCategory: PropTypes.func,
  onHandleClickItemAddProduct: PropTypes.func,
};
