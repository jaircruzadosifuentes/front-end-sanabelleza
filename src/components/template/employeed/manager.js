import React, { useState } from "react";
import List from "./list";
import { useGetAllEmployeed } from "../paciente/solicitud/hooks";
import Filter from "../../organism/filter";
import { Title } from "src/components/atoms";
import { Modal, SelectedFormControl } from "src/components/molecules";
import FormUpdate from "./form-update";
import { useGetAllAreas } from "src/api/hooks/common/common-hooks";

export default function Manager(props) {
  const { employeeds } = useGetAllEmployeed(props);
  const { areas } = useGetAllAreas(props);
  const [result, setResult] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [objEmployeed, setObjEmployeed] = useState({});

  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = employeeds.filter((item) => {
      if (item?.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleChangeArea = (e) => {
    let searchVal = '';
    searchVal = e?.value;
    const filterBySearch = employeeds.filter((item) => {
      if (parseInt(item?.areaId) === parseInt(searchVal)) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleEditEmployeed = (e, row) => {
    setOpenModalEdit(true);
    setObjEmployeed(row);
  }
  const handleCloseModalEdit = (e) => {
    setOpenModalEdit(false);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Title type={'h1'} value={'MÓDULO DE EMPLEADOS'} />
      </div>
      <div className="row mb-3">
        <div className="col-md-4 col-xs-4 col-lg-4">
          <Filter handleSearchForSurNames={handleSearchForSurNames} />
        </div>
        <SelectedFormControl
          className="col-md-4 mt-1"
          placeHolder="Seleccione un área"
          titleLabel="Seleccione un área:"
          options={areas}
          handleChange={handleChangeArea}
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <List
            rows={result.length > 0 ? result : employeeds}
            handleEditEmployeed={handleEditEmployeed}
          />
        </div>
      </div>
      {
        openModalEdit && (
          <Modal
            title={`EDITAR DATOS DEL EMPLEADO - ${objEmployeed.person.surnames} ${objEmployeed.person?.names}`}
            size={"modal-lg"}
            close
            openModal={openModalEdit}
            onClose={handleCloseModalEdit}
          >
            <FormUpdate
              objEmployeed={objEmployeed}
            />
          </Modal>
        )
      }
    </div>
  )
}