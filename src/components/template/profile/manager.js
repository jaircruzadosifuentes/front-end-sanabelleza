import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailUser from "./detail-user";
import { useGetByUserNameEmployeed } from "src/api/hooks/employeed/employeed-hook";
import TabsUser from "./tabs-user";
import { ServiceGetAllScheduleEmployeed } from "src/service/schedule/service.schedule";

export default function Manager(props) {
  const navigate = useNavigate()
  const params = useParams();
  const { employeedDetail } = useGetByUserNameEmployeed(params.username);
  const [value, setValue] = useState('1');
  const [rowsScheduleSessions, setRowsScheduleSessions] = useState([]);

  const handleChange = async(_, newValue) => {
    const { employeedId } = employeedDetail;
    switch (parseInt(newValue)) {
      case 4:
        let lstRowSchedule = await ServiceGetAllScheduleEmployeed(employeedId);
        setRowsScheduleSessions(lstRowSchedule)
        break;
      default:
        break;
    }
    setValue(newValue);
  };

  const handleClickSendMessage = (e) => {
    const { employeedId, isStaff, userName } = employeedDetail;
    console.log(employeedDetail);
    if(isStaff) {
      navigate(`/message/e/${employeedId}`, {
        state: {
          userName
        }
      })
    } else {
      navigate(`/message/u/${employeedId}`, {
        state: {
          userName
        }
      })
    }
  }
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <DetailUser 
            employeedDetail={employeedDetail}
            handleClickSendMessage={handleClickSendMessage}
          />
        </div>
        <div className="col-md-12">
          <TabsUser 
            employeedDetail={employeedDetail}
            value={value}
            handleChange={handleChange}
            rowsScheduleSessions={rowsScheduleSessions}
          />
        </div>
      </div>
    </div>
  )
}