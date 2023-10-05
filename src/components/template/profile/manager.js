import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailUser from "./detail-user";
import { useGetByUserNameEmployeed } from "src/api/hooks/employeed/employeed-hook";
import TabsUser from "./tabs-user";

export default function Manager(props) {
  const navigate = useNavigate()
  const params = useParams();
  const { employeedDetail } = useGetByUserNameEmployeed(params.username);

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
          <TabsUser employeedDetail={employeedDetail}/>
        </div>
      </div>
    </div>
  )
}