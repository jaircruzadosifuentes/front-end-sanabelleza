import React from "react";
import Greeting from "src/components/organism/greeting";

export default function Manager() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <Greeting />
        </div>
      </div>
    </div>
  )
}