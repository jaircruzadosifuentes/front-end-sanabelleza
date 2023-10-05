import * as React from 'react';
import Chip from '@mui/material/Chip';
import { COLOR_BLUE_MAB } from 'src/config/config';
import ImgProfile from 'src/components/organism/img-profile';
import PropTypes from 'prop-types';

export default function ChatMessage({
  messages = [],
  fromIdParams = 0
}) {
  return (
    <React.Fragment>
      {
        messages.map((m, index) => {
          return (
            <div key={index}>
              {
                m.isStaff && m.fromId !== fromIdParams ?
                  <div className='row mt-1' >
                    <div className='col-md-12 text-center'>
                      <small>{new Date(m.createdAt).toLocaleString()}</small>
                    </div>
                    <div className='col-md-1'>
                      <ImgProfile profile={m.person} width={50} />
                    </div>
                    <div className='col-md-11 mt-2'>
                      <Chip label={`${m.messageContent}`} />&nbsp;
                    </div>
                  </div> :
                  <div className='row mt-1'>
                    <div className='col-md-12 text-center'>
                      <small>{new Date(m.createdAt).toLocaleString()}</small>
                    </div>
                    <div className='col-md-12 mt-2 ml-2 mr-2'>
                      <Chip label={`${m.messageContent}`} style={{ float: 'right', backgroundColor: COLOR_BLUE_MAB, color: 'white' }} />
                    </div>
                  </div>
              }
            </div>
          )
        })
      }
    </React.Fragment>
  )
}
ChatMessage.propTypes = {
  messages: PropTypes.array,
  fromIdParams: PropTypes.number,
};