import React from "react";
import PropTypes from 'prop-types';
import { InputFormControl, TextAreaFormControl } from "src/components/molecules";
import { Label } from "src/components/atoms";
import { convertDateFormatCorrect, convertDateTimeToDate } from "src/utils/utils";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

export default function Form({
  objPatient = {}
}) {
  return (
    <div className="mb-2">
      <div className="card-body">
        <div className="row ">
          {/* <div className="col-md-3 text-center">
            <div className="row">
              <div className="col-md-12">
                <img
                  alt={objPatient?.person?.surnames}
                  src={`images/avatars/${objPatient?.person?.profilePicture}`}
                  className="float-right"
                  title={`${objPatient?.person?.surnames}/${objPatient?.person?.names}`}
                  height={'110%'}
                  width={'100%'}
                  style={{ borderRadius: '50%', display: 'flex' }}

                />
              </div>
            </div>
          </div> */}
          <div className="col-md-12 mt-2">
            <Label title={'DATOS PRINCIPALES'} isBold />
            <div className="row">
              <InputFormControl
                type="text"
                autoFocus
                className="col-md-5"
                label="Apellidos"
                isLabel
                defaultValue={objPatient?.person?.surnames}
              />
              <InputFormControl
                type="text"
                className="col-md-5"
                isLabel
                label="Nombres"
                defaultValue={objPatient?.person?.names}
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Nro Documento"
                defaultValue={objPatient?.person?.personDocument?.nroDocument}
                readOnly
              />
              <TextAreaFormControl
                className="col-md-5"
                label="Dirección"
                isLabel
                rows={2}
              />
              <InputFormControl
                type="text"
                className="col-md-3"
                isLabel
                label="Ocupación"
              />
            </div>
            <br />
            <Label title={'EN ATENCIÓN POR'} isBold />
            <div className="row">
              <div className="col-md-6">
                <Label title={'Nombres y Apellidos'} /> <br />
                <PersonIcon /> <span>{objPatient?.patientSolicitude?.employeed?.person?.surnames}/{objPatient?.patientSolicitude?.employeed?.person?.names}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Hora de Atención'} /> <br />
                <AccessTimeIcon /> <span>{objPatient?.patientSolicitude?.hourAttention} - {objPatient?.patientSolicitude?.systemHour}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Fecha Atención'} /> <br />
                <CalendarMonthIcon /> <span>{convertDateTimeToDate(objPatient?.patientSolicitude?.dateAttention)}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Tiempo Estimado'} /> <br />
                <AccessAlarmIcon /> <span>{objPatient?.patientSolicitude?.timeAttention} minutos.</span>
              </div>
            </div>
            <br />
            <Label title={'DATOS OPCIONALES'} isBold />
            <div className="row">
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Celular"
                maxLength={9}
                defaultValue={objPatient?.person?.personCellphone?.cellphone}
              />
              <InputFormControl
                type="text"
                className="col-md-5"
                isLabel
                label="Email"
                defaultValue={objPatient?.person?.personEmail?.emailDescription}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}
Form.propTypes = {
  objPatient: PropTypes.object,
};