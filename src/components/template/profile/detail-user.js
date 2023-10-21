import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { Badge, Title } from "src/components/atoms";
import ImgProfile from "src/components/organism/img-profile";
import { ButtonFormControl } from "src/components/molecules";

export default function DetailUser({
  employeedDetail = {},
  handleClickSendMessage
}) {

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-2">
          <ImgProfile profile={employeedDetail.person} isUploadImg />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              <Title value={`${employeedDetail?.person?.names} ${employeedDetail?.person?.surnames}`} type={'h1'} isStaff={employeedDetail?.isStaff} />
            </div>
            <div className="col-md-12">
              <strong>Cargo: </strong>{employeedDetail?.role?.name}.
            </div>
            {
              employeedDetail?.isStaff?
              <div className="col-md-12">
                <strong>Departamento: </strong>{employeedDetail?.role?.area?.areaDescription}.
              </div>: ''
            }
            <div className="col-md-12">
              <strong>Última Conexión: </strong>Hace 3 horas.
            </div>
            <div className="col-md-12">
              <strong>Estado </strong>: <Badge value={1} text={`${employeedDetail.state}`} />
            </div>
            
            <div className="col-md-12">
              <span>@{`${employeedDetail?.userName}`} </span>
            </div>
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <ButtonFormControl
                title="Enviar mensaje"
                color='btn btn-secondary'
                type={16}
                onClick={handleClickSendMessage}
              />&nbsp;&nbsp;
              <ButtonFormControl
                title="Editar perfil"
                color='btn btn-secondary'
                type={15}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
DetailUser.propTypes = {
  employeedDetail: PropTypes.object,
  handleClickSendMessage: PropTypes.func,
};