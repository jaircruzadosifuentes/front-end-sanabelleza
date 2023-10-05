import React from "react";
import PropTypes from 'prop-types';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Tooltip } from "@mui/material";

export default function ImgProfile({
  profile = {},
  isBordered = false,
  isUploadImg = false,
  width = '110%'
}) {
  return (
    <>
      {
        isUploadImg ?
          <Badge
            style={{ width: width, height: '100%' }}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar alt={`imagen`} src={<AddAPhotoIcon />} style={{ borderBlockEnd: 'solid 2px', cursor: 'pointer', backgroundColor: '#ECEBEB' }}>
                <Tooltip title={`Actualizar imagen`}>
                  <AddAPhotoIcon style={{color: 'black'}}/>
                </Tooltip>
              </Avatar>
            }
          >
            <img
              alt={profile.names}
              src={`../../images/avatars/${profile.profilePicture}`}
              className="float-right"
              title={`${profile.surnames}/${profile.names}`}
              height={'100%'}
              width={'110%'}
              style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
            />
          </Badge> :
          <img
            alt={profile.names}
            src={`../../images/avatars/${profile.profilePicture}`}
            className="float-right"
            title={`${profile.surnames}/${profile.names}`}
            height={'100%'}
            width={width}
            style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
          />
      }
    </>
  )
}
ImgProfile.propTypes = {
  profile: PropTypes.object,
  isBordered: PropTypes.bool,
  isUploadImg: PropTypes.bool,
  width: PropTypes.string,
};