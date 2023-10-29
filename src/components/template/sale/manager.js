import React, { useState } from "react";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import SaleHeaderSidebarLeft from "./sale-header-sidebar-left";
import SpanFormControl from "src/components/atoms/SpanFormControl";
import SaleProductList from "./sale-product-list";
import { useGetAllCategory, useGetInSelectVoucherDocument } from "src/hooks/common/common-hook";
import { ServiceGetSubCategoriesInSelect } from "src/service/common/service.common";
import { ServiceGetProductoByCategoryIdSubCategoryId } from "src/service/product/service.product";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Modal } from "src/components/molecules";
import SearchReniecPerson from "src/components/organism/search-reniec-person";
import { EntityGetByDni } from "src/utils/api-rest";
import FormSaveSale from "./form-save-sale";
import { useGetAllPayMethods } from "../paciente/finalizaAtencion/hooks";
import { ServiceGetPersonByNroDocument } from "src/service/person/service.person";
import { formatDecimales, fuDevolverDatosUsuario } from "src/utils/utils";
import { ServicePostSaveSaleHead } from "src/service/sale/service.sale";
import { useNavigate } from "react-router-dom";
import { employeedCashRegisterId } from "src/utils/functions";

export default function Manager() {
  let navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState('v');
  const { payMethods } = useGetAllPayMethods();
  const { categories } = useGetAllCategory();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsAddCart, setProductsAddCart] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [nroDocument, setNroDocument] = useState('');
  const [objReniecSearch, setObjReniecSearch] = useState({});
  const [openEditCant, setOpenEditCant] = useState(false);
  const [isExistsPerson, setIsExistsPerson] = useState(false);
  const [openModalSaveSale, seOpenModalSaveSale] = useState(false);
  const [payMethodId, setPayMethodId] = useState(0);
  const [cashAmount, setCashAmount] = useState(0.00);
  const [concepto, setConcepto] = useState('');
  const [reniecManual, setReniecManual] = useState(false);
  const [objPersonManual, setObjPersonManual] = useState({});
  const {vouchers} = useGetInSelectVoucherDocument();
  const [tipoDocVou, setTipoDocVou] = useState(0);
  console.log(openEditCant, cantidad);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeCategory = async (e) => {
    setCategoryId(e?.value);
    let listSubCategories = await ServiceGetSubCategoriesInSelect(e?.value);
    setSubCategories(listSubCategories);
  }
  const handleChangeSubCategory = async (e) => {
    if (!categoryId || categoryId === 0) {
      return 0;
    }
    let listProducts = await ServiceGetProductoByCategoryIdSubCategoryId(categoryId, e?.value);
    if (listProducts.length > 0) {
      setProducts(listProducts);
    } else {
      setProducts([]);
    }
  }
  const onHandleClickItemAddProduct = (e, item) => {
    let add = false;
    productsAddCart.map(pp => {
      if (parseInt(pp.productId) === parseInt(item.productId)) {
        pp.cantidad = item.cantidad + 1;
        pp.total = parseFloat(pp.cantidad * pp.precio)
        setCantidad(pp.cantidad);
        add = true;
      }
      return pp
    });
    if (!add) {
      item.total = parseFloat(item.cantidad * item.precio)
      setProductsAddCart(productsAddCart.concat(item));
    } else {
      setProductsAddCart(productsAddCart);
    }
  }
  const handleRemoveItemProductAdd = (e, row) => {
    setCantidad(0.00);
    setProductsAddCart(productsAddCart.filter(p => parseInt(p.productId) !== parseInt(row.productId)))
  }
  const handleChangeCantidad = (e, item) => {
    productsAddCart.map(pp => {
      if (parseInt(pp.productId) === parseInt(item.productId)) {
        pp.openEditCant = true;
        setOpenEditCant(pp.openEditCant)
      }
      return pp
    });
    setProductsAddCart(productsAddCart);
  }
  const handleSaveSale = (e) => {
    if (!isExistsPerson && reniecManual) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar los datos del cliente.`,
      })
      return;
    } else if(objPersonManual === null || objPersonManual === undefined || Object.keys(objPersonManual).length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar los datos del cliente.`,
      })
      return;
    }
    seOpenModalSaveSale(true);
  }
  const getIgv = () => {
    return getTotal() * 0.18
  }
  const getTotal = () => {
    return productsAddCart.map(({ cantidad, precio }) => (cantidad * precio)).reduce((sum, i) => (sum + i), 0)
  }
  const handleSearchPerson = (e) => {
    setOpenModalSearch(true);
  }
  const handleCloseModalSearch = (e) => {
    setOpenModalSearch(false);
  }
  const onKeyUpDniSunat = async (e) => {
    if (e.keyCode === 13 && reniecManual) {
      let objectPerson = await EntityGetByDni(nroDocument);
      setObjReniecSearch(objectPerson)
      if(objectPerson.success) {
        setIsExistsPerson(true);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `${objectPerson.message}`,
        })
        return;
      }
    } else if(e.keyCode === 13 && !reniecManual){
      //Recuperar desde la base de datos y si no está registrarlo.
      if(nroDocument.length > 0) {
        let getPerson = await ServiceGetPersonByNroDocument(nroDocument);
        if(getPerson !== null) {
          setObjPersonManual(getPerson);
        } else {
          // Si no existe, debe de aparecer un modal para hacer el registro de la persona para poder realizar el registro de la venta.
        }
      }
    }
  }
  const handleChangeDniSunat = (e) => {
    setNroDocument(e.target.value);
  }
  const handleAddDecreaseQuantity = (e, row, type) => {
    const { productId, cantidad } = row;
    if (type === 1) {
      productsAddCart.map(pp => {
        if (parseInt(pp.productId) === parseInt(productId)) {
          if (pp.cantidad >= 1) {
            pp.cantidad = cantidad + 1;
            pp.total = parseFloat(pp.cantidad * pp.precio)
            setCantidad(pp.cantidad);
          }
        }
        return pp
      });
    } else if (type === 2) {
      productsAddCart.map(pp => {
        if (parseInt(pp.productId) === parseInt(productId)) {
          if (pp.cantidad > 1) {
            pp.cantidad = cantidad - 1;
            pp.total = parseFloat(pp.cantidad * pp.precio)
            setCantidad(pp.cantidad);
          }
        }
        return pp
      });
    }
    setProductsAddCart(productsAddCart);
  }
  const handleCancelSaveSale = (e) => {
    setProductsAddCart([]);
    setIsExistsPerson(false);
    setObjReniecSearch({});
  }
  const handleCloseModalSaveSale = (e) => {
    seOpenModalSaveSale(false);
  }
  const handleSaveSaleFinish = (e) => {
    if(!tipoDocVou) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Seleccione un tipo de documento`,
      });
      return;
    }
    if(!payMethodId) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Seleccione un tipo de método de pago`,
      });
      return;
    }
    if(productsAddCart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar almenos un item para poder realizar la venta`,
      });
      return;
    }
    if(formatDecimales(cashAmount - getTotal()) < 0 && payMethodId === 3) { // Solo para efectivo
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `El monto en efectivo a pagar, tiene que ser mayor al total de la venta.`,
      });
      return;
    }
    if(employeedCashRegisterId() === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `El trabajador no tiene asignado una caja, por favor de comunicarse con SISTEMAS.`,
      })
      return;
    }
    let data = {
      conceptPay: concepto,
      exChange: payMethodId === 3? formatDecimales(cashAmount - getTotal()): 0.00,
      cashAmount: formatDecimales(cashAmount),
      //Detalle de montos,
      igv: formatDecimales(getIgv()),
      subTotal: formatDecimales(getTotal() - getIgv()),
      total: formatDecimales(getTotal()),
      isClientManuallyExistsInDataBase: !reniecManual,
      isClientManuallyRegister: false,
      payMethod: {
        value: payMethodId,
      },
      typeDocumentVouId: tipoDocVou,
      person: {
        names: objPersonManual?.names,
        surnames: objPersonManual?.surnames,
      },
      saleBuyOutProducts: productsAddCart,
      employeedId: parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`)
    };
    Swal.fire({
      title: `¿Desea realizar el registro? `,
      text: `Usted está realizando el registro de la venta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let save = await ServicePostSaveSaleHead(data);
        //posible mejora, mostrar el correlativo y/o pdf generado para descarga e imprimirla
        if (save !== null) {
          Swal.fire(
            'Registro exitoso',
            `La venta se ha registrado con éxito.`,
            'success'
          );
          setTimeout(() => {
            navigate('/venta-compras/lista');
          }, 2000);
          setIsExistsPerson(false);
        }
      }
    })
  }
  const handleChangePayMethod = (a) => {
    setPayMethodId(a?.value);
  }
  const handleChangeMontoEfectivo = (e) => {
    setCashAmount(e.target.value);
  }
  const handleChangeConcepto = (e) => {
    setConcepto(e.target.value);
  }
  const handleChangeReniecManual = (e) => {
    setReniecManual(e.target.checked);
  }
  const handleChangeTipoDoc = (e) => {
    setTipoDocVou(e?.value);
  }
  return ( 
    <>
      <div className="row">
        <div className="col-md-8 mb-1">
          <div className="row">
            <div className="col-md-2">
              <SpanFormControl
                title="Tipo de transacción:"
              />
            </div>
            <div className="col-md-10 mt-1">
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Radio
                  checked={selectedValue === 'v'}
                  onChange={handleChange}
                  value="v"
                  name="radio-buttons"
                  label="VENTA"
                />
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleChange}
                  value="c"
                  disabled
                  name="radio-buttons"
                  label="COMPRA"
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <SaleHeaderSidebarLeft
          typeTransaction={selectedValue}
          productsAddCart={productsAddCart}
          handleChangeCantidad={handleChangeCantidad}
          handleRemoveItemProductAdd={handleRemoveItemProductAdd}
          handleSaveSale={handleSaveSale}
          getTotal={getTotal()}
          getIgv={getIgv()}
          handleSearchPerson={handleSearchPerson}
          objReniecSearch={objReniecSearch}
          handleAddDecreaseQuantity={handleAddDecreaseQuantity}
          handleCancelSaveSale={handleCancelSaveSale}
          objPersonManual={objPersonManual}
        />
        <SaleProductList
          categories={categories}
          subCategories={subCategories}
          handleChangeCategory={handleChangeCategory}
          handleChangeSubCategory={handleChangeSubCategory}
          products={products}
          onHandleClickItemAddProduct={onHandleClickItemAddProduct}
        />
      </div>
      {
        openModalSearch && (
          <Modal
            title={`BUSCAR EN RENIEC`}
            size={"modal-xs"}
            close
            openModal={openModalSearch}
            onClose={handleCloseModalSearch}
          >
            <SearchReniecPerson
              onKeyUpDniSunat={onKeyUpDniSunat}
              handleChangeDniSunat={handleChangeDniSunat}
              objReniecSearch={objReniecSearch}
              handleChangeReniecManual={handleChangeReniecManual}
              reniecManual={reniecManual}
              objPersonManual={objPersonManual}
              handleCloseModalSearch={handleCloseModalSearch}
            />
          </Modal>
        )
      }
      {
        openModalSaveSale && (
          <Modal
            title={`GUARDAR VENTA DEL CLIENTE: ${objReniecSearch?.data?.nombre_completo === undefined? (objPersonManual?.names + ' ' + objPersonManual?.surnames): objReniecSearch?.data?.nombre_completo}`}
            size={"modal-xl"}
            close
            openModal={openModalSaveSale}
            onClose={handleCloseModalSaveSale}
          >
            <FormSaveSale
              productsAddCart={productsAddCart}
              handleAddDecreaseQuantity={handleAddDecreaseQuantity}
              handleRemoveItemProductAdd={handleRemoveItemProductAdd}
              payMethods={payMethods}
              getIgv={getIgv}
              getTotal={getTotal}
              handleSaveSaleFinish={handleSaveSaleFinish}
              handleChangePayMethod={handleChangePayMethod}
              payMethodId={payMethodId}
              handleChangeMontoEfectivo={handleChangeMontoEfectivo}
              cashAmount={cashAmount}
              handleChangeConcepto={handleChangeConcepto}
              vouchers={vouchers}
              handleCloseModalSaveSale={handleCloseModalSaveSale}
              handleChangeTipoDoc={handleChangeTipoDoc}
            />
          </Modal>
        )
      }
    </>
  )
}