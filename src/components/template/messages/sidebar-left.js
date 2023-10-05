import React, { Fragment } from "react";
import { Title } from "src/components/atoms";
import { InputFormControl } from "src/components/molecules";
import CardViewItem from "./card-view-item";
import PropTypes from 'prop-types';
import LayersClearIcon from '@mui/icons-material/LayersClear';

export default function SidebarLeft({
  users = [],
  handleClickItemMessage,
  messageId = 0,
  isHeader = false,
  handleChangeSearchMsg,
  stateUserMark = ''
}) {
  return (
    <Fragment>
      <div className="row" style={{ position: 'relative' }}>

        <div className="col-md-12">
          <Title value={'MENSAJES'} type={'h1'} />
        </div>
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-12"
          label="Buscar Mensaje"
          isLabel
          onChange={handleChangeSearchMsg}
          isFilter
        />
      </div>
      <div className="row mt-2">
        {
          users.length > 0 ? users.map((user, index) => {
            return (
              <div className="col-md-12 col-xs-12 mt-2 mb-2" key={index}>
                <CardViewItem
                  user={user}
                  handleClickItemMessage={handleClickItemMessage}
                  paintCell={parseInt(messageId) === parseInt(user.messageId) || (stateUserMark === user.userName && parseInt(messageId) === 0)}
                  isHeader={isHeader}
                />
              </div>
            )
          }) :
            <span>
              No existen datos para mostrar
              <LayersClearIcon />
            </span>
        }
      </div>

    </Fragment>
  )
}
SidebarLeft.propTypes = {
  users: PropTypes.array,
  stateUserMark: PropTypes.string,
  handleClickItemMessage: PropTypes.func,
  handleChangeSearchMsg: PropTypes.func,
  messageId: PropTypes.number,
  isHeader: PropTypes.bool,
};