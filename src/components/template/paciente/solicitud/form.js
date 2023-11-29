import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import PropTypes from "prop-types";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import { convertDateTimeToDate } from "src/utils/utils";

export default function Form({
  handleViewDisponibilty,
  handleSave,
  documents = [],
  employeed = '',
  dateOfRegister,
  hourInitial = '',
  hourFinished = '',
  handleChangeTipoDocumento,
  sizeDocument = 0,
  handleChangeSurNames,
  handleChangeNames,
  handleChangeBirthDate,
  handleChangeNroDocument,
  handleChangeCellPhone,
  handleChangeEmail,
  selectedValue,
  handleChange,
  handleLimpiarControles,
  handleChangeCancelar,
  handleKeyUpNroDocument,
  objPersonConRenic = {}
}) {
  return (
    <div className="form-group">
      <Label title={'DATOS PRINCIPALES'} isBold />
      <div className="row">
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-4"
          label="Apellidos"
          isLabel
          onChange={handleChangeSurNames}
          id={'idApellidosSolicitud'}
          defaultValue={objPersonConRenic?.nombresCompletos}
        />
        <InputFormControl
          type="text"
          className="col-md-4"
          isLabel
          label="Nombres"
          onChange={handleChangeNames}
          id={'idNombresSolicitud'}
          defaultValue={objPersonConRenic?.nombres}
        />
        <InputFormControl
          type="date"
          className="col-md-4"
          isLabel
          label="Fecha Nacimiento"
          onChange={handleChangeBirthDate}
        />
      </div>
      <div className="row">
        <SelectedFormControl
          className="col-md-2"
          placeHolder="Tipo de Documento"
          titleLabel="Tipo de Documento"
          options={documents}
          autoFocus
          handleChange={handleChangeTipoDocumento}
        />
        <InputFormControl
          type="text"
          className="col-md-2"
          isLabel
          label="Nro Documento"
          maxLength={sizeDocument}
          onChange={handleChangeNroDocument}
          onKeyUp={handleKeyUpNroDocument}
          id="idNroDocumentoSolicitud"
        />
        <div className="col-md-4 mt-4">
          <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
            <Radio
              value="a"
              name="radio-buttons"
              label="Masculino"
              checked={selectedValue === 'a'}
              onChange={handleChange}
            />
            <Radio
              value="b"
              name="radio-buttons"
              label="Femenino"
              checked={selectedValue === 'b'}
              onChange={handleChange}
            />
          </Box>
        </div>
        <div className="col-md-4 mt-4">
          <div className="btn-group ">
            <ButtonFormControl
              title="Ver Disponibilidad"
              color='btn btn-primary'
              type={4}
              onClick={handleViewDisponibilty}
            />
          </div>
        </div>
      </div>
      <br />
      <Label title={'EN ATENCIÓN POR'} isBold />
      <div className="row">
        <div className="col-md-4">
          <Label title={'Nombres y Apellidos'} /> <br />
          <Label title={`${employeed}`} />
        </div>
        <div className="col-md-2">
          <Label title={'Hora de Atención'} /> <br />
          <Label title={`${hourInitial} - ${hourFinished}`} />
        </div>
        <div className="col-md-2">
          <Label title={'Fecha Atención'} /> <br />
          <Label title={`${convertDateTimeToDate(dateOfRegister)}`} />
        </div>
      </div>
      <br />
      <Label title={'DATOS OPCIONALES'} isBold />
      <div className="row">
        <InputFormControl
          type="text"
          className="col-md-2"
          label="Celular"
          isLabel
          onChange={handleChangeCellPhone}
          maxLength={9}
        />
        <InputFormControl
          type="text"
          className="col-md-4"
          label="Correo Electrónico"
          isLabel
          onChange={handleChangeEmail}
        />

      </div>
      <hr />
      <div className="col-md-12">
        <div className="btn-toolbar" style={{ float: 'right' }}>
          <div className="btn-group">
            <ButtonFormControl
              title="Cancelar"
              color='btn btn-danger'
              type={2}
              onClick={handleChangeCancelar}
            />
          </div>&nbsp;
          <div className="btn-group">
            <ButtonFormControl
              title="Guardar"
              color='btn btn-success'
              type={1}
              onClick={handleSave}
            />
          </div>&nbsp;
        </div>
        <div className="btn-toolbar">
          <div className="btn-group">
            <ButtonFormControl
              title="Limpiar controles"
              color='btn btn-primary'
              type={13}
              onClick={handleLimpiarControles}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
Form.propTypes = {
  objPersonConRenic: PropTypes.object,
  selectedValue: PropTypes.string,
  handleChange: PropTypes.func,
  handleLimpiarControles: PropTypes.func,
  handleChangeCancelar: PropTypes.func,
  handleViewDisponibilty: PropTypes.func,
  handleVerEnBorrador: PropTypes.func,
  handleChangeSurNames: PropTypes.func,
  handleKeyUpNroDocument: PropTypes.func,
  handleChangeNames: PropTypes.func,
  handleChangeBirthDate: PropTypes.func,
  handleChangeNroDocument: PropTypes.func,
  handleChangeCellPhone: PropTypes.func,
  handleChangeEmail: PropTypes.func,
  handleSave: PropTypes.func,
  handleSaveTemporality: PropTypes.func,
  handleChangeTipoDocumento: PropTypes.func,
  documents: PropTypes.array,
  listaPacientesEnBorrador: PropTypes.array,
  employeed: PropTypes.string,
  dateOfRegister: PropTypes.string,
  hourInitial: PropTypes.string,
  hourFinished: PropTypes.string,
  sizeDocument: PropTypes.number,
};