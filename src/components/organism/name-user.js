import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function NameUser({
  profile = {},
  employeed = false,
  patient = false
}) {
  let navigate = useNavigate('');
  const handleRedirect = (e) => {
    console.log(employeed);
    console.log(patient);
    if (employeed && profile?.userName !== null) {
      navigate(`/u/${profile?.userName}`)
    }
    if (patient && profile?.userNamePatient !== null) {
      navigate(`/u/${profile?.userNamePatient}`)
    }
  }
  return (
    <div style={{ textAlign: 'left' }}>
      {
        employeed ?
          <a
            className="link-opacity-100"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={handleRedirect}
          >
            {profile.person?.surnames} {profile?.person?.names}
          </a> :
          patient ?
            <a
              className="link-opacity-100"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={handleRedirect}
            >
              {profile.person?.surnames} {profile?.person?.names}
            </a> : ''
      }
    </div>
  )
}
NameUser.propTypes = {
  profile: PropTypes.object,
  employeed: PropTypes.bool,
  patient: PropTypes.bool
};