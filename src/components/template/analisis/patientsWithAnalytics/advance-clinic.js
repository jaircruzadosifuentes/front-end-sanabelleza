import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { convertDateTimeToDate } from 'src/utils/utils';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GREEN, COLOR_YELLOW } from 'src/config/config';

export default function AdvanceClinic({
  lstAdvanceClinic = []
}) {
  return (
    <Timeline position="alternate">
      {
        lstAdvanceClinic.length > 0 ? lstAdvanceClinic.map((a, index) => {
          return (
            <TimelineItem key={index} style={{color: COLOR_BLUE_MAB}}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {convertDateTimeToDate(a.dateOfAttention)} - {a.hourOffAttention} {a.systemHour} <br />
                Asistió?
                {
                  a.isQueueRemoval ?
                  <CheckCircleIcon style={{ color:COLOR_GREEN }} />
                  : <CancelIcon style={{ color:COLOR_BUTTON_MAB }} />
                }
                <br />
                Fue atendido?{
                  a.isAttention ?
                  <CheckCircleIcon style={{ color:COLOR_GREEN }} />
                  : <CancelIcon style={{ color:COLOR_BUTTON_MAB }} />
                } 
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{backgroundColor: a.isQueueRemoval || a.isAttention ? COLOR_GREEN: COLOR_YELLOW}}/>
                <TimelineDot style={{backgroundColor: a.isQueueRemoval || a.isAttention ? COLOR_GREEN: COLOR_YELLOW}}>
                  <AlarmOnIcon />
                </TimelineDot>
                <TimelineConnector style={{backgroundColor: a.isQueueRemoval || a.isAttention ? COLOR_GREEN: COLOR_YELLOW}}/>
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                Sesión Nro {index + 1}
                <Typography>{a.recommendation}</Typography>
              </TimelineContent>
            </TimelineItem>
          )
        }): <span>No existe información para mostrar.</span>
      }
    </Timeline>
  );
}
AdvanceClinic.propTypes = {
  lstAdvanceClinic: PropTypes.array
};