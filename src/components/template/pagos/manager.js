import React, { useState } from 'react'
import { useGetAllPayments } from 'src/api/hooks/pagos/pagos-hooks'
import { Title } from 'src/components/atoms';
import List from './list';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServiceGetPayments, ServiceGetPaymentsScheduleDetail, ServicePutUpdateDebtPayment } from 'src/service/payment/service.payment';
import { Modal, SelectedFormControl } from "src/components/molecules";
import SeePayments from './see-payments';
import { useGetAllPayMethods } from '../paciente/finalizaAtencion/hooks';
import Filter from '../../organism/filter';
import { formatDecimales } from 'src/utils/utils';
import { useGetInSelectVoucherDocument } from 'src/hooks/common/common-hook';
import { employeedCashRegisterId } from 'src/utils/functions';
import FormMakePay from './form-make-pay';

export default function Manager(props) {
  const { payments, setPayments } = useGetAllPayments(props);
  const { vouchers } = useGetInSelectVoucherDocument(props);
  const { payMethods } = useGetAllPayMethods(props);
  const [payMethodId, setPayMethodId] = useState(0);
  const [haveConcept, setHaveConcept] = useState(false);
  const [openModalFormPago, setOpenModalFormPago] = useState(false);
  const [conceptoPago, setConceptoPago] = useState('');
  const [result, setResult] = useState([]);
  const [vuelto, setVuelto] = useState(0.00);
  const [cash, setCash] = useState(0.00);
  const [debtNumberFlagMax, setDebNumberFlagMax] = useState(false);
  const [vouDocumentId, setVouDocumentId] = useState(0);
  const [selectedValue, setSelectValue] = useState('p');
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [listDetailPayments, setListDetailPayments] = useState([]);

  const [openModalMakePay, setOpenModalMakePay] = useState(false);

  const [objetoPago, setObjetoPago] = useState({
    paymentScheduleDetailId: 0,
    debtNumber: 0,
    amount: 0.00,
    state: '',
    userPayment: ''
  });

  const handleRealizarPago = async (e, row) => {
    const { paymentId } = row;
    setOpenModalFormPago(true);
    setObjetoPago(row);
    let isDebtMax = payments.filter(p => parseInt(p.debtNumbertMax) === parseInt(row.debtNumber) && p.paymentId === row?.payment?.paymentId).map(pa => pa.paymentId)[0]
    setDebNumberFlagMax(isDebtMax > 0);
    let listDetailPayments = await ServiceGetPaymentsScheduleDetail(paymentId);
    if (listDetailPayments.length > 0) {
      setListDetailPayments(listDetailPayments);
    }
  }
  const handleCargarDataPagosPendientes = async () => {
    let paymentId = parseInt(objetoPago?.payment?.paymentId)
    let listPaymentDetailIdService = await ServiceGetPaymentsScheduleDetail(paymentId);
    setListDetailPayments(listPaymentDetailIdService);
    let listPaymentService = await ServiceGetPayments();
    setPayments(listPaymentService);
  }
  const handleCloseModalPago = () => {
    setOpenModalFormPago(false);
  }
  const handleChangePayMethod = (e) => {
    setPayMethodId(e?.value);
    setHaveConcept(e?.haveConcept);
  }
  const handleChangeConceptoPago = (e) => {
    setConceptoPago(e.target.value);
  }
  const handlePagarCuota = (e) => {
    let userPayment = "SIST";
    if (employeedCashRegisterId() === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `El trabajador no tiene asignado una caja, por favor de comunicarse con SISTEMAS.`,
      })
      return;
    }
    if (payMethodId === 3) {
      if (cash < parseFloat(objetoPago.amount)) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `El monto a pagar debe de ser el establecido en el cronograma de pagos. No puede cancelar un monto inferior.`,
        })
        document.getElementById('txtMontoEfectivo').value = '';
        setVuelto(0.00)
        return;
      }
    }
    if (!payMethodId || payMethodId === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de seleccionar un método de pago.`,
      })
      return;
    }
    const { paymentScheduleDetailId, debtNumber } = objetoPago;
    let data = {
      paymentScheduleDetailId,
      debtNumber,
      userPayment,
      payMethod: {
        value: payMethodId,
      },
      conceptoPago,
      cash: cash,
      monetaryExchange: vuelto,
      voucherDocument: {
        value: parseInt(vouDocumentId)
      },
      isNewCustomer: isNewCustomer,
      employeedCashRegisterId: employeedCashRegisterId()
    }
    console.log(data);
    Swal.fire({
      title: `¿Desea realizar el pago de la cuota nro ${debtNumber}?`,
      text: `Usted está realizando el pago de la cuota seleccionada`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, pagar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let actualiza = await ServicePutUpdateDebtPayment(data);
        if (actualiza.ok) {
          clearControls();
          await handleCargarDataPagosPendientes();
          Swal.fire(
            'Pago exitoso',
            `La cuota Nro ${debtNumber}, ha sido pagada con éxito.`,
            'success'
          );
          setOpenModalMakePay(false);
          setHaveConcept(false);
        }
      }
    })
  }
  const clearControls = () => {
    setPayMethodId(0);
    setCash(0.00);
  }
  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = payments.filter((item) => {
      if (item?.patient?.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleChangeMontoEfectivo = (e) => {
    let monto = parseFloat(e.target.value);
    setCash(monto);
    console.log(objetoPago);
    if (!isNaN(monto) && (monto - objetoPago.amount) > 0) {
      console.log(monto);
      setVuelto(monto - objetoPago.amount)
    } else {
      setVuelto(formatDecimales(0.00))
    }
  }
  const handleChangeTipoDocumento = (e) => {
    setVouDocumentId(e?.value);
  }
  const handleMakePay = (e, row) => {
    setObjetoPago(row);
    console.log(row);
    setOpenModalMakePay(true);
  }
  const handleCloseModalMakePay = (e) => {
    setOpenModalMakePay(false);
  }
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={`MÓDULO DE CUOTAS PENDIENTES A PAGAR`}
      />
      <div className='row mb-3'>
        <div className='col-md-4'>
          <Filter
            handleSearchForSurNames={handleSearchForSurNames}
          />
        </div>
        <SelectedFormControl
          className="col-md-3 mt-1"
          placeHolder="Buscar por sede"
          titleLabel="Seleccione una sede"
        />
      </div>
      <List
        rows={result.length > 0 ? result : payments}
        handleRealizarPago={handleRealizarPago}
      />
      {
        openModalFormPago && (
          <Modal
            title={``}
            size={"modal-lg"}
            close
            openModal={openModalFormPago}
            onClose={handleCloseModalPago}
          >
            <SeePayments
              objetoPago={objetoPago}
              handleCloseModalPago={handleCloseModalPago}
              listDetailPayments={listDetailPayments}
              handleMakePay={handleMakePay}
            />
          </Modal>
        )
      }
      {
        openModalMakePay && (
          <Modal
            title={``}
            size={"modal-xs"}
            close
            openModal={openModalMakePay}
            onClose={handleCloseModalMakePay}
          >
            <FormMakePay 
              handleCloseModalMakePay={handleCloseModalMakePay}
              payMethods={payMethods}
              handleChangePayMethod={handleChangePayMethod}
              haveConcept={haveConcept}
              vouchers={vouchers}
              vuelto={vuelto}
              payMethodId={payMethodId}
              debtNumberFlagMax={debtNumberFlagMax}
              handleChangeTipoDocumento={handleChangeTipoDocumento}
              selectedValue={selectedValue}
              handleChangeMontoEfectivo={handleChangeMontoEfectivo}
              handleChangeConceptoPago={handleChangeConceptoPago}
              objetoPago={objetoPago}
              handlePagarCuota={handlePagarCuota}
            />
          </Modal>
        )
      }
    </div>
  )
}