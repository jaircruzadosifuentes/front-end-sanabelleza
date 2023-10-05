import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/joy";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { COLOR_BLUE_MAB } from "src/config/config";
import ImgProfile from "./img-profile";
import SpanFormControl from "../atoms/SpanFormControl";
import CancelIcon from '@mui/icons-material/Cancel';

export default function NameUser({
  profile = {},
  employeed = false,
  patient = false,
  isPopover = false
}) {
  let navigate = useNavigate('');
  const handleRedirect = (e) => {
    if (employeed && profile?.userName !== null) {
      navigate(`/u/${profile?.userName}`)
    }
    if (patient && profile?.userNamePatient !== null) {
      navigate(`/u/${profile?.userNamePatient}`)
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ textAlign: 'left' }} >
      {
        employeed ?
          <span
            aria-haspopup="true"
            onClick={handleRedirect}
            style={{ color: COLOR_BLUE_MAB, cursor: 'pointer' }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {profile.person?.surnames} {profile?.person?.names}
          </span> :
          patient ?
            <span
              aria-haspopup="true"
              onClick={handleRedirect}
              style={{ color: COLOR_BLUE_MAB, cursor: 'pointer' }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {profile.person?.surnames} {profile?.person?.names}
            </span> : ''
      }
      {
        isPopover?
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
        >
          <Typography sx={{ p: 1, width: '425px' }}>
            <div className="row">
              <div className="col-md-3">
                <ImgProfile profile={profile?.person} />
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <SpanFormControl title={`${profile.person?.surnames} ${profile?.person?.names}`} />
                  </div>
                  <div className="col-md-12">
                    <SpanFormControl title={`${employeed? profile.person?.personCellphone?.cellPhoneNumber: profile?.patientSolicitude?.employeed?.person?.personCellphone?.cellPhoneNumber}`} />
                  </div>
                  <div className="col-md-12">
                    @<SpanFormControl title={`${employeed? profile.userName: profile.userNamePatient}`} />
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Popover>: ''
      }

    </div>
  )
}
NameUser.propTypes = {
  profile: PropTypes.object,
  employeed: PropTypes.bool,
  patient: PropTypes.bool,
  isPopover: PropTypes.bool
};