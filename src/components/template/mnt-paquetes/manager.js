import React, { useState } from "react";
import { useGetAllPacketsOrUnitSessions } from "./hooks";
import List from "./list";
import Filter from "./filter";
import { Title } from "src/components/atoms";
import Form from "./form";
import { Modal } from "src/components/molecules";
// import FileSaver from 'file-saver';

export default function Manager(props) {

  const { packetsOrUnitSession } = useGetAllPacketsOrUnitSessions(props);
  const [result, setResult] = useState([]);
  const [openModalPacketes, setOpenModalPackets] = useState(false);

  const handleSearch = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = packetsOrUnitSession.filter((item) => {
      if (item.description.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleCloseModalPackets = (e) => {
    setOpenModalPackets(false);
  }
  const handleClickNewPackets = (e) => {
    setOpenModalPackets(true);
  }
  //FORMS
  const handleChangeCostCu = (e) => {
    let value = e.target.value;
    console.log(value);
  }
  const handleClosePackets = (e) => {
    setOpenModalPackets(false);
  }
  const handleExportarExcel = (e) => {
    // createExcelBlob().then(blob => {
    //   FileSaver.saveAs(blob, `123.xlsx`);
    // })
  }
  // const createExcelBlob = () => {
    
  // };
  //FIN DE FORMS
  return (
    <div className="row">
      <div className="col-md-12">
        <Title value={'CONFIGURACIÓN DE PAQUETES Y SESIONES UNITARIAS'} type={'h1'} />
      </div>
      <Filter
        handleSearch={handleSearch}
        handleClickNewPackets={handleClickNewPackets}
        handleExportarExcel={handleExportarExcel}
      />
      <div className="col-md-12 mt-2">
        <List
          rows={result.length > 0 ? result : packetsOrUnitSession}
        />
      </div>
      {/* Modales */}
      {
        openModalPacketes && (
          <Modal
            title={`NUEVO PAQUETE O SESIÓN UNITARIA`}
            size={"modal-lg"}
            close
            openModal={openModalPacketes}
            onClose={handleCloseModalPackets}
          >
            <Form
              handleChangeCostCu={handleChangeCostCu}
              handleClosePackets={handleClosePackets}
            />
          </Modal>
        )
      }
    </div>
  )
}