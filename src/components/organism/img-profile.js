import React from "react";
import PropTypes from 'prop-types';

export default function ImgProfile({
  profile = {},
  isBordered = false
}) {
  return (
    <img
      alt={profile.names}
      src={`../../images/avatars/${profile.profilePicture}`}
      className="float-right"
      title={`${profile.surnames}/${profile.names}`}
      height={'100%'}
      width={'100%'}
      style={{borderRadius: isBordered? '10em': '1em', display: 'flex'}}
    />
  )
}
ImgProfile.propTypes = {
  profile: PropTypes.object,
  isBordered: PropTypes.bool
};