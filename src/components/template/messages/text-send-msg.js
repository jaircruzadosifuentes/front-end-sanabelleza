import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { COLOR_BLUE_MAB } from 'src/config/config';

export default function TextSendMsg({
  title = '',
  autoFocus = false,
  handleClickSendMsg,
  handleChangeMsgContent,
  id = '',
  handleKeyUpMsgContent
}) {
  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <AddCircleIcon style={{color: COLOR_BLUE_MAB}} />
      </IconButton>
      <InputBase
        id={id}
        sx={{ ml: 1, flex: 1 }}
        placeholder={title}
        autoFocus={'autofocus'}
        onChange={handleChangeMsgContent}
        onKeyUp={handleKeyUpMsgContent}
        autoComplete='off'
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleClickSendMsg}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
TextSendMsg.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  autoFocus: PropTypes.bool,
  handleClickSendMsg: PropTypes.func,
  handleChangeMsgContent: PropTypes.func,
  handleKeyUpMsgContent: PropTypes.func,
};