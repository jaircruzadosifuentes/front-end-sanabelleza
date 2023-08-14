import React from "react";
import { useParams } from "react-router-dom";
import DetailUser from "./detail-user";
import { useGetByUserNameEmployeed } from "src/api/hooks/employeed/employeed-hook";

export default function Manager(props) {
  const params = useParams();
  console.log(params);
  const { employeedDetail } = useGetByUserNameEmployeed(params.username);
  return(
    <div className="container">
      <div className="row">
        <DetailUser employeedDetail={employeedDetail}/>
      </div>
    </div>
  )
}