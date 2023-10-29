import React from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import { ReactAgenda } from 'react-agenda';
import { COLOR_BUTTON_MAB, COLOR_YELLOW } from "src/config/config";
import { COLOR_GREEN } from "src/utils/constants";
require('moment/locale/es.js'); // this is important for traduction purpose

const COLOR_SCHEDULE = {
  'color-1': COLOR_GREEN,
  "color-2": COLOR_BUTTON_MAB,
  "color-3": COLOR_YELLOW,
  "color-4": COLOR_GREEN,
  "color-5": COLOR_BUTTON_MAB
}
export default function AgendaView({
  rows = [],
  handleItemEdit,
  numberOfDays = 5,
  cellHeight = 15
}) {
  let now = new Date();
  let startDate = new Date();
  rows.map(s => {
    s.startDateTime = new Date(s.startDateTime) 
    s.endDateTime = new Date(s.endDateTime)
    switch (parseInt(s.state)) {
      case 1:
        s.classes = 'color-1'
        break;
      case 2:
        s.classes = 'color-2'
        break;
      case 3:
        s.classes = 'color-3'
        break;
      case 4:
        s.classes = 'color-4'
        break;
      case 5:
        s.classes = 'color-5'
        break;
      default:
        break;
    };
    return null;
  });
  const handleRangeSelection = (_) => {}
  return (
    <Box sx={{ width: '100%' }}>
      <div className="col-md-12">
        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth() - 2)}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 2)}
          startDate={startDate}
          items={rows}
          numberOfDays={numberOfDays}
          rowsPerHour={6}
          itemColors={COLOR_SCHEDULE}
          locale={'es'}
          autoScale={false}
          fixedHeader={false}
          startAtTime={9}
          onItemEdit={handleItemEdit}
          endAtTime={20.90}
          cellHeight={cellHeight}
          disablePrevButton={false}
          onRangeSelection={handleRangeSelection}
          helper
        />
      </div>
    </Box >
  )
}
AgendaView.propTypes = {
  rows: PropTypes.array,
  handleItemEdit: PropTypes.func,
  handleRangeSelection: PropTypes.func,
  numberOfDays: PropTypes.number,
  cellHeight: PropTypes.number
};