import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImgProfile from 'src/components/organism/img-profile';
import PropTypes from 'prop-types';
import SpanFormControl from 'src/components/atoms/SpanFormControl';

export default function CardViewItem({
  user = {},
  handleClickItemMessage,
  paintCell = false,
  isHeader = false
}) {

  return (
    <Card sx={{ maxWidth: '100%' }} style={{ cursor: 'pointer', backgroundColor: paintCell ? '#D9EEFF' : '' }} onClick={(e) => handleClickItemMessage(e, user)}>
      <CardHeader
        avatar={
          <ImgProfile profile={user?.person} width={50} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<strong>{`${user?.person?.surnames} ${user?.person?.names}`}</strong>}
        //subheader={`Tu: ${user.messageContent}. - ${isHeader ? '' : '1d'}`}
        subheader={<ComponentSubHeader isHeader={isHeader} count={user.count} content={user.messageContent} />}
      />
    </Card>
  );
}
const ComponentSubHeader = ({
  isHeader = false,
  count = 0,
  content = ''
}) => {
  return (
    <>
      {
        isHeader ?
          <>
            <div className='row'>
              <div className='col-md-10'>
                <SpanFormControl title={'Tu: ' + content.substring(0, 45) + '...'} />
              </div>
              {/* <div className='col-md-2'>
                <Tooltip title={`${count} ${count === 1 ? 'mensaje pendiente' : 'mensajes pendientes'} por leer.`}>
                  <Badge badgeContent={count} color="warning" />
                </Tooltip>
              </div> */}
            </div>
          </> :
          <>
            <div className='row'>
              <div className='col-md-10'>
                <SpanFormControl title={'Tu: ' + content.substring(0, 45) + '...'} />
              </div>
              {/* <div className='col-md-2'>
                <Tooltip title={`${count} ${count === 1 ? 'mensaje pendiente' : 'mensajes pendientes'} por leer.`}>
                  <Badge badgeContent={count} color="warning" />
                </Tooltip>
              </div> */}
            </div>
          </>
      }
    </>
  )
}
ComponentSubHeader.propTypes = {
  isHeader: PropTypes.bool,
  count: PropTypes.number,
  content: PropTypes.string,
};
CardViewItem.propTypes = {
  user: PropTypes.object,
  handleClickItemMessage: PropTypes.func,
  paintCell: PropTypes.bool,
  isHeader: PropTypes.bool,
};

