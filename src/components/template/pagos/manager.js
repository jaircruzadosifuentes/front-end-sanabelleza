import React, { useState } from 'react'
import { useGetAllPayments } from 'src/api/hooks/pagos/pagos-hooks'
import { Title } from 'src/components/atoms';
import List from './list';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServiceGetPayments, ServicePutUpdateDebtPayment } from 'src/service/payment/service.payment';
import { Modal } from "src/components/molecules";
import FormPay from './form-pay';
import { useGetAllPayMethods } from '../paciente/finalizaAtencion/hooks';
import Filter from './filter';

export default function Manager(props) {
  const { payments, setPayments } = useGetAllPayments(props);
  const { payMethods } = useGetAllPayMethods(props);
  const [payMethodId, setPayMethodId] = useState(0);
  const [haveConcept, setHaveConcept] = useState(false);
  const [openModalFormPago, setOpenModalFormPago] = useState(false);
  const [conceptoPago, setConceptoPago] = useState('');
  const [result, setResult] = useState([]);

  const [objetoPago, setObjetoPago] = useState({
    paymentScheduleDetailId: 0,
    debtNumber: 0,
    amount: 0.00,
    state: '',
    userPayment: ''
  });

  const handleRealizarPago = (e, row) => {
    setOpenModalFormPago(true);
    setObjetoPago(row);
  }
  const handleCargarDataPagosPendientes = async () => {
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
    let userPayment = "SIST"
    if(!payMethodId || payMethodId === 0) {
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
      conceptoPago
    }
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
          await handleCargarDataPagosPendientes();
          Swal.fire(
            'Actualización exitosa',
            `La cuota Nro ${debtNumber}, ha sido cancelada con éxito.`,
            'success'
          );
          setOpenModalFormPago(false);
          setHaveConcept(false);
        }
      }
    })
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
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={`MÓDULO DE PAGOS PENDIENTES`}
      />
      <Filter 
        handleSearchForSurNames={handleSearchForSurNames}
      />
      <List
        rows={result.length > 0? result: payments}
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
            <FormPay
              objetoPago={objetoPago}
              handleCloseModalPago={handleCloseModalPago}
              payMethods={payMethods}
              handleChangePayMethod={handleChangePayMethod}
              haveConcept={haveConcept}
              handlePagarCuota={handlePagarCuota}
              handleChangeConceptoPago={handleChangeConceptoPago}
            />
          </Modal>
        )
      }
    </div>
  )
}